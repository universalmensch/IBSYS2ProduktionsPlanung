import FileInput from '../components/fileinput';
import { useTranslation } from 'react-i18next';

export function Startseite() {
    const {t} = useTranslation()
    return(
        <div>

            <h1>{t('Startseite')}</h1>
            <FileInput></FileInput>
        </div>
    );
}