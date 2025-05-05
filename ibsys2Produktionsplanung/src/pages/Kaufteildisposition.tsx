import {Button, Dropdown, DropdownButton, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useGeneralStore} from '../helper/GeneralStoreContext';
import {ProduktionsPlanDTO} from "../dtos/ProduktionsPlanDTO.tsx";
import {Kaufteil, Kaufteile} from '../dtos/Kaufteile.tsx';
import {useState} from "react";
import {BestellTyp, BestellungDTO} from "../dtos/BestellungDTO.tsx";

export function Kaufteildisposition() {
    const context = useGeneralStore()
    console.log(context);

    const produktionsPlan = new ProduktionsPlanDTO(100, 100, 100);

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

    function initializeBestellungen(){
        const result: BestellungDTO[] = [];
        Kaufteile.forEach(kaufteil => {
            result[kaufteil.id]= new BestellungDTO(kaufteil.id, BestellTyp.KEINE, 0);
        })
        return result;
    }

    function setBestellung(kaufteilNummer: number, typ: BestellTyp, menge: number){
        setBestellungen(prevState => prevState.map((bestellung) => {
            if(bestellung.kaufteilID === kaufteilNummer){
                bestellung.typ = typ;
                bestellung.menge = menge;
                return bestellung;
            } else {
                return bestellung;
            }
        } ))
    }

    function getBedarf(kaufteil: Kaufteil, p1: number, p2: number, p3: number) {
        return kaufteil.verwendungP1 * p1 + kaufteil.verwendungP2 * p2 + kaufteil.verwendungP3 * p3;
    }

    function getOptimaleBestellmenge(kaufteil: Kaufteil) {
        return Math.ceil(Math.sqrt((2 * getGesamtBedarf(kaufteil) * kaufteil.bestellKosten) / (kaufteil.wert * 0.024)));
    }

    function getGesamtBedarf(kaufteil: Kaufteil) {
        return getWochenBedarf(0, kaufteil) + getWochenBedarf(1, kaufteil) + getWochenBedarf(2, kaufteil) + getWochenBedarf(3, kaufteil);
    }

    function getWochenBedarf(woche: number, kaufteil: Kaufteil) {
        switch (woche) {
            case 0 :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche0, produktionsPlan.p2ProduktionWoche0, produktionsPlan.p3ProduktionWoche0)
            case 1 :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche1, produktionsPlan.p2ProduktionWoche1, produktionsPlan.p3ProduktionWoche1)
            case 2 :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche2, produktionsPlan.p2ProduktionWoche2, produktionsPlan.p3ProduktionWoche2)
            case 3 :
                return getBedarf(kaufteil, produktionsPlan.p1ProduktionWoche3, produktionsPlan.p2ProduktionWoche3, produktionsPlan.p3ProduktionWoche3)
            default :
                return -1;
        }
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
                    <th>Woche 0</th>
                    <th>Woche 1</th>
                    <th>Woche 2</th>
                    <th>Woche 3</th>
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

            <Table>
                <thead>
                <tr>
                    <th>Kaufteil</th>
                    <th>Verwendung</th>
                    <th>Restbestand</th>
                    <th>Gesamt Bedarf</th>
                    <th>Bedarf W0</th>
                    <th>Bedarf W1</th>
                    <th>Bedarf W2</th>
                    <th>Bedarf W3</th>
                    <th>Diskontmenge</th>
                    <th>Optimale Bestellmenge</th>
                    <th>Bestellung</th>
                </tr>
                </thead>
                <tbody>
                { // for each bought item, the row of the table gets filled
                    Kaufteile.map(kaufteil => {
                        return <tr key={kaufteil.id}>
                            <td key={kaufteil.id}>{kaufteil.id}</td>
                            <td key={kaufteil.id}>{kaufteil.verwendungP1} / {kaufteil.verwendungP2} / {kaufteil.verwendungP3}</td>
                            <td key={kaufteil.id}>{kaufteil.restbestandVorperiode}</td>
                            <td key={kaufteil.id}>{getGesamtBedarf(kaufteil)}</td>
                            <td key={kaufteil.id}>{getWochenBedarf(0, kaufteil)}</td>
                            <td key={kaufteil.id}>{getWochenBedarf(1, kaufteil)}</td>
                            <td key={kaufteil.id}>{getWochenBedarf(2, kaufteil)}</td>
                            <td key={kaufteil.id}>{getWochenBedarf(3, kaufteil)}</td>
                            <td key={kaufteil.id}>{kaufteil.diskontmenge}</td>
                            <td key={kaufteil.id}>{getOptimaleBestellmenge(kaufteil)}</td>
                            <td key={kaufteil.id}><DropdownButton
                                id="dropdown-basic-button"
                                title={bestellungen[kaufteil.id].typ}
                                size="sm"
                            >
                                {Object.values(BestellTyp).map((art) => (
                                    <Dropdown.Item key={art} onClick={() => setBestellung(kaufteil.id, art, bestellungen[kaufteil.id].menge)}>
                                        {art}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton></td>
                        </tr>;
                    })
                }
                </tbody>
            </Table>


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