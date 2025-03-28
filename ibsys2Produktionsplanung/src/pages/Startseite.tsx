import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export function Startseite() {
    return(
        <div>
            <h1>Startseite</h1>
            <LinkContainer to="/Produktionsplanung">
                <Button className="Button">
                    Produktionsplanung
                </Button>
            </LinkContainer>
            <LinkContainer to="/Minutenplanung">
                <Button className="Button">
                    Minutenplanung
                </Button>
            </LinkContainer>
        </div>
    );
}