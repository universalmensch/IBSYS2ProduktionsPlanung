import { Button, Form, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { ProduktionsPlanDTO } from '../dtos/ProduktionsPlanDTO';

export function Produktionsplanung() {
    const [bestand, setBestand] = useState({
        p1Restbestand: '',
        p2Restbestand: '',
        p3Restbestand: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBestand((prev) => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Beispiel: DTO-Erstellung aus den Eingaben
        const dto = new ProduktionsPlanDTO(
            bestand.p1Restbestand,
            bestand.p2Restbestand,
            bestand.p3Restbestand
        );

        console.log('DTO erstellt:', dto);
    };

    return (
        <div>
            <h1>Produktionsplanung</h1>

            <LinkContainer to="/">
                <Button className="Button">Startseite</Button>
            </LinkContainer>
            <LinkContainer to="/Minutenplanung">
                <Button className="Button">Minutenplanung</Button>
            </LinkContainer>

            <h2 className="mt-4">Aktueller Restbestand</h2>
            <Form onSubmit={handleSubmit}>
                <Table bordered style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>Aktueller Restbestand:</th>
                            <th>P1</th>
                            <th>P2</th>
                            <th>P3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="p1Restbestand"
                                    value={bestand.p1Restbestand}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="p2Restbestand"
                                    value={bestand.p2Restbestand}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="p3Restbestand"
                                    value={bestand.p3Restbestand}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="primary" type="submit">Speichern</Button>
            </Form>
        </div>
    );
}

