import {Button, Table} from 'react-bootstrap';
import {useGeneralStore} from '../helper/GeneralStoreContext';
import {ProduktionsPlanDTO} from "../dtos/ProduktionsPlanDTO.tsx";
import {useState} from "react";
import {AnzeigeReihenfolge, Produktionsteil, Produktionsteile, SpaceAfterRow} from "../dtos/Produktionsteile.tsx";
import {ProduktionsAuftragDTO} from "../dtos/ProduktionsAuftragDTO.tsx";

export function TeileProduktion() {
    const {generalStore, setGeneralStoreData} = useGeneralStore()

    const input = generalStore?.input?.results

    const restBestand = input?.warehousestock?.article
    const waitingWorkplace = input?.waitinglistworkstations.workplace || []
    const inBearbeitung = input?.ordersinwork?.workplace
    const verkaufsauftraege = input?.forecast || {p1: 0, p2: 0, p3: 0}

    const produktionsPlan = generalStore?.produktionsPlan ?? new ProduktionsPlanDTO(0, 0, 0);

    produktionsPlan.p1ProduktionWoche0 = 100;
    produktionsPlan.p2ProduktionWoche0 = 200;
    produktionsPlan.p3ProduktionWoche0 = 300;

    const [produktionsteile, setProduktionsteile] = useState<Produktionsteil[]>(initializeProduktionsteile());

    function initializeProduktionsteile() {
        const result: Produktionsteil[] = [];
        Produktionsteile.forEach((teil: Produktionsteil) => {
            const produktionsteil = new Produktionsteil(teil.id, teil.planRestbestand)

            //set Restbestand
            if (restBestand !== undefined) {
                produktionsteil.restBestand = restBestand.filter(r => r.id == produktionsteil.id)[0].amount
            }

            //set Warteschlange
            const warteschlange: { item: number; amount: number; order: number }[] = [];

            for (const station of waitingWorkplace) {
                const waitingList = station.waitinglist;
                if (!waitingList) continue;
                const listArray = Array.isArray(waitingList) ? waitingList : [waitingList];

                listArray.forEach(waiting => {
                    warteschlange.push({
                        item: waiting.item,
                        amount: waiting.amount,
                        order: waiting.order
                    });
                });
            }

            const uniqueWarteschlange = warteschlange.filter((item, index, self) =>
                index === self.findIndex(b => b.item === item.item && b.order === item.order)
            );

            uniqueWarteschlange.forEach(w => {
                if (w.item == produktionsteil.id) {
                    produktionsteil.warteschlange += Number(w.amount);
                }
            });

            //set In Bearbeitung
            if (inBearbeitung !== undefined) {
                console.log(inBearbeitung)
                //filter out duplikates in the same order
                const uniqueBearbeitung = inBearbeitung.filter((item, index, self) =>
                    index === self.findIndex(b => b.item === item.item && b.order === item.order)
                );

                uniqueBearbeitung.forEach(b => {
                    if (b.item == produktionsteil.id)
                        produktionsteil.bearbeitung += Number(b.amount);
                })
            }
            result[produktionsteil.id] = produktionsteil
        })

        // P1
        const teil1 = result[1];
        teil1.auftraege = Number(verkaufsauftraege.p1);
        teil1.planRestbestand = Number(produktionsPlan.p1ProduktionWoche0) + Number(teil1.restBestand) + Number(teil1.warteschlange) + Number(teil1.bearbeitung) - Number(verkaufsauftraege.p1);

        const teil26 = result[26];
        teil26.auftraege = teil1.menge
        teil26.fuerWarteschlangen = teil1.warteschlange

        const teil51 = result[51];
        teil51.auftraege = teil1.menge
        teil51.fuerWarteschlangen = teil1.warteschlange

        const teil16 = result[16];
        teil16.auftraege = teil51.menge
        teil16.fuerWarteschlangen = teil51.warteschlange

        const teil17 = result[17];
        teil17.auftraege = teil51.menge
        teil17.fuerWarteschlangen = teil51.warteschlange

        const teil50 = result[50];
        teil50.auftraege = teil51.menge
        teil50.fuerWarteschlangen = teil51.warteschlange

        const teil4 = result[4
            ];
        teil4.auftraege = teil50.menge
        teil4.fuerWarteschlangen = teil50.warteschlange

        const teil10 = result[10];
        teil10.auftraege = teil50.menge
        teil10.fuerWarteschlangen = teil50.warteschlange

        const teil49 = result[49];
        teil49.auftraege = teil50.menge
        teil49.fuerWarteschlangen = teil50.warteschlange

        const teil7 = result[7];
        teil7.auftraege = teil49.menge
        teil7.fuerWarteschlangen = teil49.warteschlange

        const teil13 = result[13];
        teil13.auftraege = teil49.menge
        teil13.fuerWarteschlangen = teil49.warteschlange

        const teil18 = result[18];
        teil18.auftraege = teil49.menge
        teil18.fuerWarteschlangen = teil49.warteschlange

        // P2
        const teil2 = result[2];
        teil2.auftraege = Number(verkaufsauftraege.p2);
        teil2.planRestbestand = Number(produktionsPlan.p2ProduktionWoche0) + Number(teil2.restBestand) + Number(teil2.warteschlange) + Number(teil2.bearbeitung) - Number(verkaufsauftraege.p2);

        const teil56 = result[56];
        teil56.auftraege = teil2.menge
        teil56.fuerWarteschlangen = teil2.warteschlange

        const teil55 = result[55];
        teil55.auftraege = teil56.menge
        teil55.fuerWarteschlangen = teil56.warteschlange

        const teil5 = result[5];
        teil5.auftraege = teil55.menge
        teil5.fuerWarteschlangen = teil55.warteschlange

        const teil11 = result[11];
        teil11.auftraege = teil55.menge
        teil11.fuerWarteschlangen = teil55.warteschlange

        const teil54 = result[54];
        teil54.auftraege = teil55.menge
        teil54.fuerWarteschlangen = teil55.warteschlange

        const teil8 = result[8];
        teil8.auftraege = teil54.menge
        teil8.fuerWarteschlangen = teil54.warteschlange

        const teil14 = result[14];
        teil14.auftraege = teil54.menge
        teil14.fuerWarteschlangen = teil54.warteschlange

        const teil19 = result[19];
        teil19.auftraege = teil54.menge
        teil19.fuerWarteschlangen = teil54.warteschlange

        // P2
        const teil3 = result[3];
        teil3.auftraege = Number(verkaufsauftraege.p3);
        teil3.planRestbestand = Number(produktionsPlan.p3ProduktionWoche0) + Number(teil3.restBestand) + Number(teil3.warteschlange) + Number(teil3.bearbeitung) - Number(verkaufsauftraege.p3);

        const teil31 = result[31];
        teil31.auftraege = teil3.menge
        teil31.fuerWarteschlangen = teil3.warteschlange

        const teil30 = result[30];
        teil30.auftraege = teil31.menge
        teil30.fuerWarteschlangen = teil31.warteschlange

        const teil6 = result[6];
        teil6.auftraege = teil30.menge
        teil6.fuerWarteschlangen = teil30.warteschlange

        const teil12 = result[12];
        teil12.auftraege = teil30.menge
        teil12.fuerWarteschlangen = teil30.warteschlange

        const teil29 = result[29];
        teil29.auftraege = teil30.menge
        teil29.fuerWarteschlangen = teil30.warteschlange

        const teil9 = result[9];
        teil9.auftraege = teil29.menge
        teil9.fuerWarteschlangen = teil29.warteschlange

        const teil15 = result[15];
        teil15.auftraege = teil29.menge
        teil15.fuerWarteschlangen = teil29.warteschlange

        const teil20 = result[20];
        teil20.auftraege = teil29.menge
        teil20.fuerWarteschlangen = teil29.warteschlange

        return result;
    }

    function setAuftrag(kaufteilNummer: number, planRestbestand: number) {
        setProduktionsteile(prevState => prevState.map((produktionsAuftrag) => {
            if (produktionsAuftrag.id === kaufteilNummer) {
                // 16, 17 and 26 are used on all bikes
                if (produktionsAuftrag.id === 16 || produktionsAuftrag.id === 17 || produktionsAuftrag.id === 26) {
                    produktionsAuftrag.planRestbestand = Math.ceil(planRestbestand) * 3;
                } else {
                    produktionsAuftrag.planRestbestand = Math.ceil(planRestbestand);
                }
            }
            return produktionsAuftrag;
        }))
    }

    function save() {
        const production = produktionsteile
            .filter(auftrag => auftrag.menge > 0)
            .map(auftrag =>
                new ProduktionsAuftragDTO(auftrag.id, auftrag.menge)
            )

        setGeneralStoreData({
            ...generalStore,
            produktionsAuftrag: production
        });
    }

    function getMenge(id: number) {
        if (id === 1) {
            return produktionsPlan.p1ProduktionWoche0
        }
        if (id === 2) {
            return produktionsPlan.p2ProduktionWoche0
        }
        if (id === 3) {
            return produktionsPlan.p3ProduktionWoche0
        }

        if (id === 26 || id === 16 || id === 17) {
            return (produktionsteile[id].menge / 3).toFixed(2);
        }

        return produktionsteile[id].menge;
    }

    function getRestbestand(id: number) {
        if (id === 26 || id === 16 || id === 17) {
            return (produktionsteile[id].restBestand / 3).toFixed(2);
        }
        return produktionsteile[id].restBestand;
    }

    function getWarteschlangen(id: number) {
        if (id === 26 || id === 16 || id === 17) {
            return (produktionsteile[id].warteschlange / 3).toFixed(2);
        }
        return produktionsteile[id].warteschlange;
    }

    function getBearbeitung(id: number) {
        if (id === 26 || id === 16 || id === 17) {
            return (produktionsteile[id].bearbeitung / 3).toFixed(2);
        }
        return produktionsteile[id].bearbeitung;
    }

    function getAuftraege(key: number) {
        const keyString = key.toString();
        if (keyString.length > 2) {
            switch (keyString[0] + keyString[1]) {
                case '16' :
                case '17' : {
                    if (Number(keyString[2]) === 1) {
                        return produktionsteile[51].menge;
                    } else if (Number(keyString[2]) === 2) {
                        return produktionsteile[56].menge;
                    }
                    return produktionsteile[31].menge;
                }
                case '26' :
                    if (Number(keyString[2]) === 1) {
                        return produktionsPlan.p1ProduktionWoche0;
                    } else if (Number(keyString[2]) === 2) {
                        return produktionsPlan.p2ProduktionWoche0;
                    }
                    return produktionsPlan.p3ProduktionWoche0;
                default:
                    return 0;
            }
        }
        return produktionsteile[key].auftraege;
    }

    function getFuerWarteschlangen(key: number) {
        const keyString = key.toString();
        if (keyString.length > 2) {
            switch (keyString[0] + keyString[1]) {
                case '16' :
                case '17' : {
                    if (Number(keyString[2]) === 1) {
                        return produktionsteile[51].warteschlange;
                    } else if (Number(keyString[2]) === 2) {
                        return produktionsteile[56].warteschlange;
                    }
                    return produktionsteile[31].warteschlange;
                }
                case '26' :
                    if (Number(keyString[2]) === 1) {
                        return produktionsteile[1].warteschlange;
                    } else if (Number(keyString[2]) === 2) {
                        return produktionsteile[2].warteschlange;
                    }
                    return produktionsteile[3].warteschlange;
                default:
                    return 0;
            }
        }
        return produktionsteile[key].fuerWarteschlangen;
    }

    function getPlanRestbestand(key: number) {
        const keyString = key.toString();
        if (keyString.length > 2) {
            switch (keyString[0] + keyString[1]) {
                case '16' : {
                    if (Number(keyString[2]) === 1) {
                        return produktionsteile[16].planRestbestand;
                    } else if (Number(keyString[2]) === 2) {
                        return produktionsteile[16].planRestbestand;
                    }
                    return produktionsteile[16].planRestbestand;
                }
                case '17' : {
                    if (Number(keyString[2]) === 1) {
                        return produktionsteile[17].planRestbestand;
                    } else if (Number(keyString[2]) === 2) {
                        return produktionsteile[17].planRestbestand;
                    }
                    return produktionsteile[17].planRestbestand;
                }
                case '26' :
                    if (Number(keyString[2]) === 1) {
                        return produktionsteile[26].planRestbestand;
                    } else if (Number(keyString[2]) === 2) {
                        return produktionsteile[26].planRestbestand;
                    }
                    return produktionsteile[26].planRestbestand;
                default:
                    return 0;
            }
        }
        return produktionsteile[key].planRestbestand;
    }

    return (
        <div>
            <h1>Teileproduktion</h1>
            <Table>
                <thead>
                <tr>
                    <th>Produktionsteil</th>
                    <th>Aufträge</th>
                    <th>+ Aus Warteschlangen</th>
                    <th>+ Plan Restbestand</th>
                    <th>- Restbestand</th>
                    <th>- Warteschlange</th>
                    <th>- In Bearbeitung</th>
                    <th>Produktionsmenge</th>
                </tr>
                </thead>
                <tbody>
                {
                    AnzeigeReihenfolge.map(
                        key => {
                            const id = key.toString().length > 2 ? Number(key.toString()[0] + key.toString()[1]) : key;
                            return <>
                                <tr key={key + 'vorne'} style={{border: 'none'}}>{
                                    //extra space between the different bikes
                                    (id === 2 || id === 3) &&
                                    <td colSpan={2} style={{padding: 0, height: '15px', border: 'none'}}/>

                                }</tr>
                                <tr key={key + 'mitte'}>
                                    <td>{produktionsteile[id].id}</td>
                                    <td>{getAuftraege(key)}</td>
                                    <td>{getFuerWarteschlangen(key)}</td>
                                    <td>
                                        <input
                                            min={0}
                                            disabled={id === 1 || id === 2 || id === 3}
                                            type="number"
                                            value={getPlanRestbestand(key)}
                                            onChange={(e) => setAuftrag(id, Number(e.target.value))}
                                        />
                                    </td>
                                    <td>{getRestbestand(id)}</td>
                                    <td>{getWarteschlangen(id)}</td>
                                    <td>{getBearbeitung(id)}</td>
                                    <td>{getMenge(id)}</td>
                                </tr>
                                <tr key={key + 'hinten'} style={{border: 'none'}}>{
                                    //extra spaces for the structure of the table
                                    (SpaceAfterRow.includes(id)) &&
                                    <td colSpan={2} style={{padding: 0, height: '45px', border: 'none'}}/>

                                }</tr>
                            </>;
                        })
                }
                </tbody>
            </Table>

            <br/>

            <Button className="Button"
                    onClick={save}
            >
                Produktionsplan Speichern
            </Button>
        </div>
    );
}