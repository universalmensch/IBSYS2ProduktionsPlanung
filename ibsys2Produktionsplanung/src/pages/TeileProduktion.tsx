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

    const output = generalStore?.output?.input

    const produktionsPlan = generalStore?.produktionsPlan ?? new ProduktionsPlanDTO(0, 0, 0);

    produktionsPlan.p1ProduktionWoche0 = 100;
    produktionsPlan.p2ProduktionWoche0 = 200;
    produktionsPlan.p3ProduktionWoche0 = 300;

    const [produktionsteile] = useState<Produktionsteil[]>(initializeProduktionsteile());
    const [produktionsAuftraege, setProduktionsAuftraege] = useState<ProduktionsAuftragDTO[]>(initializeAuftraege());

    function initializeProduktionsteile() {
        const result = Produktionsteile.map(teil => new Produktionsteil(teil.id, teil.menge));
        result.forEach((produktionsteil: Produktionsteil) => {
            //set Restbestand
            if (restBestand !== undefined) {
                produktionsteil.restBestand = restBestand.filter(r => r.id == produktionsteil.id)[0].amount
            }

            //set Warteschlange
            const warteschlange: { item: number; amount: number }[] = [];

            for (const station of waitingWorkplace) {
                const waitingList = station.waitinglist;
                if (!waitingList) continue;
                const listArray = Array.isArray(waitingList) ? waitingList : [waitingList];

                listArray.forEach(waiting => {
                    warteschlange.push({
                        item: waiting.item,
                        amount: waiting.amount
                    });
                });
            }

            //set In Bearbeitung
             if (inBearbeitung !== undefined) {
                console.log(inBearbeitung)
                //filter out duplikates in same order
                const uniqueBearbeitung = inBearbeitung.filter((item, index, self) =>
                    index === self.findIndex(b => b.item === item.item && b.order === item.order)
                );

                uniqueBearbeitung.forEach( b => {
                    if(b.item == produktionsteil.id )
                    produktionsteil.bearbeitung += Number(b.amount);
                })
                // produktionsteil.bearbeitung = inBearbeitung.filter(r => r.item == produktionsteil.id)[0]?.amount ?? 0
            }
        })

        //set Aufträge TODO ????
        const teil1 = result.find(teil => teil.id === 1) ?? new Produktionsteil(1, 0);
        teil1.auftraege = produktionsPlan.p1ProduktionWoche0
        //set aus Warteschlange
        return result;
    }

    function initializeAuftraege() {
        //initialize all orders
        const result: ProduktionsAuftragDTO[] = [];
        Produktionsteile.forEach(produktionsteil => {
            result[produktionsteil.id] = new ProduktionsAuftragDTO(produktionsteil.id, produktionsteil.menge, produktionsteil.planRestbestand);
        })
        return result;
    }

    function getProduktionsTeil(id: number) {
        return produktionsteile.find(produktionsteil => produktionsteil.id === id)
    }

    // TODO rechnung zwischen restbestand und menge fehlt noch
    function setAuftrag(kaufteilNummer: number, planRestbestand: number, menge: number) {
        setProduktionsAuftraege(prevState => prevState.map((produktionsAuftrag) => {
            if (produktionsAuftrag.kaufteilID === kaufteilNummer) {
                // 16, 17 and 26 are used in all bikes
                if (produktionsAuftrag.kaufteilID === 16 || produktionsAuftrag.kaufteilID === 17 || produktionsAuftrag.kaufteilID === 26) {
                    planRestbestand !== -1 ? produktionsAuftrag.planRestBestand = Math.ceil(planRestbestand) * 3 : produktionsAuftrag;
                    menge !== -1 ? produktionsAuftrag.menge = Math.ceil(menge) * 3 : produktionsAuftrag;
                } else {
                    planRestbestand !== -1 ? produktionsAuftrag.planRestBestand = Math.ceil(planRestbestand) : produktionsAuftrag;
                    menge !== -1 ? produktionsAuftrag.menge = Math.ceil(menge) : produktionsAuftrag;
                }
            }
            return produktionsAuftrag;
        }))
    }

    function save() {
        const production = produktionsAuftraege
            .filter(auftrag => auftrag.menge > 0)
            .map(auftrag => ({
                article: auftrag.kaufteilID,
                quantity: auftrag.menge
            }))

        const updatedOutput = {
            ...(output ?? {}),
            production: {
                ...(output?.productionlist ?? {}),
                production: production
            }
        };

        setGeneralStoreData({
            ...generalStore,
            output: {
                input: updatedOutput
            }
        });
    }

    function getPlanRestBestand(id: number) {
        if (id === 26 || id === 16 || id === 17) {
            return produktionsAuftraege[id].planRestBestand / 3;
        }
        return produktionsAuftraege[id].planRestBestand;
    }

    function getMenge(id: number) {
        if (id === 26 || id === 16 || id === 17) {
            return produktionsAuftraege[id].menge / 3;
        }
        return produktionsAuftraege[id].menge;
    }

    return (
        <div>
            <h1>Produktionsplanung</h1>
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
                    <th>Menge</th>
                </tr>
                </thead>
                <tbody>
                {
                    AnzeigeReihenfolge.map(
                        id => {
                            return <>
                                <tr key={Math.random()}>{
                                    //extra space between the different bikes
                                    (id === 2 || id === 3) && <></>

                                }</tr>
                                <tr key={Math.random()}>
                                    <td>{getProduktionsTeil(id)?.id}</td>
                                    <td>{getProduktionsTeil(id)?.auftraege}</td>
                                    <td>{getProduktionsTeil(id)?.fuerWarteschlangen}</td>
                                    <td>
                                        <input
                                            min={0}
                                            type="number"
                                            value={getPlanRestBestand(id)}
                                            onChange={(e) => setAuftrag(id, Number(e.target.value), -1)}
                                        />
                                    </td>
                                    <td>{getProduktionsTeil(id)?.restBestand}</td>
                                    <td>{getProduktionsTeil(id)?.warteschlange}</td>
                                    <td>{getProduktionsTeil(id)?.bearbeitung}</td>
                                    <td>
                                        <input
                                            min={0}
                                            type="number"
                                            value={getMenge(id)}
                                            onChange={(e) => setAuftrag(id, -1, Number(e.target.value))}
                                        />
                                    </td>
                                </tr>
                                <tr key={Math.random()}>{
                                    //extra spaces for the structure of the table
                                    (SpaceAfterRow.includes(id)) && <></>

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