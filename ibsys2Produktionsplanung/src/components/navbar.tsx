import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DownloadXmlButton from './fileoutput';
import {useGeneralStore} from '../helper/GeneralStoreContext';
import LanguageSelect from './languageSelect';
import {useTranslation} from 'react-i18next'; // <-- i18n import

export default function Navbar() {
    const {generalStore} = useGeneralStore();
    const {t} = useTranslation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
            <Link className="navbar-brand mx-3" to="/">{t('navbar.title')}</Link>

            <Link className="navbar-item text-decoration-none text-dark px-1" to="/Produktionsplanung">
                {t('navbar.Produktionsplanung')}
            </Link>
            <Link className="navbar-item text-decoration-none text-dark px-1" to="/TeileProduktion">
                {t('navbar.TeileProduktion')}
            </Link>
            <Link className="navbar-item text-decoration-none text-dark px-1" to="/ReihenfolgeLosgroessenPlanung">
                {t('navbar.ReihenfolgeLosgroessenPlanung')}
            </Link>
            <Link className="navbar-item text-decoration-none text-dark px-1" to="/Minutenplanung">
                {t('navbar.Minutenplanung')}
            </Link>
            <Link className="navbar-item text-decoration-none text-dark px-1" to="/KaufteilDisposition">
                {t('navbar.KaufteilDisposition')}
            </Link>

            <div className="ms-auto me-3 d-flex align-items-center gap-2">
                <DownloadXmlButton {...(generalStore?.output ?? undefined)} />
                <LanguageSelect/>
            </div>
        </nav>
    );
}
