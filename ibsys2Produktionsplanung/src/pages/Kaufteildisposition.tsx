import {Button, Dropdown, DropdownButton, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useGeneralStore} from '../helper/GeneralStoreContext';
import {ProduktionsPlanDTO} from "../dtos/ProduktionsPlanDTO.tsx";
import {Kaufteil, KaufteileDTO} from './../dtos/KaufteileDTO';
import {BestellArt} from "../dtos/BestellArt.tsx";
import {useState} from "react";

export function Kaufteildisposition() {
    const context = useGeneralStore()
    console.log(context);

    const produktionsPlan = new ProduktionsPlanDTO(100, 100, 100);

    const [kaufteile, setKaufteile] = useState<Record<string, Kaufteil>>(KaufteileDTO);

    //TODO the new values needs to be saved properly, it doesn't work that way
    const handleBestellArtChange = (id: string, neueBestellung: BestellArt) => {
        setKaufteile(() => {
            const result: Record<string, Kaufteil> = kaufteile;
            result[id].bestellung = neueBestellung;
            return result;
        });
    };

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
                    Object.entries(KaufteileDTO).map(([key, value]) => {
                        return <tr>
                            <td>{value.id}</td>
                            <td>{value.verwendungP1} / {value.verwendungP2} / {value.verwendungP3}</td>
                            <td>{value.restbestandVorperiode}</td>
                            <td>{getGesamtBedarf(value)}</td>
                            <td>{getWochenBedarf(0, value)}</td>
                            <td>{getWochenBedarf(1, value)}</td>
                            <td>{getWochenBedarf(2, value)}</td>
                            <td>{getWochenBedarf(3, value)}</td>
                            <td>{value.diskontmenge}</td>
                            <td>{getOptimaleBestellmenge(value)}</td>
                            <td><DropdownButton
                                id="dropdown-basic-button"
                                title={kaufteile[key].bestellung}
                                size="sm"
                            >
                                {Object.values(BestellArt).map((art) => (
                                    <Dropdown.Item key={art} onClick={() => handleBestellArtChange(key, art)}>
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