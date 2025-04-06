import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useGeneralStore } from '../helper/GeneralStoreContext';


export function Minutenplanung() {
    const context = useGeneralStore()
    console.log(context);
    return(
        <div>
            <h1>Minutenplanung</h1>
            <LinkContainer to="/">
                <Button className="Button">
                    Startseite
                </Button>
            </LinkContainer>
            <LinkContainer to="/Produktionsplanung">
                <Button className="Button">
                    Produktionsplanung
                </Button>
            </LinkContainer>
        </div>
    );
}