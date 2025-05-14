import {useState} from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {ProduktionsAuftragDTO} from "../dtos/ProduktionsAuftragDTO.tsx";
import {useGeneralStore} from "../helper/GeneralStoreContext.tsx";

export function ReihenfolgeLosgroessenPlanung() {
    const {generalStore, setGeneralStoreData} = useGeneralStore()
    const output = generalStore?.output?.input
    const Auftraege = generalStore?.produktionsAuftrag ?? [new ProduktionsAuftragDTO(0, 0)]

    const [auftraege, setAuftraege] = useState<ProduktionsAuftragDTO[]>(Auftraege);

    const resetProduktionsAuftraege = () => {
        setAuftraege(Auftraege);
    };

    const updateAuftrag = (index: number, field: keyof ProduktionsAuftragDTO, value: number) => {
        const updated = [...auftraege];
        updated[Math.ceil(index)][field] = Math.ceil(value);
        setAuftraege(updated);
    };

    const addAuftrag = () => {
        setAuftraege([...auftraege, new ProduktionsAuftragDTO(0, 0)]);
    };

    const save = () => {
        const newProduktion = auftraege
            .filter(produktionsAuftrag => produktionsAuftrag.menge > 0)
            .map(produktionsAuftrag => ({
                article: produktionsAuftrag.kaufteilID,
                quantity: produktionsAuftrag.menge
            }))

        const updatedOutput = {
            ...(output ?? {}),
            productionlist: {
                ...(output?.productionlist ?? {}),
                production: newProduktion
            }
        };

        setGeneralStoreData({
            ...generalStore,
            output: {
                input: updatedOutput
            }
        });
    };

    const duplicateAuftrag = (index: number) => {
        const original = auftraege[index];
        const halbMenge = Math.floor(original.menge / 2);
        const restMenge = original.menge - halbMenge;

        // Original bekommt neue Menge
        const updatedOriginal = new ProduktionsAuftragDTO(
            original.kaufteilID,
            halbMenge
        );

        // Duplikat mit der anderen Hälfte
        const duplicated = new ProduktionsAuftragDTO(
            original.kaufteilID,
            restMenge
        );

        const updated = [...auftraege];
        updated.splice(index, 1, updatedOriginal);
        updated.splice(index + 1, 0, duplicated);

        setAuftraege(updated);
    };


    const moveUp = (index: number) => {
        if (index === 0) return;
        const updated = [...auftraege];
        [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
        setAuftraege(updated);
    };

    const moveDown = (index: number) => {
        if (index === auftraege.length - 1) return;
        const updated = [...auftraege];
        [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
        setAuftraege(updated);
    };

    const removeAuftrag = (index: number) => {
        const updated = [...auftraege];
        updated.splice(index, 1);
        setAuftraege(updated);
    };

    return (
        <div className="p-4">
            <h4>Reihenfolge- & Losgrößenplanung</h4>
            <br/>
            <Button onClick={resetProduktionsAuftraege} variant="danger">
                Aufträge zurücksetzen
            </Button>
            <br/>
            <br/>
            {auftraege.map((auftrag, index) => (
                <Card key={index + "key"} className="mb-3">
                    <Card.Body>
                        <Row className="align-items-end">
                            <Col md={3}>
                                <Form.Group controlId={`kaufteilID-${index}`}>
                                    <Form.Label>Produktionsteil ID</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={auftrag.kaufteilID}
                                        min={0}
                                        onChange={(e) => updateAuftrag(index, 'kaufteilID', Number(e.target.value))}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId={`menge-${index}`}>
                                    <Form.Label>Menge</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={auftrag.menge}
                                        min={0}
                                        onChange={(e) => updateAuftrag(index, 'menge', Number(e.target.value))}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="text-end">
                                {index !== 0 &&
                                    <Button variant="secondary" onClick={() => moveUp(index)} className="me-2">
                                        ↑
                                    </Button>
                                }
                                {index !== auftraege.length - 1 &&
                                    <Button variant="secondary" onClick={() => moveDown(index)} className="me-2">
                                        ↓
                                    </Button>
                                }
                                <Button variant="warning" onClick={() => duplicateAuftrag(index)} className="me-2">
                                    Duplizieren
                                </Button>
                                <Button variant="danger" onClick={() => removeAuftrag(index)}>
                                    Entfernen
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
            <Row className="align-items-end">
                <Col md={6}>
                    <Button onClick={addAuftrag} variant="primary">
                        Neuen Auftrag hinzufügen
                    </Button>
                </Col>
                <Col md={6}>
                    <Button onClick={save} variant="primary">
                        Aufträge speichern
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
