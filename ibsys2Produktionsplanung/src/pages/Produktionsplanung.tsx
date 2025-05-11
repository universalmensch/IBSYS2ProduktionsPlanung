import { useState } from 'react';
import { Button, Container, Table, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ProduktionsPlanDTO } from '../dtos/ProduktionsPlanDTO';
import { useGeneralStore } from '../helper/GeneralStoreContext';

export function Produktionsplanung() {
    const { generalStore, setGeneralStoreData } = useGeneralStore();
    const input = generalStore?.input;

    if (!input) {
        return <p className="text-center mt-5">Keine XML-Daten verfügbar.</p>;
    }

    const forecast = input.results.forecast;

    const getRestbestand = (articleId: number): number => {
        const artikel = input.results.warehousestock.article.find(a => Number(a.id) === articleId);
        return Number(artikel?.amount) ?? 0;
    };

    const [vertriebswunsch, setVertriebswunsch] = useState({ p1: 0, p2: 0, p3: 0 });

    const handlePlanErstellen = () => {
        const plan = new ProduktionsPlanDTO(
            getRestbestand(1),
            getRestbestand(2),
            getRestbestand(3)
        );
        plan.p1ProduktionWoche0 = vertriebswunsch.p1;
        plan.p2ProduktionWoche0 = vertriebswunsch.p2;
        plan.p3ProduktionWoche0 = vertriebswunsch.p3;

        setGeneralStoreData({ ...generalStore, produktionsPlan: plan });
        console.log("ProduktionsPlan gespeichert:", plan);
    };

    const berechneRestbestand = (produkt: 'p1' | 'p2' | 'p3') => {
        const anfang = getRestbestand(parseInt(produkt[1]));
        const prognose = forecast[produkt];
        const wunsch = vertriebswunsch[produkt];
        return anfang + wunsch - prognose;
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Produktionsplanung</h1>

            <section className="mb-5">
                <h4>Prognose – Periode {input.results.period}</h4>
                <Table bordered hover responsive className="mt-3">
                    <thead>
                        <tr><th>Produkt</th><th>Prognose</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Produkt 1</td><td>{forecast.p1}</td></tr>
                        <tr><td>Produkt 2</td><td>{forecast.p2}</td></tr>
                        <tr><td>Produkt 3</td><td>{forecast.p3}</td></tr>
                    </tbody>
                </Table>
            </section>

            <section className="mb-5">
                <h4>Aktueller Restbestand</h4>
                <Table bordered hover responsive className="mt-3" style={{ backgroundColor: '#ffffcc' }}>
                    <thead>
                        <tr><th>Produkt</th><th>Restbestand</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>P1</td><td>{getRestbestand(1)}</td></tr>
                        <tr><td>P2</td><td>{getRestbestand(2)}</td></tr>
                        <tr><td>P3</td><td>{getRestbestand(3)}</td></tr>
                    </tbody>
                </Table>
            </section>

            <section className="mb-5 text-center">
                <h4>Vertriebswunsch eingeben</h4>
                <Form className="mt-4">
                    {(['p1', 'p2', 'p3'] as const).map((key, i) => {
                        const restwert = berechneRestbestand(key);
                        return (
                            <Row className="justify-content-center align-items-center mb-3" key={key}>
                                <Col xs="auto">
                                    <Form.Label className="mt-2">Produkt {i + 1}</Form.Label>
                                </Col>
                                <Col xs="auto">
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        value={vertriebswunsch[key]}
                                        onChange={e =>
                                            setVertriebswunsch({
                                                ...vertriebswunsch,
                                                [key]: Math.max(0, Math.floor(Number(e.target.value) || 0))
                                            })
                                        }
                                        style={{ width: '100px' }}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Form.Control
                                        value={restwert}
                                        readOnly
                                        disabled
                                        style={{
                                            width: '100px',
                                            backgroundColor: restwert < 0 ? '#f8d7da' : '#eee',
                                            color: restwert < 0 ? '#842029' : 'inherit',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <span className="text-muted">← berechneter Restbestand</span>
                                </Col>
                            </Row>
                        );
                    })}
                </Form>
                <Button variant="primary" onClick={handlePlanErstellen}>
                    Speichern
                </Button>
            </section>

            <section className="d-flex justify-content-center gap-3 mt-4">
                <LinkContainer to="/">
                    <Button variant="outline-secondary">Startseite</Button>
                </LinkContainer>
                <LinkContainer to="/Minutenplanung">
                    <Button variant="outline-secondary">Minutenplanung</Button>
                </LinkContainer>
            </section>
        </Container>
    );
}
