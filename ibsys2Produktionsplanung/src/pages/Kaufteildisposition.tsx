import {Button, Dropdown, DropdownButton, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useGeneralStore} from '../helper/GeneralStoreContext';
import {ProduktionsPlanDTO} from "../dtos/ProduktionsPlanDTO.tsx";
import {Kaufteil, Kaufteile} from '../dtos/Kaufteile.tsx';
import {useState} from "react";
import {BestellTyp, BestellungDTO} from "../dtos/BestellungDTO.tsx";
import {Order} from "../dtos/XMLOutput.tsx";

export function Kaufteildisposition() {
    const {generalStore, setGeneralStoreData} = useGeneralStore()

    console.log(generalStore)
    const input = generalStore?.input?.results
    const output = generalStore?.output?.input
    const periode = input ? input.period : 0
    const orders = input?.futureinwardstockmovement.order
    const produktionsPlan = generalStore?.produktionsPlan ?? new ProduktionsPlanDTO(0, 0, 0);

    const [bestellungen, setBestellungen] = useState<BestellungDTO[]>(initializeBestellungen());

    produktionsPlan.p1ProduktionWoche0 = 100;
    produktionsPlan.p2ProduktionWoche0 = 200;
    produktionsPlan.p3ProduktionWoche0 = 300;

    produktionsPlan.p1ProduktionWoche1 = 101;
    produktionsPlan.p2ProduktionWoche1 = 201;
    produktionsPlan.p3ProduktionWoche1 = 301;

    produktionsPlan.p1ProduktionWoche2 = 102;
    produktionsPlan.p2ProduktionWoche2 = 202;
    produktionsPlan.p3ProduktionWoche2 = 302;

    produktionsPlan.p1ProduktionWoche3 = 103;
    produktionsPlan.p2ProduktionWoche3 = 203;
    produktionsPlan.p3ProduktionWoche3 = 303;

    function initializeBestellungen() {
        //initialize all orders
        const result: BestellungDTO[] = [];
        Kaufteile.forEach(kaufteil => {
            result[kaufteil.id] = new BestellungDTO(kaufteil.id, BestellTyp.KEINE, 0, false, periode);
        })

        //set already existing orders
        if (orders !== undefined) {
            orders.forEach(order => {
                result[order.article] = new BestellungDTO(order.article, getBestellTyp(order.mode), order.amount, order.orderperiod !== periode, order.orderperiod)
            })
        }
        return result;
    }

    /**
     * function to convert scs modus into {@link BestellTyp}
     * @param mode of the order
     */
    function getBestellTyp(mode: number) {
        if (mode === 5) {
            return BestellTyp.NORMAL;
        } else if (mode === 4) {
            return BestellTyp.EIL;
        } else {
            return BestellTyp.KEINE;
        }
    }

    /**
     * function to convert {@link BestellTyp} into the modus of scs tool
     * @param typ of the order
     */
    function getModus(typ: BestellTyp) {
        if (typ === BestellTyp.NORMAL) {
            return 5;
        }
        return 4;
    }

    function setBestellung(kaufteilNummer: number, typ: BestellTyp, menge: number) {
        setBestellungen(prevState => prevState.map((bestellung) => {
            if (bestellung.kaufteilID === kaufteilNummer) {
                if (typ === BestellTyp.KEINE && menge !== 0) {
                    bestellung.typ = BestellTyp.NORMAL;
                    bestellung.menge = Math.ceil(menge);
                } else {
                    bestellung.typ = typ;
                    bestellung.menge = Math.ceil(menge);
                }
                return bestellung;
            } else {
                return bestellung;
            }
        }))
    }

    function getBedarf(kaufteil: Kaufteil, p1: number, p2: number, p3: number) {
        return kaufteil.verwendungP1 * p1 + kaufteil.verwendungP2 * p2 + kaufteil.verwendungP3 * p3;
    }

    function getOptimaleBestellmenge(kaufteil: Kaufteil) {
        return Math.ceil(Math.sqrt((2 * getGesamtBedarf(kaufteil) * kaufteil.bestellKosten) / (kaufteil.wert * 0.024)));
    }

    function getGesamtBedarf(kaufteil: Kaufteil) {
        return getWochenBedarf(periode, kaufteil) + getWochenBedarf(periode + 1, kaufteil) + getWochenBedarf(periode + 2, kaufteil) + getWochenBedarf(periode + 3, kaufteil);
    }

    function getWochenBedarf(woche: number, kaufteil: Kaufteil) {
        switch (woche) {
            case periode :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche0, produktionsPlan.p2ProduktionWoche0, produktionsPlan.p3ProduktionWoche0)
            case periode + 1 :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche1, produktionsPlan.p2ProduktionWoche1, produktionsPlan.p3ProduktionWoche1)
            case periode + 2 :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche2, produktionsPlan.p2ProduktionWoche2, produktionsPlan.p3ProduktionWoche2)
            case periode + 3 :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche3, produktionsPlan.p2ProduktionWoche3, produktionsPlan.p3ProduktionWoche3)
            default :
                return -1;
        }
    }

    //TODO testen
    function save() {
        const existingOrders = output?.orderlist?.order ?? [];
    
        const newOrders = bestellungen
            .filter(b => b.menge > 0)
            .map(b => ({
                article: b.kaufteilID,
                quantity: b.menge,
                modus: getModus(b.typ)
            }))
            .filter(newOrder => 
                !existingOrders.some(existing => existing.article === newOrder.article)
            );
    
        if (newOrders.length === 0) return;
    
        const updatedOutput = {
            ...(output ?? {}),
            orderlist: {
                ...(output?.orderlist ?? {}),
                order: [...existingOrders, ...newOrders]
            }
        };
    
        setGeneralStoreData({
            ...generalStore,
            output: {
                input: updatedOutput
            }
        });
    }    

    return (
        <div>
            <h1>Kaufteildisposition</h1>
            <Table>
                <thead>
                <tr>
                    <th>Produktionsprogramm</th>
                </tr>
                <tr>
                    <th>Fahrrad</th>
                    <th>Periode {periode}</th>
                    <th>Periode {periode + 1}</th>
                    <th>Periode {periode + 2}</th>
                    <th>Periode {periode + 3}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>P1</th>
                    <th>{produktionsPlan.p1ProduktionWoche0}</th>
                    <th>{produktionsPlan.p1ProduktionWoche1}</th>
                    <th>{produktionsPlan.p1ProduktionWoche2}</th>
                    <th>{produktionsPlan.p1ProduktionWoche3}</th>
                </tr>
                <tr>
                    <th>P2</th>
                    <th>{produktionsPlan.p2ProduktionWoche0}</th>
                    <th>{produktionsPlan.p2ProduktionWoche1}</th>
                    <th>{produktionsPlan.p2ProduktionWoche2}</th>
                    <th>{produktionsPlan.p2ProduktionWoche3}</th>
                </tr>
                <tr>
                    <th>P3</th>
                    <th>{produktionsPlan.p3ProduktionWoche0}</th>
                    <th>{produktionsPlan.p3ProduktionWoche1}</th>
                    <th>{produktionsPlan.p3ProduktionWoche2}</th>
                    <th>{produktionsPlan.p3ProduktionWoche3}</th>
                </tr>
                </tbody>
            </Table>

            <br/>

            <Table>
                <thead>
                <tr>
                    <th>Kaufteil</th>
                    <th>Verwendung</th>
                    <th>Restbestand</th>
                    <th>Gesamt Bedarf</th>
                    <th>Bedarf Periode {periode} / {periode + 1} / {periode + 2} / {periode + 3}</th>
                    <th>Diskontmenge</th>
                    <th>Optimale Bestellmenge</th>
                    <th>Bestellung</th>
                    <th>Menge</th>
                    <th>Bestell Periode</th>
                </tr>
                </thead>
                <tbody>
                { // for each bought item, the row of the table gets filled
                    Kaufteile.map(kaufteil => {
                        const id = kaufteil.id;
                        return <tr key={id}>
                            <td>{id}</td>
                            <td>{kaufteil.verwendungP1} / {kaufteil.verwendungP2} / {kaufteil.verwendungP3}</td>
                            <td>{kaufteil.restbestandVorperiode}</td>
                            <td>{getGesamtBedarf(kaufteil)}</td>
                            <td>{getWochenBedarf(periode, kaufteil)} / {getWochenBedarf(periode + 1, kaufteil)} / {getWochenBedarf(periode + 2, kaufteil)} / {getWochenBedarf(periode + 3, kaufteil)}</td>
                            <td>{kaufteil.diskontmenge}</td>
                            <td>{getOptimaleBestellmenge(kaufteil)}</td>
                            <td><DropdownButton
                                title={bestellungen[id].typ}
                                size="sm"
                                disabled={bestellungen[id].bereitsBestellt}
                            >
                                {Object.values(BestellTyp).map((art) => (
                                    <Dropdown.Item key={art}
                                                   onClick={() => setBestellung(id, art, bestellungen[id].menge)}>
                                        {art}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton></td>
                            <td>
                                <input
                                    min={0}
                                    type="number"
                                    value={bestellungen[id].menge}
                                    disabled={bestellungen[id].bereitsBestellt}
                                    onChange={(e) => setBestellung(id, bestellungen[id].typ, Number(e.target.value))}
                                />
                            </td>
                            <td>{bestellungen[id].bestellPeriode}</td>
                        </tr>;
                    })
                }
                </tbody>
            </Table>

            <br/>

            <Button className="Button"
                    onClick={save}
            >
                Bestellungen Speichern
            </Button>

            <br/>
            <br/>

            <LinkContainer to="/Minutenplanung">
                <Button className="Button">
                    Zurück
                </Button>
            </LinkContainer>
            <LinkContainer to="/">
                <Button className="Button">
                    Weiter
                </Button>
            </LinkContainer>
        </div>
    );
}