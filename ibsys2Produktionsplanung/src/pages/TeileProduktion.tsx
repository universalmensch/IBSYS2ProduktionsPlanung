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

        const teil261 = new Produktionsteil(261, result[26].planRestbestand / 3);
        teil261.auftraege = teil1.menge
        teil261.fuerWarteschlangen = teil1.warteschlange
        teil261.restBestand = (result[26].restBestand / 3)
        teil261.warteschlange = result[26].warteschlange / 3
        teil261.bearbeitung = result[26].bearbeitung / 3
        result[261] = teil261;

        const teil51 = result[51];
        teil51.auftraege = teil1.menge
        teil51.fuerWarteschlangen = teil1.warteschlange

        const teil161 = new Produktionsteil(161, result[16].planRestbestand / 3);
        teil161.auftraege = teil51.menge;
        teil161.fuerWarteschlangen = teil51.warteschlange;
        teil161.restBestand = result[16].restBestand / 3;
        teil161.warteschlange = result[16].warteschlange / 3;
        teil161.bearbeitung = result[16].bearbeitung / 3;
        result[161] = teil161;

        const teil171 = new Produktionsteil(171, result[17].planRestbestand / 3);
        teil171.auftraege = teil51.menge;
        teil171.fuerWarteschlangen = teil51.warteschlange;
        teil171.restBestand = result[17].restBestand / 3;
        teil171.warteschlange = result[17].warteschlange / 3;
        teil171.bearbeitung = result[17].bearbeitung / 3;
        result[171] = teil171;

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

        const teil262 = new Produktionsteil(262, result[26].planRestbestand / 3);
        teil262.auftraege = teil2.menge;
        teil262.fuerWarteschlangen = teil2.warteschlange;
        teil262.restBestand = result[26].restBestand / 3;
        teil262.warteschlange = result[26].warteschlange / 3;
        teil262.bearbeitung = result[26].bearbeitung / 3;
        result[262] = teil262;

        const teil56 = result[56];
        teil56.auftraege = teil2.menge
        teil56.fuerWarteschlangen = teil2.warteschlange

        const teil162 = new Produktionsteil(162, result[16].planRestbestand / 3);
        teil162.auftraege = teil56.menge;
        teil162.fuerWarteschlangen = teil56.warteschlange;
        teil162.restBestand = result[16].restBestand / 3;
        teil162.warteschlange = result[16].warteschlange / 3;
        teil162.bearbeitung = result[16].bearbeitung / 3;
        result[162] = teil162;

        const teil172 = new Produktionsteil(172, result[17].planRestbestand / 3);
        teil172.auftraege = teil56.menge;
        teil172.fuerWarteschlangen = teil56.warteschlange;
        teil172.restBestand = result[17].restBestand / 3;
        teil172.warteschlange = result[17].warteschlange / 3;
        teil172.bearbeitung = result[17].bearbeitung / 3;
        result[172] = teil172;

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

        const teil263 = new Produktionsteil(263, result[26].planRestbestand / 3);
        teil263.auftraege = teil3.menge;
        teil263.fuerWarteschlangen = teil3.warteschlange;
        teil263.restBestand = result[26].restBestand / 3;
        teil263.warteschlange = result[26].warteschlange / 3;
        teil263.bearbeitung = result[26].bearbeitung / 3;
        result[263] = teil263;

        const teil31 = result[31];
        teil31.auftraege = teil3.menge
        teil31.fuerWarteschlangen = teil3.warteschlange

        const teil163 = new Produktionsteil(163, result[16].planRestbestand / 3);
        teil163.auftraege = teil31.menge;
        teil163.fuerWarteschlangen = teil31.warteschlange;
        teil163.restBestand = result[16].restBestand / 3;
        teil163.warteschlange = result[16].warteschlange / 3;
        teil163.bearbeitung = result[16].bearbeitung / 3;
        result[163] = teil163;

        const teil173 = new Produktionsteil(173, result[17].planRestbestand / 3);
        teil173.auftraege = teil31.menge;
        teil173.fuerWarteschlangen = teil31.warteschlange;
        teil173.restBestand = result[17].restBestand / 3;
        teil173.warteschlange = result[17].warteschlange / 3;
        teil173.bearbeitung = result[17].bearbeitung / 3;
        result[173] = teil173;

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
        const preferedOrder = [
            1, 2, 3,
            261, 161, 171, 13, 19, 15, 14,
            262, 20, 18, 10, 11, 12,
            263, 162, 172,
            7, 8, 9, 49, 54, 29,
            4, 5, 6, 50, 55, 30, 51, 56, 31,
            163, 173
        ];

        const production = produktionsteile
            .filter(auftrag => auftrag.menge > 0 && ![16, 17, 26].includes(auftrag.id))
            .sort((a, b) => preferedOrder.indexOf(a.id) - preferedOrder.indexOf(b.id))
            .map(auftrag =>
                new ProduktionsAuftragDTO(getOriginalId(auftrag.id), auftrag.menge)
            )


        setGeneralStoreData({
            ...generalStore,
            produktionsAuftrag: production
        });


    }

    function formatZahl(id: number, wert: number): string {
        const idsDieGerundetWerden = [161, 162, 163, 171, 172, 173, 261, 262, 263];
        return idsDieGerundetWerden.includes(id) ? wert.toFixed(2) : String(wert);
    }

    function getOriginalId(id: number): number {
        switch (id) {
            case 161:
            case 162:
            case 163:
                return 16;
            case 171:
            case 172:
            case 173:
                return 17;
            case 261:
            case 262:
            case 263:
                return 26;
            default:
                return id;
        }
    }

    return (
        <div>
            <h1>Teileproduktion</h1>
            <Table>
                <thead>
                <tr>
                    <th>Produktionsteil</th>
                    <th>Aufträge</th>
                    <th>Aus Warteschlangen</th>
                    <th>Plan Restbestand</th>
                    <th>Restbestand</th>
                    <th>Warteschlange</th>
                    <th>In Bearbeitung</th>
                    <th>Produktionsmenge</th>
                </tr>
                </thead>
                <tbody>
                {
                    AnzeigeReihenfolge.map(
                        id => {
                            return <>
                                <tr key={id + 'vorne'} style={{border: 'none'}}>{
                                    //extra space between the different bikes
                                    (id === 2 || id === 3) &&
                                    <td colSpan={2} style={{padding: 0, height: '15px', border: 'none'}}/>

                                }</tr>
                                <tr key={id + 'mitte'}>
                                    <td>{getOriginalId(id)}</td>
                                    <td>{produktionsteile[id].auftraege}</td>
                                    <td>+ {produktionsteile[id].fuerWarteschlangen}</td>
                                    <td>
                                        + <input
                                        min={0}
                                        disabled={id === 1 || id === 2 || id === 3}
                                        type="number"
                                        value={produktionsteile[id].planRestbestand}
                                        onChange={(e) => setAuftrag(id, Number(e.target.value))}
                                    />
                                    </td>
                                    <td>- {formatZahl(id, produktionsteile[id].restBestand)}</td>
                                    <td>- {formatZahl(id, produktionsteile[id].warteschlange)}</td>
                                    <td>- {formatZahl(id, produktionsteile[id].bearbeitung)}</td>
                                    <td>{formatZahl(id, produktionsteile[id].menge)}</td>
                                </tr>
                                <tr key={id + 'hinten'} style={{border: 'none'}}>{
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