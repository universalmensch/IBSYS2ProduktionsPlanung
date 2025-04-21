import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useGeneralStore } from '../helper/GeneralStoreContext';

export function Kaufteildisposition() {
    const context = useGeneralStore()
    console.log(context);

    const produktionsPlan = new ProduktionsPlanDTO(100, 100, 100);

    produktionsPlan.P1ProduktionWoche0(100);
    produktionsPlan.P2ProduktionWoche0(200);
    produktionsPlan.P3ProduktionWoche0(300);

    produktionsPlan.P1ProduktionWoche1(101);
    produktionsPlan.P2ProduktionWoche1(201);
    produktionsPlan.P3ProduktionWoche1(301);

    produktionsPlan.P1ProduktionWoche2(102);
    produktionsPlan.P2ProduktionWoche2(202);
    produktionsPlan.P3ProduktionWoche2(302);

    produktionsPlan.P1ProduktionWoche3(103);
    produktionsPlan.P2ProduktionWoche3(203);
    produktionsPlan.P3ProduktionWoche3(303);

    return(
        <div>
            <h1>Kaufteildisposition</h1>

            <h3>Produktionsprogramm: P1 200 P2 300 </h3>

            <Table>
                <thead>
                    <tr>
                        <th>Kaufteil</th>
                        <th>Periode 0</th>
                        <th>Periode 1</th>
                        <th>Periode 2</th>
                        <th>Periode 3</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>

            <Table>
                <thead>
                    <tr>
                        <th>Kaufteil</th>
                        <th>Menge für P1</th>
                        <th>Menge für P2</th>
                        <th>Menge für P3</th>
                    </tr>
                </thead>
                <tbody>
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