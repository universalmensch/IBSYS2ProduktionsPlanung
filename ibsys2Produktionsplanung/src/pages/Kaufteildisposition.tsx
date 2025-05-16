import {Button, Dropdown, DropdownButton, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useGeneralStore} from '../helper/GeneralStoreContext';
import {ProduktionsPlanDTO} from "../dtos/ProduktionsPlanDTO.tsx";
import {Kaufteil, Kaufteile} from '../dtos/Kaufteile.tsx';
import {useState} from "react";
import {BestellTyp, BestellungDTO} from "../dtos/BestellungDTO.tsx";

export function Kaufteildisposition() {
    const {generalStore, setGeneralStoreData} = useGeneralStore()

    const input = generalStore?.input?.results
    const periode = input ? Number(input.period) + 1 : 0
    const orders = input?.futureinwardstockmovement.order
    const restBestand = input?.warehousestock?.article

    const lagerWert = restBestand?.reduce((sum, article) => sum + ((article.amount ?? 0) * (article.price ?? 0)), 0) ?? 0
    const LAGER_KOSTEN_SATZ = 0.3 + (lagerWert > 250000 ? 260000 / lagerWert : 0);

    const output = generalStore?.output?.input
    const newOrders = output?.orderlist

    const produktionsPlan = generalStore?.produktionsPlan ?? new ProduktionsPlanDTO(0, 0, 0);

    const [bestellungen, setBestellungen] = useState<BestellungDTO[]>(initializeBestellungen());
    const [alteBestellungen] = useState<BestellungDTO[]>(initializeAlteBestellungen());
    const [initialisierteKaufteile] = useState<Kaufteil[]>(initializeKaufteile());

    function initializeAlteBestellungen() {
        const result: BestellungDTO[] = [];

        //set already existing orders
        if (orders !== undefined) {
            orders.forEach(order => {
                result[order.article] = new BestellungDTO(order.article, getBestellTyp(Number(order.mode)), order.amount, order.orderperiod)
            })
        }
        return result;
    }

    function initializeKaufteile() {
        const result = Kaufteile.map(teil => new Kaufteil(teil.id, teil.lieferzeit, teil.lieferzeitAbweichung, teil.verwendungP1, teil.verwendungP2, teil.verwendungP3, teil.diskontmenge, teil.wert, teil.bestellKosten));
        result.forEach((kaufteil: Kaufteil) => {
            //set Restbestand
            if (restBestand !== undefined) {
                kaufteil.restbestandVorperiode = restBestand.filter(r => r.id == kaufteil.id)[0].amount
            }
        });

        console.log(result)

        return result;
    }

    function initializeBestellungen() {
        const result: BestellungDTO[] = [];

        //initialize all orders
        Kaufteile.forEach(kaufteil => {
            result[kaufteil.id] = new BestellungDTO(kaufteil.id, BestellTyp.KEINE, 0, periode);
        })

        //set newly set orders
        if (newOrders !== undefined) {
            newOrders.order.forEach(order => {
                result[order.article] = new BestellungDTO(order.article, getBestellTyp(Number(order.modus)), order.quantity, periode)
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

    function getJahresBedarf(kaufteil: Kaufteil) {
        return Math.ceil((getGesamtBedarf(kaufteil) / 28) * 365);
    }

    function getBedarf(kaufteil: Kaufteil, p1: number, p2: number, p3: number) {
        return kaufteil.verwendungP1 * p1 + kaufteil.verwendungP2 * p2 + kaufteil.verwendungP3 * p3;
    }

    function getOptimaleBestellmenge(kaufteil: Kaufteil) {
        return Math.ceil(Math.sqrt((2 * getJahresBedarf(kaufteil) * kaufteil.bestellKosten * (bestellungen[kaufteil.id].typ === BestellTyp.EIL ? 10 : 1)) / (kaufteil.wert * LAGER_KOSTEN_SATZ)));
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

    function save() {
        const newOrders = bestellungen
            .filter(b => b.menge > 0)
            .map(b => ({
                article: b.kaufteilID,
                quantity: b.menge,
                modus: getModus(b.typ)
            }))

        const updatedOutput = {
            ...(output ?? {}),
            orderlist: {
                ...(output?.orderlist ?? {}),
                order: newOrders
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

            {
                (orders !== undefined) && <Table>
                    <thead>
                    <tr>
                        <th>Ausgeführte Bestellungen</th>
                    </tr>
                    <tr>
                        <th>Kaufteil</th>
                        <th>Lieferzeit in Tagen</th>
                        <th>Abweichung in Tagen</th>
                        <th>Restbestand</th>
                        <th>Gesamt Bedarf</th>
                        <th>Bestellung</th>
                        <th>Menge</th>
                        <th>Bestell Periode</th>
                    </tr>
                    </thead>
                    <tbody>
                    { // for each bought item, the row of the table gets filled
                        initialisierteKaufteile.map(kaufteil => {
                            const id = kaufteil.id;
                            if (alteBestellungen[id] !== undefined) {
                                return <tr key={id}>
                                    <td>{id}</td>
                                    <td>{kaufteil.lieferzeit}</td>
                                    <td>{kaufteil.lieferzeitAbweichung}</td>
                                    <td>{kaufteil.restbestandVorperiode}</td>
                                    <td>{getGesamtBedarf(kaufteil)}</td>
                                    <td><b>{alteBestellungen[id].typ}</b></td>
                                    <td><b>{alteBestellungen[id].menge}</b></td>
                                    <td>{alteBestellungen[id].bestellPeriode}</td>
                                </tr>;
                            }

                        })
                    }
                    </tbody>
                </Table>
            }

            <br/>
            <p>aktueller Lagerwert: {lagerWert.toFixed(2)} €</p>

            <Table>
                <thead>
                <tr>
                    <th>Neue Bestellungen</th>
                </tr>
                <tr>
                    <th>Kaufteil</th>
                    <th>Lieferzeit / Abweichung in Tagen</th>
                    <th>Verwendung<br/>P1 / P2 / P3</th>
                    <th>Restbestand</th>
                    <th>Gesamt Bedarf</th>
                    <th>Bedarf Periode<br/>{periode} / {periode + 1} / {periode + 2} / {periode + 3}</th>
                    <th>Diskontmenge</th>
                    <th>Jahresbedarf/ Bestellkosten /<br/>Wert / Lagerkostensatz</th>
                    <th>Optimale Bestellmenge</th>
                    <th>Bestellung</th>
                    <th>Menge</th>
                    <th>Bestell Periode</th>
                </tr>
                </thead>
                <tbody>
                { // for each bought item, the row of the table gets filled
                    initialisierteKaufteile.map(kaufteil => {
                        const id = kaufteil.id;
                        return <tr key={id}>
                            <td>{id}</td>
                            <td>{kaufteil.lieferzeit} / {kaufteil.lieferzeitAbweichung}</td>
                            <td>{kaufteil.verwendungP1} / {kaufteil.verwendungP2} / {kaufteil.verwendungP3}</td>
                            <td>{kaufteil.restbestandVorperiode}</td>
                            <td>{getGesamtBedarf(kaufteil)}</td>
                            <td>{getWochenBedarf(periode, kaufteil)} / {getWochenBedarf(periode + 1, kaufteil)} / {getWochenBedarf(periode + 2, kaufteil)} / {getWochenBedarf(periode + 3, kaufteil)}</td>
                            <td>{kaufteil.diskontmenge}</td>
                            <td>{getJahresBedarf(kaufteil)} / {kaufteil.bestellKosten * (bestellungen[id].typ === BestellTyp.EIL ? 10 : 1)}€
                                / {kaufteil.wert}€
                                / {(LAGER_KOSTEN_SATZ * 100).toFixed(2)}%
                            </td>
                            <td>{getOptimaleBestellmenge(kaufteil)}</td>
                            <td><DropdownButton
                                title={bestellungen[id].typ}
                                size="sm"
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
                                    onChange={(e) => {
                                        // removes leading 0
                                        // @ts-ignore
                                        e.target.value = Math.abs(e.target.value);
                                        setBestellung(id, bestellungen[id].typ, Number(e.target.value))
                                    }}
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