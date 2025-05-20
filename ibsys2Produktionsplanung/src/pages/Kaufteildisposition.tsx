import {Button, Dropdown, DropdownButton, Table} from 'react-bootstrap';
import {useGeneralStore} from '../helper/GeneralStoreContext';
import {ProduktionsPlanDTO} from "../dtos/ProduktionsPlanDTO.tsx";
import {Kaufteil, Kaufteile} from '../dtos/Kaufteile.tsx';
import {useEffect, useState} from "react";
import {BestellTyp, BestellungDTO} from "../dtos/BestellungDTO.tsx";
import {useTranslation} from "react-i18next";

export function Kaufteildisposition() {
    const {t, i18n} = useTranslation();
    const {generalStore, setGeneralStoreData} = useGeneralStore()

    const input = generalStore?.input?.results
    const periode = input ? Number(input.period) + 1 : 0
    const orders = input?.futureinwardstockmovement.order
    const restBestand = input?.warehousestock?.article

    const lagerWert = restBestand?.reduce((sum, article) => sum + ((article.amount ?? 0) * (article.price ?? 0)), 0) ?? 0
    const LAGER_KOSTEN_SATZ = 0.3 + (lagerWert > 250000 ? 260000 / lagerWert : 0);

    const output = generalStore?.output?.input
    const newOrders = output?.orderlist

    const produktionsPlan = generalStore?.produktionsPlan ?? new ProduktionsPlanDTO();

    const [bestellungen, setBestellungen] = useState<BestellungDTO[]>(initializeBestellungen());
    const [alteBestellungen] = useState<BestellungDTO[]>(initializeAlteBestellungen());
    const [initialisierteKaufteile] = useState<Kaufteil[]>(initializeKaufteile());
    const [speicherInfo, setSpeicherInfo] = useState(false);

    useEffect(() => {

    }, [i18n.language])

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
        return Math.ceil(Math.sqrt((2 * getJahresBedarf(kaufteil) * kaufteil.bestellKosten) / (kaufteil.wert * LAGER_KOSTEN_SATZ)));
    }

    function getOptimaleBestellmengeEil(kaufteil: Kaufteil) {
        return Math.ceil(Math.sqrt((2 * getJahresBedarf(kaufteil) * kaufteil.bestellKosten * 10) / (kaufteil.wert * LAGER_KOSTEN_SATZ)));
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

        setSpeicherInfo(true);
        setTimeout(() => setSpeicherInfo(false), 3000);
    }

    function checkWhenRestbestandExhausted(periode: number, kaufteil: Kaufteil) {

        let restbestandKaufteil = Number(kaufteil.restbestandVorperiode);  // Initial stock
        const weeks = [0, 1, 2, 3];  // Weeks we need to check (Woche 1, Woche 2, Woche 3, Woche 4)
        const bedarf = [
            getWochenBedarf(periode, kaufteil),  // Week 1 demand
            getWochenBedarf(periode + 1, kaufteil),  // Week 2 demand
            getWochenBedarf(periode + 2, kaufteil),  // Week 3 demand
            getWochenBedarf(periode + 3, kaufteil),  // Week 4 demand
        ];

        const futureinwardOrder = orders?.find(o => Number(o.article) === kaufteil.id)
        if (futureinwardOrder) {
            const eilabzug = futureinwardOrder.mode == 4 ? 2 : 1
            const futureinwardwhen = Math.ceil((futureinwardOrder.orderperiod - periode) + ((kaufteil.lieferzeit + kaufteil.lieferzeitAbweichung) / 5) / eilabzug)
            bedarf[futureinwardwhen] -= futureinwardOrder.amount;
        }

        // Loop over each week
        for (let i = 0; i < weeks.length; i++) {
            if (bedarf[i] === 0) {
                return 5;
            }
            restbestandKaufteil -= bedarf[i];  // Subtract demand for that week

            // Check if stock is exhausted
            if (restbestandKaufteil <= 0) {
                return weeks[i] + 1;  // Return the week when the stock runs out (1-based)
            }
        }

        return 5;  // If stock doesn't run out within 4 weeks
    }

    function optimizeOrders() {
        const optimizedOrders: BestellungDTO[] = [];
        initialisierteKaufteile.forEach(Kaufteil => {
            const verbraucht = checkWhenRestbestandExhausted(periode, Kaufteil)
            const lieferdauer = (Kaufteil.lieferzeit + Kaufteil.lieferzeitAbweichung) / 5 + 1
            let order;
            if (lieferdauer > verbraucht && verbraucht != 5) {
                order = new BestellungDTO(Kaufteil.id, BestellTyp.EIL, getOptimaleBestellmengeEil(Kaufteil), periode)
            } else if (lieferdauer <= verbraucht && verbraucht != 5) {
                order = new BestellungDTO(Kaufteil.id, BestellTyp.NORMAL, getOptimaleBestellmenge(Kaufteil), periode)
            } else {
                order = new BestellungDTO(Kaufteil.id, BestellTyp.KEINE, 0, periode)
            }
            optimizedOrders[Kaufteil.id] = order;
        });

        setBestellungen(optimizedOrders)
    }

    return (
        <div>
            <h1>{t('kaufteildispo.title')}</h1>

            <Table>
                <thead>
                <tr>
                    <th>{t('kaufteildispo.productionProgram')}</th>
                </tr>
                <tr>
                    <th>{t('kaufteildispo.bike')}</th>
                    <th>{t('kaufteildispo.periodDemand')} {periode}</th>
                    <th>{t('kaufteildispo.periodDemand')} {periode + 1}</th>
                    <th>{t('kaufteildispo.periodDemand')} {periode + 2}</th>
                    <th>{t('kaufteildispo.periodDemand')} {periode + 3}</th>
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
            {orders !== undefined && (
                <Table>
                    <thead>
                    <tr>
                        <th>{t('kaufteildispo.executedOrders')}</th>
                    </tr>
                    <tr>
                        <th>{t('kaufteildispo.purchasePart')}</th>
                        <th>{t('kaufteildispo.deliveryTimeDays')}</th>
                        <th>{t('kaufteildispo.deviationDays')}</th>
                        <th>{t('kaufteildispo.stock')}</th>
                        <th>{t('kaufteildispo.totalDemand')}</th>
                        <th>{t('kaufteildispo.order')}</th>
                        <th>{t('kaufteildispo.amount')}</th>
                        <th>{t('kaufteildispo.orderPeriod')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {initialisierteKaufteile.map(kaufteil => {
                        const id = kaufteil.id;
                        if (alteBestellungen[id] !== undefined) {
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{kaufteil.lieferzeit}</td>
                                    <td>{kaufteil.lieferzeitAbweichung}</td>
                                    <td>{kaufteil.restbestandVorperiode}</td>
                                    <td>{getGesamtBedarf(kaufteil)}</td>
                                    <td><b>{alteBestellungen[id].typ}</b></td>
                                    <td><b>{alteBestellungen[id].menge}</b></td>
                                    <td>{alteBestellungen[id].bestellPeriode}</td>
                                </tr>
                            );
                        }
                    })}
                    </tbody>
                </Table>
            )}

            <br/>
            <p>{t('kaufteildispo.currentStockValue')}: {lagerWert.toFixed(2)} €</p>
            <Button className="Button"
                    onClick={optimizeOrders}
            >
                {t('kaufteildispo.optimize')}
            </Button>

            <Table>
                <thead>
                <tr>
                    <th>{t('kaufteildispo.newOrders')}</th>
                </tr>
                <tr>
                    <th>{t('kaufteildispo.purchasePart')}</th>
                    <th>{t('kaufteildispo.deliveryTimeDays')} / {t('kaufteildispo.deviationDays')}</th>
                    <th>{t('kaufteildispo.usage')}</th>
                    <th>{t('kaufteildispo.stock')}</th>
                    <th>{t('kaufteildispo.totalDemand')}</th>
                    <th>{t('kaufteildispo.periodDemand')}<br/>{periode} / {periode + 1} / {periode + 2} / {periode + 3}
                    </th>
                    <th>{t('kaufteildispo.discountAmount')}</th>
                    <th>{t('kaufteildispo.yearlyDemand')}</th>
                    <th>{t('kaufteildispo.optimalOrderQty')}</th>
                    <th>{t('kaufteildispo.order')}</th>
                    <th>{t('kaufteildispo.amount')}</th>
                    <th>{t('kaufteildispo.orderPeriod')}</th>
                </tr>
                </thead>
                <tbody>
                {initialisierteKaufteile.map(kaufteil => {
                    const id = kaufteil.id;
                    const bestellung = bestellungen.find(b => b && b.kaufteilID === id);

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{kaufteil.lieferzeit} / {kaufteil.lieferzeitAbweichung}</td>
                            <td>{kaufteil.verwendungP1} / {kaufteil.verwendungP2} / {kaufteil.verwendungP3}</td>
                            <td>{kaufteil.restbestandVorperiode}</td>
                            <td>{getGesamtBedarf(kaufteil)}</td>
                            <td>
                                {getWochenBedarf(periode, kaufteil)} / {getWochenBedarf(periode + 1, kaufteil)} /
                                {getWochenBedarf(periode + 2, kaufteil)} / {getWochenBedarf(periode + 3, kaufteil)}
                            </td>
                            <td>{kaufteil.diskontmenge}</td>
                            <td>
                                {getJahresBedarf(kaufteil)} / {(kaufteil.bestellKosten * (bestellung?.typ === BestellTyp.EIL ? 10 : 1)).toFixed(2)}€
                                / {kaufteil.wert}€
                                / {(LAGER_KOSTEN_SATZ * 100).toFixed(2)}%
                            </td>
                            <td>{getOptimaleBestellmenge(kaufteil)}</td>
                            {/* Bestellung controls */}
                            <td>
                                {bestellung && (
                                    <DropdownButton title={t(bestellung.typ)} size="sm">
                                        {Object.values(BestellTyp).map((art) => (
                                            <Dropdown.Item
                                                key={art}
                                                onClick={() => setBestellung(bestellung.kaufteilID, art, bestellung.menge)}
                                            >
                                                {t(art)}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                )}
                            </td>
                            <td>
                                {bestellung && (
                                    <input
                                        min={0}
                                        type="number"
                                        value={bestellung.menge}
                                        onChange={(e) => {
                                            // @ts-ignore
                                            e.target.value = Math.abs(e.target.value);
                                            setBestellung(bestellung.kaufteilID, bestellung.typ, Number(e.target.value));
                                        }}
                                    />
                                )}
                            </td>
                            <td>{bestellung?.bestellPeriode}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>

            <br/>
            {speicherInfo && (
                <div className="text-center mt-3">
                    <div className="alert alert-primary" role="alert">
                        {t('SpeichernSucess')}
                    </div>
                </div>
            )}
            <Button className="Button"
                    onClick={save}
            >
                {t('Speichern')}
            </Button>
        </div>
    );
}
