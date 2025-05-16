import {useState} from 'react';
import {Button, Container, Form, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {ProduktionsPlanDTO} from '../dtos/ProduktionsPlanDTO';
import {useGeneralStore} from '../helper/GeneralStoreContext';

export function Produktionsplanung() {
    const {generalStore, setGeneralStoreData} = useGeneralStore();
    const input = generalStore?.input;

    if (!input) {
        return <p className="text-center mt-5">Keine XML-Daten verfügbar.</p>;
    }

    const forecast = input.results.forecast;

    const startPeriode = Number(input?.results?.period ?? 0) + 1;

    const [manuellePrognose, setManuellePrognose] = useState({
        p1: [0, 0, 0],
        p2: [0, 0, 0],
        p3: [0, 0, 0]
    });

    const [manuelleProduktion, setManuelleProduktion] = useState({
        p1: [0, 0, 0],
        p2: [0, 0, 0],
        p3: [0, 0, 0]
    });

    const [vertriebswunsch, setVertriebswunsch] = useState({p1: 0, p2: 0, p3: 0});

    const getRestbestand = (articleId: number): number => {
        const artikel = input.results.warehousestock.article.find(a => Number(a.id) === articleId);
        return Number(artikel?.amount) ?? 0;
    };

    const berechneRestbestaende = (produkt: 'p1' | 'p2' | 'p3'): number[] => {
        const restbestaende: number[] = [];
        const artikelId = parseInt(produkt[1]);
        const aktuellerBestand = getRestbestand(artikelId);

        const geplanteMengen = [
            vertriebswunsch[produkt],
            manuelleProduktion[produkt][0],
            manuelleProduktion[produkt][1],
            manuelleProduktion[produkt][2]
        ];

        const prognosen = [
            forecast[produkt],
            manuellePrognose[produkt][0],
            manuellePrognose[produkt][1],
            manuellePrognose[produkt][2]
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
        const plan = new ProduktionsPlanDTO(
            getRestbestand(1),
            getRestbestand(2),
            getRestbestand(3)
        );

        // Woche 0
        plan.p1ProduktionWoche0 = vertriebswunsch.p1;
        plan.p2ProduktionWoche0 = vertriebswunsch.p2;
        plan.p3ProduktionWoche0 = vertriebswunsch.p3;

        // Woche 1–3
        for (let i = 0; i < 3; i++) {
            // @ts-ignore
            plan[`p1ProduktionWoche${i + 1}`] = manuelleProduktion.p1[i];
            // @ts-ignore
            plan[`p2ProduktionWoche${i + 1}`] = manuelleProduktion.p2[i];
            // @ts-ignore
            plan[`p3ProduktionWoche${i + 1}`] = manuelleProduktion.p3[i];
        }

        setGeneralStoreData({...generalStore, produktionsPlan: plan});
        console.log("ProduktionsPlan gespeichert:", plan);
        setSpeicherInfo(true);
        setTimeout(() => setSpeicherInfo(false), 2200);
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Produktionsplanung</h1>

            <section className="mb-5">
                <h4>Prognose:</h4>
                <Table bordered hover responsive className="mt-3">
                    <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Periode {startPeriode}</th>
                        {[1, 2, 3].map((offset) => (
                            <th key={offset}>Periode {startPeriode + offset}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {(['p1', 'p2', 'p3'] as const).map((key, index) => (
                        <tr key={key}>
                            <td>Produkt {index + 1}</td>
                            <td>
                                <div style={{
                                    width: '150px',
                                    margin: '0 auto',
                                    padding: '6px 0',
                                    backgroundColor: '#f8f9fa',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    textAlign: 'center'
                                }}>
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
                                            const value = Math.max(0, parseInt(e.target.value) || 0);
                                            setManuellePrognose(prev => {
                                                const updated = [...prev[key]];
                                                updated[i] = value;
                                                return {...prev, [key]: updated};
                                            });
                                        }}
                                        style={{width: '150px', margin: '0 auto', textAlign: 'center'}}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </section>

            <section className="mb-5">
                <h4>Anfangsbestand der Periode {startPeriode}:</h4>
                <Table bordered className="mt-3 text-center align-middle" style={{maxWidth: '600px', margin: '0 auto'}}>
                    <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Bestand</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Produkt 1</td>
                        <td>{getRestbestand(1)}</td>
                    </tr>
                    <tr>
                        <td>Produkt 2</td>
                        <td>{getRestbestand(2)}</td>
                    </tr>
                    <tr>
                        <td>Produkt 3</td>
                        <td>{getRestbestand(3)}</td>
                    </tr>
                    </tbody>
                </Table>
            </section>

            <section className="mb-5">
                <h4>Geplante Produktionsmengen & Restbestände:</h4>
                <Table bordered hover responsive className="mt-3">
                    <thead>
                    <tr>
                        <th>Produkt</th>
                        {[0, 1, 2, 3].map(i => (
                            <th key={i}>Periode {startPeriode + i}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {(['p1', 'p2', 'p3'] as const).map((key, index) => {
                        const restbestaende = berechneRestbestaende(key);
                        return (
                            <tr key={key}>
                                <td>Produkt {index + 1}</td>
                                {[0, 1, 2, 3].map((i) => (
                                    <td key={i}>
                                        <Form.Group className="text-center">
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                value={i === 0 ? vertriebswunsch[key] : manuelleProduktion[key][i - 1]}
                                                onChange={(e) => {
                                                    // removes leading 0
                                                    // @ts-ignore
                                                    e.target.value = Math.abs(e.target.value);
                                                    const value = Math.max(0, parseInt(e.target.value) || 0);
                                                    if (i === 0) {
                                                        setVertriebswunsch(prev => ({...prev, [key]: value}));
                                                    } else {
                                                        setManuelleProduktion(prev => {
                                                            const updated = [...prev[key]];
                                                            updated[i - 1] = value;
                                                            return {...prev, [key]: updated};
                                                        });
                                                    }
                                                }}
                                                style={{width: '150px', margin: '0 auto', textAlign: 'center'}}
                                            />
                                            <div style={{
                                                fontSize: '0.9em',
                                                color: restbestaende[i] < 0 ? 'red' : 'black',
                                                fontWeight: 'bold',
                                                marginTop: '4px'
                                            }}>
                                                Restbestand: {restbestaende[i]}
                                            </div>
                                        </Form.Group>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
                {speicherInfo && (
                    <div className="text-center mt-3">
                        <div className="alert alert-primary" role="alert">
                            Produktionsplan wurde erfolgreich gespeichert.
                        </div>
                    </div>
                )}
                <div className="text-center mt-3">
                    <Button variant="primary" onClick={handlePlanErstellen}>Speichern</Button>
                </div>
            </section>

            <section className="d-flex justify-content-center gap-3 mt-4">
                <LinkContainer to="/">
                    <Button variant="outline-secondary">Startseite</Button>
                </LinkContainer>
                <LinkContainer to="/Teileproduktion">
                    <Button variant="outline-secondary">Teileproduktion</Button>
                </LinkContainer>
            </section>
        </Container>
    );
}
