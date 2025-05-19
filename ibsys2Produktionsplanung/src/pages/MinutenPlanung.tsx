import React, { useEffect, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/minutenplanung.css";
import { useGeneralStore } from "../helper/GeneralStoreContext";
import { WorkingTime } from "../dtos/XMLOutput";
import { Ruestzeiten } from "../dtos/Ruestzeiten";
import { useTranslation } from "react-i18next";

type Zeile = {
  id: string;
  bezeichnung: string;
  typ: string;
  sachNr: string;
  auftragsmenge: number;
  minutenLinks: (number | "")[];
};

const ruestzeitMap = new Map();
Ruestzeiten.forEach(({ teilnummer, arbeitsplatz, zeit }) => {
  ruestzeitMap.set(`${arbeitsplatz}_${teilnummer}`, zeit);
});

export const MinutenPlanung = () => {
  const { t } = useTranslation();

  const { generalStore, setGeneralStoreData } = useGeneralStore();

  const input = generalStore?.input?.results;
  const output = generalStore?.output?.input;
  const wartelistenArbeitsplatz = input?.waitinglistworkstations.workplace;
  const auftraege = output?.productionlist ?? {
    production: [{ article: 0, quantity: 0 }],
  };

  const alleWaitingListEintraege = wartelistenArbeitsplatz?.flatMap(
    (workplace) => {
      const waitingList = workplace.waitinglist;

      const liste = Array.isArray(waitingList)
        ? waitingList
        : waitingList
        ? [waitingList]
        : [];

      return liste.map((entry) => ({
        arbeitsplatzId: workplace.id,
        period: entry.period,
        order: entry.order,
        item: entry.item,
        timeNeed: entry.timeneed,
        amount: entry.amount,
        firstbatch: entry.firstbatch,
        lastbatch: entry.lastbatch,
      }));
    }
  );

  const alleWaitingListEintraegeMitRuestzeit = useMemo(() => {
    return alleWaitingListEintraege?.map((entry) => {
      const key = `${entry.arbeitsplatzId}_${entry.item}`;
      const zeit = ruestzeitMap.get(key) ?? 0;
      return {
        ...entry,
        zeit,
      };
    });
  }, [alleWaitingListEintraege]);
  //Funktion für den Import der XML-Daten
  useEffect(() => {
    if (!wartelistenArbeitsplatz) return;

    const rueckstandArray = Array(15).fill(0);

    wartelistenArbeitsplatz.forEach((workplace) => {
      const { id, timeneed } = workplace;

      const arrayIndex = id - 1;

      if (arrayIndex >= 0 && arrayIndex < 15) {
        rueckstandArray[arrayIndex] = Number(timeneed) || 0; // ← Fix hier
      }
    });

    setRueckstandKapa(rueckstandArray);
  }, [wartelistenArbeitsplatz]);

  const [speicherInfo, setSpeicherInfo] = useState(false);

  //Import der Wartelisten mit den einzelnen wartenden Teilen, für die Rüstrückstandszeit

  //Funktion für den Export der XML-Daten:
  function save() {
    const workingTimes: WorkingTime[] = benoetigteZusatzschichten.map(
      (shift, index) => {
        const overtime =
          benoetigteUeberstunden[index] === ""
            ? 0
            : index == 4
            ? 0
            : Math.ceil(Number(benoetigteUeberstunden[index]));
        const shiftVal = shift === "" ? 0 : index == 4 ? 0 : Number(shift);

        return {
          station: index + 1,
          shift: shiftVal,
          overtime: overtime,
        };
      }
    );

    const updatedOutput = {
      ...(output ?? {}),
      workingtimelist: {
        workingtime: workingTimes,
      },
    };

    setGeneralStoreData({
      ...generalStore,
      output: {
        ...(generalStore?.output ?? {}),
        input: updatedOutput,
      },
    });

    console.log("Gespeicherte Arbeitszeiten für XML:", workingTimes);

    setSpeicherInfo(true);
    setTimeout(() => setSpeicherInfo(false), 3000);
  }

  const getAlleAuftraege = (articleId: number) =>
    auftraege.production
      .filter((auftrag) => auftrag.article === articleId)
      .reduce((sum, auftrag) => sum + (auftrag.quantity ?? 0), 0);

  // const [zeilen] = useState<Zeile[]>([
  const zeilen = useMemo<Zeile[]>(
    () => [
      {
        id: "hrk",
        bezeichnung: t("teil.hinterrad"),
        typ: "K",
        sachNr: "E4",
        auftragsmenge: getAlleAuftraege(4),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 9 ? 4 : i === 10 ? 3 : ""
        ),
      },
      {
        id: "hrd",
        bezeichnung: "",
        typ: "D",
        sachNr: "E5",
        auftragsmenge: getAlleAuftraege(5),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 9 ? 4 : i === 10 ? 3 : ""
        ),
      },
      {
        id: "hrh",
        bezeichnung: "",
        typ: "H",
        sachNr: "E6",
        auftragsmenge: getAlleAuftraege(6),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 9 ? 4 : i === 10 ? 3 : ""
        ),
      },

      // Vorderrad
      {
        id: "vrk",
        bezeichnung: t("teil.vorderrad"),
        typ: "K",
        sachNr: "E7",
        auftragsmenge: getAlleAuftraege(7),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 9 ? 4 : i === 10 ? 3 : ""
        ),
      },
      {
        id: "vrd",
        bezeichnung: "",
        typ: "D",
        sachNr: "E8",
        auftragsmenge: getAlleAuftraege(8),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 9 ? 4 : i === 10 ? 3 : ""
        ),
      },
      {
        id: "vrh",
        bezeichnung: "",
        typ: "H",
        sachNr: "E9",
        auftragsmenge: getAlleAuftraege(9),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 9 ? 4 : i === 10 ? 3 : ""
        ),
      },

      // Schutzblech hinten
      {
        id: "shk",
        bezeichnung: t("teil.schutzblech_hinten"),
        typ: "K",
        sachNr: "E10",
        auftragsmenge: getAlleAuftraege(10),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          [6, 8, 11, 12].includes(i) ? 3 : i === 7 ? 1 : i === 6 ? 2 : ""
        ),
      },
      {
        id: "shd",
        bezeichnung: "",
        typ: "D",
        sachNr: "E11",
        auftragsmenge: getAlleAuftraege(11),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          [6, 7, 8, 11, 12].includes(i) ? (i === 7 ? 2 : 3) : ""
        ),
      },
      {
        id: "shh",
        bezeichnung: "",
        typ: "H",
        sachNr: "E12",
        auftragsmenge: getAlleAuftraege(12),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          [6, 7, 8, 11, 12].includes(i) ? (i === 7 ? 2 : 3) : ""
        ),
      },

      // Schutzblech vorne
      {
        id: "svk",
        bezeichnung: t("teil.schutzblech_vorne"),
        typ: "K",
        sachNr: "E13",
        auftragsmenge: getAlleAuftraege(13),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          [6, 8, 11, 12].includes(i) ? 3 : i === 7 ? 1 : i === 6 ? 2 : ""
        ),
      },

      {
        id: "schutzblech_v_d",
        bezeichnung: "",
        typ: "D",
        sachNr: "E14",
        auftragsmenge: getAlleAuftraege(14),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          [6, 7].includes(i) ? 2 : i === 8 || i === 11 ? 3 : i === 12 ? 2 : ""
        ),
      },
      {
        id: "schutzblech_v_h",
        bezeichnung: "",
        typ: "H",
        sachNr: "E15",
        auftragsmenge: getAlleAuftraege(4),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          [6, 7].includes(i) ? 2 : i === 8 || i === 11 ? 3 : i === 12 ? 2 : ""
        ),
      },

      // Lenker
      {
        id: "lenker_kdh",
        bezeichnung: t("teil.lenker"),
        typ: "KDH",
        sachNr: "E16",
        auftragsmenge: getAlleAuftraege(16),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 5 ? 2 : i === 13 ? 3 : ""
        ),
      },

      // Sattel
      {
        id: "sattel_kdh",
        bezeichnung: t("teil.sattel"),
        typ: "KDH",
        sachNr: "E17",
        auftragsmenge: getAlleAuftraege(17),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 14 ? 3 : "")),
      },

      // Rahmen (K, D, H)
      {
        id: "rahmen_k",
        bezeichnung: t("teil.rahmen"),
        typ: "K",
        sachNr: "E18",
        auftragsmenge: getAlleAuftraege(18),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 5 ? 3 : i === 6 ? 2 : i === 7 ? 3 : i === 8 ? 2 : ""
        ),
      },
      {
        id: "rahmen_d",
        bezeichnung: "",
        typ: "D",
        sachNr: "E19",
        auftragsmenge: getAlleAuftraege(19),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 5 ? 3 : i === 6 ? 2 : i === 7 ? 3 : i === 8 ? 2 : ""
        ),
      },
      {
        id: "rahmen_h",
        bezeichnung: "",
        typ: "H",
        sachNr: "E20",
        auftragsmenge: getAlleAuftraege(20),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 5 ? 3 : i === 6 ? 2 : i === 7 ? 3 : i === 8 ? 2 : ""
        ),
      },
      {
        id: "pedale-kdh-e26",
        bezeichnung: t("teil.pedale"),
        typ: "KDH",
        sachNr: "E26",
        auftragsmenge: getAlleAuftraege(26),
        minutenLinks: Array.from({ length: 15 }, (_, i) =>
          i === 6 ? 2 : i === 14 ? 3 : ""
        ),
      },
      {
        id: "vorderrad_k-k-e49",
        bezeichnung: t("teil.vorderrad_cpl"),
        typ: "K",
        sachNr: "E49",
        auftragsmenge: getAlleAuftraege(49),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 0 ? 6 : "")),
      },
      {
        id: "vorderrad_k-d-e54",
        bezeichnung: "",
        typ: "D",
        sachNr: "E54",
        auftragsmenge: getAlleAuftraege(54),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 0 ? 6 : "")),
      },
      {
        id: "vorderrad_k-h-e29",
        bezeichnung: "",
        typ: "H",
        sachNr: "E29",
        auftragsmenge: getAlleAuftraege(29),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 0 ? 6 : "")),
      },
      {
        id: "rahm_u_räd-k-e50",
        bezeichnung: t("teil.rahmen_und_raeder"),
        typ: "K",
        sachNr: "E50",
        auftragsmenge: getAlleAuftraege(50),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 1 ? 5 : "")),
      },
      {
        id: "rahm_u_räd-d-e55",
        bezeichnung: "",
        typ: "D",
        sachNr: "E55",
        auftragsmenge: getAlleAuftraege(55),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 1 ? 5 : "")),
      },
      {
        id: "rahm_u_räd-h-e30",
        bezeichnung: "",
        typ: "H",
        sachNr: "E30",
        auftragsmenge: getAlleAuftraege(30),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 1 ? 5 : "")),
      },
      {
        id: "fahrr_o_peda-k-e51",
        bezeichnung: t("teil.fahrrad_ohne_pedale"),
        typ: "K",
        sachNr: "E51",
        auftragsmenge: getAlleAuftraege(51),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 2 ? 5 : "")),
      },
      {
        id: "fahrr_o_peda-d-e56",
        bezeichnung: "",
        typ: "D",
        sachNr: "E56",
        auftragsmenge: getAlleAuftraege(56),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 2 ? 6 : "")),
      },
      {
        id: "fahrr_o_peda-h-e31",
        bezeichnung: "",
        typ: "H",
        sachNr: "E31",
        auftragsmenge: getAlleAuftraege(31),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 2 ? 6 : "")),
      },
      {
        id: "fahrr_komplett-k-p1",
        bezeichnung: t("teil.fahrrad_komplett"),
        typ: "K",
        sachNr: "P1",
        auftragsmenge: getAlleAuftraege(1),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 3 ? 6 : "")),
      },
      {
        id: "fahrr_komplett-d-p2",
        bezeichnung: "",
        typ: "D",
        sachNr: "P2",
        auftragsmenge: getAlleAuftraege(2),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 3 ? 7 : "")),
      },
      {
        id: "fahrr_komplett-h-p3",
        bezeichnung: "",
        typ: "H",
        sachNr: "P3",
        auftragsmenge: getAlleAuftraege(3),
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 3 ? 7 : "")),
      },
    ],
    [t]
  );

  const ruestzeitEinfach = [
    60, 80, 60, 80, 0, 60, 210, 155, 140, 120, 80, 0, 0, 0, 30,
  ];

  const [ruestzeitGesamt, setRuestzeitGesamt] = useState(ruestzeitEinfach);
  const [rueckstandKapa, setRueckstandKapa] = useState<number[]>(
    Array(15).fill(0)
  );
  const [rueckstandRuestzeit, setRueckstandRuestzeit] = useState<number[]>(
    Array(15).fill(0)
  );
  const [gesamtKapaBedarf, setGesamtKapaBedarf] = useState<number[]>(
    Array(15).fill(0)
  );
  const [initialRuestzeitWurdeGesetzt, setInitialRuestzeitWurdeGesetzt] =
    useState(false);
  const [kapaBedarf, setKapaBedarf] = useState<number[]>(Array(15).fill(0));

  useEffect(() => {
    const neueKapaBedarf = Array.from({ length: 15 }, (_, i) => {
      const sum = zeilen.reduce((acc, zeile) => {
        const min = zeile.minutenLinks[i];
        return acc + (typeof min === "number" ? min * zeile.auftragsmenge : 0);
      }, 0);
      return sum; // immer eine Zahl (auch wenn 0)
    });

    setKapaBedarf(neueKapaBedarf);
  }, [zeilen]);

  useEffect(() => {
    if (!initialRuestzeitWurdeGesetzt && alleWaitingListEintraegeMitRuestzeit) {
      const arbeitsplatzRuestzeiten = Array(15).fill(0);
      alleWaitingListEintraegeMitRuestzeit.forEach((entry) => {
        const arbeitsplatzIndex = entry.arbeitsplatzId - 1;
        if (arbeitsplatzIndex >= 0 && arbeitsplatzIndex < 15) {
          arbeitsplatzRuestzeiten[arbeitsplatzIndex] += entry.zeit;
        }
      });

      setRueckstandRuestzeit(arbeitsplatzRuestzeiten);
      setInitialRuestzeitWurdeGesetzt(true);
    }
  }, [alleWaitingListEintraegeMitRuestzeit, initialRuestzeitWurdeGesetzt]);

  useEffect(() => {
    const gesamt = Array.from({ length: 15 }, (_, i) => {
      const kapa =
        typeof kapaBedarf[i] === "number" ? (kapaBedarf[i] as number) : 0;
      const ruest =
        typeof ruestzeitGesamt[i] === "number" ? ruestzeitGesamt[i] : 0;
      const ruecksKapa =
        typeof rueckstandKapa[i] === "number" ? rueckstandKapa[i] : 0;
      const ruecksRuest =
        typeof rueckstandRuestzeit[i] === "number" ? rueckstandRuestzeit[i] : 0;

      return kapa + ruest + ruecksKapa + ruecksRuest;
    });

    setGesamtKapaBedarf(gesamt);
  }, [kapaBedarf, ruestzeitGesamt, rueckstandKapa, rueckstandRuestzeit]);

  const handleRuestzeitChange = (index: number, value: string) => {
    const neueWerte = [...ruestzeitGesamt];
    neueWerte[index] = parseFloat(value) || 0;
    setRuestzeitGesamt(neueWerte);
  };

  const diffMaxArbeitszeit: (number | "")[] = Array.from(
    { length: 15 },
    (_, i) => {
      const gesamt = gesamtKapaBedarf[i];
      return typeof gesamt === "number" ? gesamt - 2400 : "";
    }
  );

  //Das (schichtUndÜberstund) ist auch ein Schleifencode wie bei diffMaxArbeitszeit. Nur ist er einfacher und verständlicher geschrieben.

  const schichtUndÜberstund = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const differenzZurMaxZeit = diffMaxArbeitszeit[i];
      return typeof differenzZurMaxZeit === "number"
        ? differenzZurMaxZeit / 5
        : "";
    });
  }, [diffMaxArbeitszeit]);

  const initialUeberstunde = Array.from({ length: 15 }, () => 0);
  const [benoetigteUeberstunden, setBenoetigteUeberstunden] =
    useState<(number | "")[]>(initialUeberstunde);

  useEffect(() => {
    setBenoetigteUeberstunden((prev) => {
      // Apply threshold logic to each item in schichtUndÜberstund
      const updated = schichtUndÜberstund.map((value) => {
        // Example threshold logic (customize as needed)
        if (typeof value === "number") {
          if ((value > 0 && value <= 240) || (value > 480 && value <= 720)) {
            return value > 480 ? value - 480 : value;
          } else {
            return 0;
          }
        }
        return "";
      });

      if (JSON.stringify(prev) !== JSON.stringify(updated)) {
        return updated;
      }

      return prev;
    });
  }, [schichtUndÜberstund]);

  const initialZusatzschichten = Array.from({ length: 15 }, (_, i) =>
    i === 4 ? 0 : 1
  );
  const [benoetigteZusatzschichten, setBenoetigteZusatzschichten] = useState<
    (number | "")[]
  >(initialZusatzschichten);

  useEffect(() => {
    setBenoetigteZusatzschichten((prev) => {
      const updated = schichtUndÜberstund.map((value) => {
        if (typeof value === "number") {
          if (value <= 720 - 480) {
            return 1;
          } else if (value > 720 - 480 && value <= 1200 - 480) {
            return 2;
          } else {
            return 3;
          }
        }
        return "";
      });

      if (JSON.stringify(prev) !== JSON.stringify(updated)) {
        return updated;
      }

      return prev;
    });
  }, [schichtUndÜberstund]);

  return (
    <div className="container-fluid mt-4">
      <h1>{t("Minutenplanung")}</h1>

      <br />
      <Table striped bordered hover className="minuten-tabelle">
        <thead>
          <tr>
            <th>{t("Bezeichnung")}</th>
            <th>{t("Typ")}</th>
            <th>{t("TeilNr.")}Nr</th>
            <th>{t("Auftragsmenge")}</th>
            {Array.from({ length: 15 }).map((_, i) => (
              <th colSpan={2} key={i}>{`${t("Platz")} ${i + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {zeilen.map((zeile) => (
            <tr key={zeile.id}>
              <td>{zeile.bezeichnung}</td>
              <td>{zeile.typ}</td>
              <td>{zeile.sachNr}</td>
              <td>{zeile.auftragsmenge}</td>
              {zeile.minutenLinks.map((min, i) => (
                <React.Fragment key={i}>
                  <td className="text-center">{min !== "" ? min : ""}</td>
                  <td className="text-center">
                    {min !== "" ? min * zeile.auftragsmenge : ""}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
          <tr id="kapabedarf_neu" className="label-fett">
            <td colSpan={4} className="align-middle text-center">
              {t("Kapazitätsbedarf (neu)")}
            </td>
            {kapaBedarf.map((wert, i) => (
              <td colSpan={2} key={i} className="text-center">
                {wert}
              </td>
            ))}
          </tr>

          <tr
            id="rüstzeit_neu"
            // className="label-fett"
          >
            <td colSpan={4}>
              {t("Einfache Rüstzeit / Rüstzeit gesamt (neu)")}
            </td>

            {ruestzeitEinfach.map((einfach, i) => (
              <React.Fragment key={i}>
                <td className="text-center">{einfach}</td>
                <td className="text-center">
                  <input
                    type="number"
                    value={ruestzeitGesamt[i]}
                    onChange={(e) => {
                      // removes leading 0
                      // @ts-ignore
                      e.target.value = Math.abs(e.target.value);
                      handleRuestzeitChange(i, e.target.value);
                    }}
                    disabled={i === 4}
                    readOnly={i === 4}
                    style={{
                      textAlign: "center",
                      border: "1px solid #ccc",
                      width: "60px",
                    }}
                  />
                </td>
              </React.Fragment>
            ))}
          </tr>

          <tr
            id="rückstandKapaBedarf_neu"
            // className="label-fett"
          >
            <td colSpan={4} className="align-middle text-center">
              {t("Kap.bed. (Rückstand Vorperiode)")}
            </td>
            {rueckstandKapa.map((value, i) => (
              <td colSpan={2} key={i}>
                {value}
              </td>
            ))}
          </tr>

          <tr id="rückstand_rüstzeit">
            <td colSpan={4} className="align-middle text-center">
              {t("Rüstzeit (Rückstand Vorperiode)")}
            </td>
            {rueckstandRuestzeit.map((wert, i) => (
              <td colSpan={2} key={i} className="text-center">
                <input
                  type="number"
                  value={wert}
                  disabled={i === 4 ? true : false}
                  onChange={(e) => {
                    // removes leading 0
                    // @ts-ignore
                    e.target.value = Math.abs(e.target.value);
                    const updatedRuestzeiten = [...rueckstandRuestzeit];
                    updatedRuestzeiten[i] = parseFloat(e.target.value) || 0;
                    setRueckstandRuestzeit(updatedRuestzeiten);
                  }}
                  style={{
                    width: "60px",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    backgroundColor: "white",
                  }}
                />
              </td>
            ))}
          </tr>

          <tr className="fw-bold bg-light">
            <td colSpan={4}>{t("Gesamt Kapazitätsbedarf")}</td>
            {gesamtKapaBedarf.map((val, i) => (
              <React.Fragment key={i}>
                <td colSpan={2} className="text-center">
                  {val}
                </td>
              </React.Fragment>
            ))}
          </tr>

          <tr id="diff_max_wochenarbeitszeit" className="label-fett">
            <td colSpan={4} className="align-middle text-center">
              {t("Differenz zu max. Wochenarbeitszeit")}
            </td>
            {diffMaxArbeitszeit.map((wert, i) => {
              let cellClass = "text-center";
              if (typeof wert === "number") {
                cellClass +=
                  wert < 0 ? " bg-success text-white" : " bg-danger text-white";
              }

              return (
                <td colSpan={2} key={i} className={cellClass}>
                  {typeof wert == "number" ? Math.ceil(wert) : ""}
                </td>
              );
            })}
          </tr>

          <tr id="schicht_u_überst" className="label-fett">
            <td colSpan={4} className="align-middle text-center">
              {t("Schichten und Überstunden / Überzeit pro Tag")}
            </td>
            {schichtUndÜberstund.map((wert, i) => {
              // Klasse basierend auf dem Wert bestimmen
              let cellClass = "text-center";
              if (typeof wert === "number") {
                cellClass +=
                  wert < 0 ? " bg-success text-white" : " bg-danger text-white";
              }

              return (
                <td colSpan={2} key={i} className={cellClass}>
                  {typeof wert == "number" ? Math.ceil(wert) : ""}
                </td>
              );
            })}
          </tr>
          {/* Abstand von 1cm per Leerzeile simulieren */}
          <tr>
            <td
              colSpan={34}
              style={{
                height: "1cm",
                background: "transparent",
                border: "none",
              }}
            />
          </tr>

          <tr id="benötigte_überstunden" className="label-fett">
            <td colSpan={4} className="text-center">
              {t("Benötigte Überstunden / pro Tag")}
            </td>

            {benoetigteUeberstunden.map((wert, i) => {
              return (
                <td colSpan={2} key={i}>
                  {typeof wert == "number" ? Math.ceil(wert) : ""}
                </td>
              );
            })}
          </tr>

          <tr id="benötigte_zusatzschichten" className="label-fett">
            <td colSpan={4} className="text-center">
              {t("Benötigte Zusatzschichten")}
            </td>

            {benoetigteZusatzschichten.map((wert, i) => {
              return (
                <td colSpan={2} key={i}>
                  {typeof wert == "number" ? Math.ceil(i === 4 ? 0 : wert) : ""}
                </td>
              );
            })}
          </tr>
          <tr>
            <td
              colSpan={34}
              style={{
                height: "1cm",
                background: "transparent",
                border: "none",
              }}
            />
          </tr>
          <tr>
            <td colSpan={34}>
              <h4 className="mt-4">
                {t("Warteliste je Arbeitsplatz (timeNeed je Teil)")}
              </h4>
              <Table
                // bordered size="sm"
                striped
                bordered
                hover
                className="table-waitinglist"
              >
                <thead>
                  <tr>
                    <th>{t("Arbeitsplatz")}</th>
                    <th>{t("Teil-Nr.")}</th>
                    <th>{t("Periode")}</th>
                    <th>{t("Auftrag")}</th>
                    <th>{t("Batch")}</th>
                    <th>{t("Menge")}</th>
                    <th>{t("timeNeed")}</th>
                    <th>{t("Rüstzeit")}</th>
                  </tr>
                </thead>
                <tbody>
                  {alleWaitingListEintraegeMitRuestzeit?.map((entry, index) => (
                    <tr key={index}>
                      <td className="text-center">{entry.arbeitsplatzId}</td>
                      <td className="text-center">{entry.item}</td>
                      <td className="text-center">{entry.period}</td>
                      <td className="text-center">{entry.order}</td>
                      <td className="text-center">
                        {entry.firstbatch} - {entry.lastbatch}
                      </td>
                      <td className="text-center">{entry.amount}</td>
                      <td className="text-center">{entry.timeNeed}</td>
                      <td className="text-center">{entry.zeit}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>

      <br />
      {speicherInfo && (
        <div className="text-center mt-3">
          <div className="alert alert-primary" role="alert">
            Arbeitszeiten erfolgreich gespeichert.
          </div>
        </div>
      )}
      <Button className="Button" onClick={save}>
        {t("Speichern")}
      </Button>
    </div>
  );
};
