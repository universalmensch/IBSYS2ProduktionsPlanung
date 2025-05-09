import { useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w320/us.png' },
  { code: 'de', label: 'Deutsch', flag: 'https://flagcdn.com/w320/de.png' },
];

const LanguageSelect = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const handleChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setOpen(false); 
  };

  return (
    <div className="lang-select-wrapper" style={{ position: 'relative', display: 'inline-block', justifyContent: 'end'}}>
      <Button
        onClick={() => setOpen(prev => !prev)}
        className="btn btn-sm lang-btn"
        aria-label={t('Select Language')}
      >
        <img src={currentLang.flag} alt={currentLang.code} width="20" height="15" className="lang-flag" />
      </Button>

      {open && (
        <ul className="lang-dropdown" style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: 4,
          margin: '6px 0 0 0',
          listStyle: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000,
          textAlign: 'left',
        }}>
          {LANGUAGES.map(({ code, label, flag }) => (
            <li key={code}>
              <button
                onClick={() => handleChange(code)}
                className="dropdown-item btn btn-link"
                style={{
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 12px'
                  }}
              >
                <img src={flag} alt={code} width="20" height="15" className="me-2" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
