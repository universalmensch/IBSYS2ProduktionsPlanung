import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/minutenplanung.css'
import { useGeneralStore } from '../helper/GeneralStoreContext';
import { WorkingTime} from '../dtos/XMLOutput';

type Zeile = {
  id: string;
  bezeichnung: string;
  typ: string;
  sachNr: string;
  auftragsmenge: number;
  minutenLinks: (number | '')[];
};

export const MinutenPlanung = () => {

const {generalStore, setGeneralStoreData} = useGeneralStore();

console.log(generalStore)
const input = generalStore?.input?.results;
const output = generalStore?.output?.input;
const wartelistenArbeitsplatz = input?.waitinglistworkstations.workplace;

//Funktion für den Import der XML-Daten
useEffect(() => {
  if (!wartelistenArbeitsplatz) return;

  const rueckstandArray = Array(15).fill(0);

  wartelistenArbeitsplatz.forEach((workplace) => {
    const { id, timeneed } = workplace;

    const arrayIndex = id - 1;

    if (arrayIndex >= 0 && arrayIndex < 15) {
      rueckstandArray[arrayIndex] = Number(timeneed) || 0;  // ← Fix hier
    }
  });

  setRueckstandKapa(rueckstandArray);
}, [wartelistenArbeitsplatz]);

//Funktion für den Export der XML-Daten:
function save() {
  const workingTimes: WorkingTime[] = benoetigteZusatzschichten.map((shift, index) => {
    const overtime = benoetigteUeberstunden[index] === '' ? 0 : Number(benoetigteUeberstunden[index]);
    const shiftVal = shift === '' ? 0 : Number(shift);

    return {
      station: index + 1,
      shift: shiftVal,
      overtime: overtime
    };
  });

  const updatedOutput = {
    ...(output ?? {}),
    workingtimelist: {
      workingtime: workingTimes
    }
  };

  setGeneralStoreData({
    ...generalStore,
    output: {
      ...(generalStore.output ?? {}),
      input: updatedOutput
    }
  });

  console.log("Gespeicherte Arbeitszeiten für XML:", workingTimes);
}




  const [zeilen] = useState<Zeile[]>([
    {
      id: 'hrk',
      bezeichnung: 'Hinterrad',
      typ: 'K',
      sachNr: 'E4',
      auftragsmenge: 200,
      minutenLinks: Array.from({ length: 15 }, (_, i) =>
        i === 9 ? 4 : i === 10 ? 3 : ''
      ),
    },
    {
      id: 'hrd',
      bezeichnung: '',
      typ: 'D',
      sachNr: 'E5',
      auftragsmenge: 100,
      minutenLinks: Array.from({ length: 15 }, (_, i) =>
        i === 9 ? 4 : i === 10 ? 3 : ''
      ),
    },
    {
      id: 'hrh',
      bezeichnung: '',
      typ: 'H',
      sachNr: 'E6',
      auftragsmenge: 220,
      minutenLinks: Array.from({ length: 15 }, (_, i) =>
        i === 9 ? 4 : i === 10 ? 3 : ''
      ),
    },

    // Vorderrad
    {
        id: 'vrk',
        bezeichnung: 'Vorderrad',
        typ: 'K',
        sachNr: 'E7',
        auftragsmenge: 200,
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 9 ? 4 : i === 10 ? 3 : '')),
      },
      {
        id: 'vrd',
        bezeichnung: '',
        typ: 'D',
        sachNr: 'E8',
        auftragsmenge: 100,
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 9 ? 4 : i === 10 ? 3 : '')),
      },
      {
        id: 'vrh',
        bezeichnung: '',
        typ: 'H',
        sachNr: 'E9',
        auftragsmenge: 220,
        minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 9 ? 4 : i === 10 ? 3 : '')),
      },
  
      // Schutzblech hinten
      {
        id: 'shk',
        bezeichnung: 'Schutzblech hinten',
        typ: 'K',
        sachNr: 'E10',
        auftragsmenge: 200,
        minutenLinks: Array.from({ length: 15 }, (_, i) => ([6, 8, 11, 12].includes(i) ? 3 : i === 7 ? 1 : i === 6 ? 2 : '')),
      },
      {
        id: 'shd',
        bezeichnung: '',
        typ: 'D',
        sachNr: 'E11',
        auftragsmenge: 100,
        minutenLinks: Array.from({ length: 15 }, (_, i) => ([6, 7, 8, 11, 12].includes(i) ? (i === 7 ? 2 : 3) : '')),
      },
      {
        id: 'shh',
        bezeichnung: '',
        typ: 'H',
        sachNr: 'E12',
        auftragsmenge: 220,
        minutenLinks: Array.from({ length: 15 }, (_, i) => ([6, 7, 8, 11, 12].includes(i) ? (i === 7 ? 2 : 3) : '')),
      },
  
      // Schutzblech vorne
      {
        id: 'svk',
        bezeichnung: 'Schutzblech vorne',
        typ: 'K',
        sachNr: 'E13',
        auftragsmenge: 200,
        minutenLinks: Array.from({ length: 15 }, (_, i) => ([6, 8, 11, 12].includes(i) ? 3 : i === 7 ? 1 : i === 6 ? 2 : '')),
      },
      
  {
    id: 'schutzblech_v_d',
    bezeichnung: '',
    typ: 'D',
    sachNr: 'E14',
    auftragsmenge: 100,
    minutenLinks: Array.from({ length: 15 }, (_, i) =>
      [6, 7].includes(i) ? 2 : i === 8 || i === 11 ? 3 : i === 12 ? 2 : ''
    ),
  },
  {
    id: 'schutzblech_v_h',
    bezeichnung: '',
    typ: 'H',
    sachNr: 'E15',
    auftragsmenge: 220,
    minutenLinks: Array.from({ length: 15 }, (_, i) =>
      [6, 7].includes(i) ? 2 : i === 8 || i === 11 ? 3 : i === 12 ? 2 : ''
    ),
  },

  // Lenker
  {
    id: 'lenker_kdh',
    bezeichnung: 'Lenker',
    typ: 'KDH',
    sachNr: 'E16',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) =>
      i === 5 ? 2 : i === 13 ? 3 : ''
    ),
  },

  // Sattel
  {
    id: 'sattel_kdh',
    bezeichnung: 'Sattel',
    typ: 'KDH',
    sachNr: 'E17',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) =>
      i === 14 ? 3 : ''
    ),
  },

  // Rahmen (K, D, H)
  {
    id: 'rahmen_k',
    bezeichnung: 'Rahmen',
    typ: 'K',
    sachNr: 'E18',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) =>
      i === 5 ? 3 : i === 6 ? 2 : i === 7 ? 3 : i === 8 ? 2 : ''
    ),
  },
  {
    id: 'rahmen_d',
    bezeichnung: '',
    typ: 'D',
    sachNr: 'E19',
    auftragsmenge: 100,
    minutenLinks: Array.from({ length: 15 }, (_, i) =>
      i === 5 ? 3 : i === 6 ? 2 : i === 7 ? 3 : i === 8 ? 2 : ''
    ),
  },
  {
    id: 'rahmen_h',
    bezeichnung: '',
    typ: 'H',
    sachNr: 'E20',
    auftragsmenge: 220,
    minutenLinks: Array.from({ length: 15 }, (_, i) =>
      i === 5 ? 3 : i === 6 ? 2 : i === 7 ? 3 : i === 8 ? 2 : ''
    ),
  },
  {
    id: 'pedale-kdh-e26',
    bezeichnung: 'Pedale',
    typ: 'KDH',
    sachNr: 'E26',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 6 ? 2 : i === 14 ? 3 : '')),
  },
  {
    id: 'vorderrad_k-k-e49',
    bezeichnung: 'Vorderrad komplett (cpl)',
    typ: 'K',
    sachNr: 'E49',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 0 ? 6 : '')),
  },
  {
    id: 'vorderrad_k-d-e54',
    bezeichnung: '',
    typ: 'D',
    sachNr: 'E54',
    auftragsmenge: 100,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 0 ? 6 : '')),
  },
  {
    id: 'vorderrad_k-h-e29',
    bezeichnung: '',
    typ: 'H',
    sachNr: 'E29',
    auftragsmenge: 220,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 0 ? 6 : '')),
  },
  {
    id: 'rahm_u_räd-k-e50',
    bezeichnung: 'Rahmen und Räder',
    typ: 'K',
    sachNr: 'E50',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 1 ? 5 : '')),
  },
  {
    id: 'rahm_u_räd-d-e55',
    bezeichnung: '',
    typ: 'D',
    sachNr: 'E55',
    auftragsmenge: 100,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 1 ? 5 : '')),
  },
  {
    id: 'rahm_u_räd-h-e30',
    bezeichnung: '',
    typ: 'H',
    sachNr: 'E30',
    auftragsmenge: 220,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 1 ? 5 : '')),
  },
  {
    id: 'fahrr_o_peda-k-e51',
    bezeichnung: 'Fahrrad ohne Pedale',
    typ: 'K',
    sachNr: 'E51',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 2 ? 5 : '')),
  },
  {
    id: 'fahrr_o_peda-d-e56',
    bezeichnung: '',
    typ: 'D',
    sachNr: 'E56',
    auftragsmenge: 100,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 2 ? 6 : '')),
  },
  {
    id: 'fahrr_o_peda-h-e31',
    bezeichnung: '',
    typ: 'H',
    sachNr: 'E31',
    auftragsmenge: 220,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 2 ? 6 : '')),
  },
  {
    id: 'fahrr_komplett-k-p1',
    bezeichnung: 'Fahrrad komplett (cpl)',
    typ: 'K',
    sachNr: 'P1',
    auftragsmenge: 200,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 3 ? 6 : '')),
  },
  {
    id: 'fahrr_komplett-d-p2',
    bezeichnung: '',
    typ: 'D',
    sachNr: 'P2',
    auftragsmenge: 100,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 3 ? 7 : '')),
  },
  {
    id: 'fahrr_komplett-h-p3',
    bezeichnung: '',
    typ: 'H',
    sachNr: 'P3',
    auftragsmenge: 220,
    minutenLinks: Array.from({ length: 15 }, (_, i) => (i === 3 ? 7 : '')),
  },
  ]);
  
  const [ruestzeitGesamt, setRuestzeitGesamt] = useState(Array(15).fill(0));
  const [rueckstandKapa, setRueckstandKapa] = useState<number[]>(Array(15).fill(0));
  const [rueckstandRuestzeit, setRueckstandRuestzeit] = useState<number[]>(Array(15).fill(0));
  const [gesamtKapaBedarf, setGesamtKapaBedarf] = useState<number[]>(Array(15).fill(0));
  
  console.log('Rückstandkapa: ' + rueckstandKapa);
  console.log('Rückstandkapa (number[]):', rueckstandKapa);

const [kapaBedarf, setKapaBedarf] = useState<number[]>(Array(15).fill(0));

useEffect(() => {
  const neueKapaBedarf = Array.from({ length: 15 }, (_, i) => {
  const sum = zeilen.reduce((acc, zeile) => {
    const min = zeile.minutenLinks[i];
    return acc + (typeof min === 'number' ? min * zeile.auftragsmenge : 0);
  }, 0);
  return sum; // immer eine Zahl (auch wenn 0)
});

  setKapaBedarf(neueKapaBedarf);
}, [zeilen]);


  useEffect(() => {

  console.log('Berechne gesamtKapaBedarf mit:');
  console.log('kapaBedarf', kapaBedarf);
  console.log('ruestzeitGesamt', ruestzeitGesamt);
  console.log('rueckstandKapa', rueckstandKapa);
  console.log('rueckstandRuestzeit', rueckstandRuestzeit);

  const gesamt = Array.from({ length: 15 }, (_, i) => {
    const kapa = typeof kapaBedarf[i] === 'number' ? kapaBedarf[i] as number : 0;
    const ruest = typeof ruestzeitGesamt[i] === 'number' ? ruestzeitGesamt[i] : 0;
    const ruecksKapa = typeof rueckstandKapa[i] === 'number' ? rueckstandKapa[i] : 0;
    const ruecksRuest = typeof rueckstandRuestzeit[i] === 'number' ? rueckstandRuestzeit[i] : 0;

    console.log('Rückstandkapa: ' + rueckstandKapa);
    console.log('Rückkapa: ' + ruecksKapa);
    return kapa + ruest + ruecksKapa + ruecksRuest;
  });

  setGesamtKapaBedarf(gesamt);
}, [kapaBedarf, ruestzeitGesamt, rueckstandKapa, rueckstandRuestzeit]);

const ruestzeitEinfach = [
    60, 80, 60, 80, 0, 60, 210, 155, 140, 120, 80, 0, 0, 0, 30
  ];
  // const [ruestzeitGesamt, setRuestzeitGesamt] = useState(Array(15).fill(0));

  const handleRuestzeitChange = (index: number, value: string) => {
    const neueWerte = [...ruestzeitGesamt];
    neueWerte[index] = parseFloat(value) || 0;
    setRuestzeitGesamt(neueWerte);
  };

  const diffMaxArbeitszeit: (number | '')[] = Array.from({ length: 15 }, (_, i) => {
    const gesamt = gesamtKapaBedarf[i];
    return typeof gesamt === 'number' ? gesamt - 2400 : '';
  });

  //Das (schichtUndÜberstund) ist auch ein Schleifencode wie bei diffMaxArbeitszeit. Nur ist er einfacher und verständlicher geschrieben.

  // Neues Array mit 15 Spalten erstellen
const schichtUndÜberstund: (number | '')[] = [];

// Schleife über alle 15 Spalten (Arbeitsplätze)
for (let i = 0; i < 15; i++) {
  // Wert aus diffMaxArbeitszeit an der aktuellen Position holen
  const differenzZurMaxZeit = diffMaxArbeitszeit[i];

  // Prüfen, ob es sich um eine gültige Zahl handelt
  if (typeof differenzZurMaxZeit === 'number') {
    // Wenn ja: Durch 5 teilen, um den durchschnittlichen täglichen Bedarf zu berechnen
    const durchschnittProTag = differenzZurMaxZeit / 5;

    // Ergebnis im Array speichern
    schichtUndÜberstund.push(durchschnittProTag);
  } else {
    // Wenn kein gültiger Zahlenwert vorliegt, leeren String speichern
    schichtUndÜberstund.push('');
  }
}

const initialUeberstunde = Array.from({ length: 15 }, (_, i) => 0);
const [benoetigteUeberstunden, setBenoetigteUeberstunden] = useState<(number | '')[]>(initialUeberstunde);


const handleUeberstundenChange = (index: number, value: string) => {
  const updated = [...benoetigteUeberstunden];
  const num = Number(value);
  updated[index] = isNaN(num) ? '' : num;
  setBenoetigteUeberstunden(updated);
};

const initialZusatzschichten = Array.from({ length: 15 }, (_, i) => (i === 4 ? 0 : 1));
const [benoetigteZusatzschichten, setBenoetigteZusatzschichten] = useState<(number | '')[]>(initialZusatzschichten);

const handleZusatzschichtenChange = (index: number, value: string)=> {
  const updated = [...benoetigteZusatzschichten];
  const num = Number(value);
  updated[index] = isNaN(num) ? '' : num;
  setBenoetigteZusatzschichten(updated);
};


  // const [ruestzeitGesamt, setRuestzeitGesamt] = useState(Array(15).fill(0));

  return (
    // <div className="container mt-4">
      <div className="container-fluid mt-4">
      <h1>Minutenplanung</h1>
      <div className="mb-3">
        <LinkContainer to="/">
          <Button className="me-2">Startseite</Button>
        </LinkContainer>
        <LinkContainer to="/Produktionsplanung">
          <Button>Produktionsplanung</Button>
        </LinkContainer>
      </div>

      <Table striped bordered hover className="minuten-tabelle">

      <thead>
        <tr>
          <th>Bezeichnung</th>
          <th>Typ</th>
          <th>SachNr</th>
          <th>Auftragsmenge</th>
          {Array.from({ length: 15 }).map((_, i) => (
            <th colSpan={2} key={i}>{`Platz ${i + 1}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
  {zeilen.map((zeile) => (
    <tr key={zeile.id}>
      <td>{zeile.bezeichnung}</td>
      <td>{zeile.typ}</td>
      <td>{zeile.sachNr}</td>
      <td>{zeile.auftragsmenge}</td>
      {zeile.minutenLinks.map((min, i) => (
        <React.Fragment key={i}>
          <td className="text-center">
            {min !== '' ? min : ''}
          </td>
          <td className="text-center">
            {min !== '' ? min * zeile.auftragsmenge : ''}
          </td>
        </React.Fragment>
      ))}
    </tr>
  ))}
        <tr id="kapabedarf_neu" className="label-fett">
  <td colSpan={4} className="align-middle text-center">Kapazitätsbedarf (neu)</td>
  {kapaBedarf.map((wert, i) => (
    <td colSpan={2} key={i} className="text-center">
      {wert}
    </td>
  ))}
</tr>

<tr id="rüstzeit_neu" 
// className="label-fett"
>
  <td colSpan={4}>Einfache Rüstzeit / Rüstzeit gesamt (neu)</td>
  
        {ruestzeitEinfach.map((einfach, i) => (
          <React.Fragment key={i}>
            <td className="text-center">
              {einfach}
            </td>
            <td className="text-center">
              <input
                type="number"
                value={ruestzeitGesamt[i]}
                onChange={(e) => handleRuestzeitChange(i, e.target.value)}
                disabled={i === 4}
                readOnly={i === 4}
                style={{
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  width: '60px'
                }}
              />
            </td>
          </React.Fragment>
        ))}
</tr>



<tr id="rückstandKapaBedarf_neu" 
// className="label-fett"
>
  <td colSpan={4} className="align-middle text-center">Kap.bed. (Rückstand Vorperiode)</td>
  {rueckstandKapa.map((value, i) => (
        <td colSpan={2} key={i}>{value}</td>
      ))}
</tr>

<tr id="rücks_rüstzeit" 
// className="label-fett"
>
  <td colSpan={4} className="align-middle text-center">Rüstzeit (Rückstand Vorperiode)</td>
  {rueckstandRuestzeit.map((wert, i) => (
    <td colSpan={2} key={i} className="text-center">
      {wert}
    </td>
  ))}
</tr>

{/* <tr id="gesamt_kapabedarf" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }} className="label-fett">
  <td colSpan={4} className="align-middle text-center">Gesamt-Kapazitätsbedarf</td>
  {gesamtKapaBedarf.map((wert, i) => (
    <td colSpan={2} key={i} style={{ textAlign: 'center' }} className="text-center">
      {wert}
    </td>
  ))}
</tr> */}

<tr className="fw-bold bg-light">
  <td colSpan={4}>Gesamt Kapazitätsbedarf</td>
  {gesamtKapaBedarf.map((val, i) => (
    <React.Fragment key={i}>
            <td colSpan={2} className="text-center">{val}</td>
    </React.Fragment>
  ))}
</tr>

<tr id="diff_max_wochenarbeitszeit" className="label-fett">
  <td colSpan={4} className="align-middle text-center">Differenz zu max. Wochenarbeitszeit</td>
  {diffMaxArbeitszeit.map((wert, i) => {
    let cellClass = "text-center";
    if (typeof wert === 'number') {
      cellClass += wert < 0 ? " bg-success text-white" : " bg-danger text-white";
    }

    return (
      <td colSpan={2} key={i} className={cellClass}>
        {wert}
      </td>
    );
  })}
  </tr>

  <tr id="schicht_u_überst" className="label-fett">
  <td colSpan={4} className="align-middle text-center">Schichten und Überstunden / Überzeit pro Tag</td>
  {schichtUndÜberstund.map((wert, i) => {
    // Klasse basierend auf dem Wert bestimmen
    let cellClass = "text-center";
    if (typeof wert === 'number') {
      cellClass += wert < 0 ? " bg-success text-white" : " bg-danger text-white";
    }

    return (
      <td colSpan={2} key={i} className={cellClass}>
        {wert}
      </td>
    );
  })}
  </tr>
  {/* Abstand von 1cm per Leerzeile simulieren */}
  <tr>
  <td colSpan={34} style={{ height: '1cm', background: 'transparent', border: 'none' }} />
  </tr>

  <tr id="benötigte_überstunden" className="label-fett">
  <td colSpan={4} className="text-center">Benötigte Überstunden / pro Tag</td>

  {benoetigteUeberstunden.map((wert, i) => {
    const num = Number(wert);
    const isCritical = num > 240 || num < 0;

    return (
      <td colSpan={2} key={i} className="text-center">
        <input
          type="number"
          value={wert}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          disabled={i === 4}
          readOnly={i === 4}
          style={{
            width: '100%',
            textAlign: 'center',
            border: '1px solid #ccc',
            backgroundColor: i === 4 ? '#f0f0f0' : 'white',
            color: i === 4 ? 'gray' : isCritical ? 'red' : 'inherit',
            fontWeight: isCritical ? 'bold' : 'normal',
          }}
        />
      </td>
    );
  })}
  </tr>

  <tr id="benötigte_zusatzschichten" className="label-fett">
  <td colSpan={4} className="text-center">Benötigte Zusatzschichten</td>

  {benoetigteZusatzschichten.map((wert, i) => { 
      const num = Number(wert);
      let isCritical = Boolean(false);
      if (num > 3 || num < 1) {
        isCritical = true;
      };

  return (
    <td colSpan={2} key={i} className="text-center">
      <input
        type="number"
        value={wert}
        onChange={(e) => handleZusatzschichtenChange(i, e.target.value)}
        disabled={i === 4}
        readOnly={i === 4}
        style={{
          width: '100%',
          textAlign: 'center',
          border: '1px solid #ccc',
          backgroundColor: i === 4 ? '#f0f0f0' : 'white',
          color: i === 4 ? 'gray' : isCritical ? 'red' : 'inherit',
          fontWeight: isCritical ? 'bold' : 'normal',
        }}
      />
    </td>
  );
  })}
  </tr>



      </tbody>
    </Table>
<div>

</div>

    <Button className="Button"
                    onClick={save}
            >
                Arbeitszeitplan speichern
            </Button>
        </div>
  );
};