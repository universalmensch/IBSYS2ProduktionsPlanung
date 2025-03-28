import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export function Produktionsplanung() {
    return(
        <div>
            <h1>Produktionsplanung</h1>
            <LinkContainer to="/">
                <Button className="Button">
                    Startseite
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