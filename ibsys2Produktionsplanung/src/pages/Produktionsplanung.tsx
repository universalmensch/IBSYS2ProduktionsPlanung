import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { ProduktionsPlanDTO } from "../dtos/ProduktionsPlanDTO";
import { useGeneralStore } from "../helper/GeneralStoreContext";
import { useTranslation } from "react-i18next";

export function Produktionsplanung() {
  const { t } = useTranslation();
  const { generalStore, setGeneralStoreData } = useGeneralStore();
  const input = generalStore?.input;
  const output = generalStore?.output?.input;

  if (!input) {
    return (
      <p className="text-center mt-5">{t("Keine XML-Daten verfügbar")}.</p>
    );
  }

  const forecast = input.results.forecast;

  const startPeriode = Number(input.results?.period ?? 0) + 1;

  const [manuellePrognose, setManuellePrognose] = useState({
    p1: [0, 0, 0],
    p2: [0, 0, 0],
    p3: [0, 0, 0],
  });

  const [manuelleProduktion, setManuelleProduktion] = useState({
    p1: [0, 0, 0, 0],
    p2: [0, 0, 0, 0],
    p3: [0, 0, 0, 0],
  });

  const [vertriebswunsch, setVertriebswunsch] = useState({
    forecast,
    direktverkauf: { p1: 0, p2: 0, p3: 0 },
    preis: { p1: 0, p2: 0, p3: 0 },
    konventionalStrafe: { p1: 0, p2: 0, p3: 0 },
  });

  const getRestbestand = (articleId: number): number => {
    const artikel = input.results.warehousestock.article.find(
      (a) => Number(a.id) === articleId
    );
    return Number(artikel?.amount) ?? 0;
  };

  const berechneRestbestaende = (produkt: "p1" | "p2" | "p3"): number[] => {
    const restbestaende: number[] = [];
    const artikelId = parseInt(produkt[1]);
    const aktuellerBestand = getRestbestand(artikelId);

    const geplanteMengen = [
      manuelleProduktion[produkt][0],
      manuelleProduktion[produkt][1],
      manuelleProduktion[produkt][2],
      manuelleProduktion[produkt][3],
    ];

    const prognosen = [
      forecast[produkt],
      manuellePrognose[produkt][0],
      manuellePrognose[produkt][1],
      manuellePrognose[produkt][2],
    ];

    for (let i = 0; i < 4; i++) {
      const bestandVorher = i === 0 ? aktuellerBestand : restbestaende[i - 1];
      const rest = bestandVorher + geplanteMengen[i] - prognosen[i];
      restbestaende.push(rest);
    }

    return restbestaende;
  };

  const [speicherInfo, setSpeicherInfo] = useState(false);

  const handlePlanErstellen = () => {
    const plan = new ProduktionsPlanDTO();

    // Woche 0–4
    for (let i = 0; i < 4; i++) {
      // @ts-ignore
      plan[`p1ProduktionWoche${i}`] = manuelleProduktion.p1[i];
      // @ts-ignore
      plan[`p2ProduktionWoche${i}`] = manuelleProduktion.p2[i];
      // @ts-ignore
      plan[`p3ProduktionWoche${i}`] = manuelleProduktion.p3[i];
    }

    const sellwish = [
      {
        article: 1,
        quantity: vertriebswunsch["forecast"]["p1"],
      },
      {
        article: 2,
        quantity: vertriebswunsch["forecast"]["p2"],
      },
      {
        article: 3,
        quantity: vertriebswunsch["forecast"]["p3"],
      },
    ];

    const selldirect = [
      {
        article: 1,
        quantity: vertriebswunsch["direktverkauf"]["p1"],
        price: vertriebswunsch["preis"]["p1"],
        penalty: vertriebswunsch["konventionalStrafe"]["p1"],
      },
      {
        article: 2,
        quantity: vertriebswunsch["direktverkauf"]["p2"],
        price: vertriebswunsch["preis"]["p2"],
        penalty: vertriebswunsch["konventionalStrafe"]["p2"],
      },
      {
        article: 3,
        quantity: vertriebswunsch["direktverkauf"]["p3"],
        price: vertriebswunsch["preis"]["p3"],
        penalty: vertriebswunsch["konventionalStrafe"]["p3"],
      },
    ];

    const updatedOutput = {
      ...(output ?? {}),
      sellwish: {
        item: sellwish,
      },
      selldirect: {
        item: selldirect,
      },
    };

    setGeneralStoreData({
      ...generalStore,
      produktionsPlan: plan,
      output: {
        input: updatedOutput,
      },
    });

    console.log("ProduktionsPlan gespeichert:", plan);

    setSpeicherInfo(true);
    setTimeout(() => setSpeicherInfo(false), 3000);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">
        {t("ProdPlanning.Produktionsplanung")}
      </h1>

      <section className="mb-5">
        <h4>{t("ProdPlanning.Prognose")}:</h4>
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>{t("ProdPlanning.Produkt")}</th>
              <th>
                {t("ProdPlanning.Period")} {startPeriode}
              </th>
              {[1, 2, 3].map((offset) => (
                <th key={offset}>
                  {t("ProdPlanning.Period")} {startPeriode + offset}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["p1", "p2", "p3"] as const).map((key, index) => (
              <tr key={key}>
                <td>
                  {t("ProdPlanning.Produkt")} {index + 1}
                </td>
                <td>
                  <div
                    style={{
                      width: "150px",
                      margin: "0 auto",
                      padding: "6px 0",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    {forecast[key]}
                  </div>
                </td>
                {[0, 1, 2].map((i) => (
                  <td key={i}>
                    <Form.Control
                      type="number"
                      min={0}
                      value={manuellePrognose[key][i]}
                      onChange={(e) => {
                        // removes leading 0
                        // @ts-ignore
                        e.target.value = Math.abs(e.target.value);
                        const value = Math.max(
                          0,
                          parseInt(e.target.value) || 0
                        );
                        setManuellePrognose((prev) => {
                          const updated = [...prev[key]];
                          updated[i] = value;
                          return { ...prev, [key]: updated };
                        });
                      }}
                      style={{
                        width: "150px",
                        margin: "0 auto",
                        textAlign: "center",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="mb-5">
        <h4>
          {t("ProdPlanning.Anfangsbestand")} {startPeriode}:
        </h4>
        <Table
          bordered
          className="mt-3 text-center align-middle"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <thead>
            <tr>
              <th>{t("ProdPlanning.Produkt")}</th>
              <th>{t("ProdPlanning.Bestand")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("ProdPlanning.Produkt")} 1</td>
              <td>{getRestbestand(1)}</td>
            </tr>
            <tr>
              <td>{t("ProdPlanning.Produkt")} 2</td>
              <td>{getRestbestand(2)}</td>
            </tr>
            <tr>
              <td>{t("ProdPlanning.Produkt")} 3</td>
              <td>{getRestbestand(3)}</td>
            </tr>
          </tbody>
        </Table>
      </section>

      <section className="mb-5">
        <h4>{t("ProdPlanning.Geplante Produktionsmengen & Restbestände")}:</h4>
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>{t("ProdPlanning.Produkt")}</th>
              {[0, 1, 2, 3].map((i) => (
                <th key={i}>
                  {t("ProdPlanning.Period")} {startPeriode + i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["p1", "p2", "p3"] as const).map((key, index) => {
              const restbestaende = berechneRestbestaende(key);
              return (
                <tr key={key}>
                  <td>
                    {t("ProdPlanning.Produkt")} {index + 1}
                  </td>
                  {[0, 1, 2, 3].map((i) => (
                    <td key={i}>
                      <Form.Group className="text-center">
                        <Form.Control
                          type="number"
                          min={0}
                          value={manuelleProduktion[key][i]}
                          onChange={(e) => {
                            // removes leading 0
                            // @ts-ignore
                            e.target.value = Math.abs(e.target.value);
                            const value = Math.max(
                              0,
                              parseInt(e.target.value) || 0
                            );
                            setManuelleProduktion((prev) => {
                              const updated = [...prev[key]];
                              updated[i] = value;
                              return { ...prev, [key]: updated };
                            });
                          }}
                          style={{
                            width: "150px",
                            margin: "0 auto",
                            textAlign: "center",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "0.9em",
                            color: restbestaende[i] < 0 ? "red" : "black",
                            fontWeight: "bold",
                            marginTop: "4px",
                          }}
                        >
                          {t("ProdPlanning.Restbestand")}: {restbestaende[i]}
                        </div>
                      </Form.Group>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </section>

      <section className="mb-5">
        <h4>{t("ProdPlanning.Verlaufswunsch und Direktverkauf")}:</h4>
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>{t("ProdPlanning.Produkt")}</th>
              <th>{t("ProdPlanning.Verlaufswunsch")}</th>
              <th>{t("ProdPlanning.Direktverkauf")}</th>
              <th>{t("ProdPlanning.Preis / Einheit")}</th>
              <th>{t("ProdPlanning.Konventionalstrafe")}</th>
            </tr>
          </thead>
          <tbody>
            {(["p1", "p2", "p3"] as const).map((key, index) => {
              return (
                <tr key={key}>
                  <td>
                    {t("ProdPlanning.Produkt")} {index + 1}
                  </td>
                  <td>
                    <Form.Group className="text-center">
                      <Form.Control
                        type="number"
                        min={0}
                        value={vertriebswunsch["forecast"][key]}
                        disabled
                        style={{
                          width: "150px",
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group className="text-center">
                      <Form.Control
                        type="number"
                        min={0}
                        value={vertriebswunsch["direktverkauf"][key]}
                        onChange={(e) => {
                          // removes leading 0
                          // @ts-ignore
                          e.target.value = Math.abs(e.target.value);
                          const value = Math.max(
                            0,
                            parseInt(e.target.value) || 0
                          );
                          setVertriebswunsch((prev) => {
                            return {
                              ...prev,
                              direktverkauf: {
                                ...prev["direktverkauf"],
                                [key]: value,
                              },
                            };
                          });
                        }}
                        style={{
                          width: "150px",
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group className="text-center">
                      <Form.Control
                        type="number"
                        min={0}
                        value={vertriebswunsch["preis"][key]}
                        onChange={(e) => {
                          // removes leading 0
                          // @ts-ignore
                          e.target.value = Math.abs(e.target.value);
                          const value = Math.max(
                            0,
                            parseInt(e.target.value) || 0
                          );
                          setVertriebswunsch((prev) => {
                            return {
                              ...prev,
                              preis: {
                                ...prev["preis"],
                                [key]: value,
                              },
                            };
                          });
                        }}
                        style={{
                          width: "150px",
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group className="text-center">
                      <Form.Control
                        type="number"
                        min={0}
                        value={vertriebswunsch["konventionalStrafe"][key]}
                        onChange={(e) => {
                          // Removes leading 0
                          // @ts-ignore
                          e.target.value = Math.abs(e.target.value);
                          const input = e.target.value.replace(",", ".");
                          const value = Math.max(0, parseFloat(input) || 0);
                          setVertriebswunsch((prev) => {
                            return {
                              ...prev,
                              konventionalStrafe: {
                                ...prev["konventionalStrafe"],
                                [key]: value,
                              },
                            };
                          });
                        }}
                        style={{
                          width: "150px",
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      />
                    </Form.Group>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </section>

      {speicherInfo && (
        <div className="text-center mt-3">
          <div className="alert alert-primary" role="alert">
            {t("ProdPlanning.Produktionsplan gespeichert")}
          </div>
        </div>
      )}
      <div className="text-center mt-3">
        <Button variant="primary" onClick={handlePlanErstellen}>
          {t("ProdPlanning.Speichern")}
        </Button>
      </div>
    </Container>
  );
}
