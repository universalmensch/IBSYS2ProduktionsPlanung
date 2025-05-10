import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type Zeile = {
  id: string;
  bezeichnung: string;
  typ: string;
  sachNr: string;
  auftragsmenge: number;
  minutenLinks: (number | '')[];
};

// function berechneArbeitsplatzMinuten(
//   auftragsmenge: number,
//   minutenLinks: (number | '')[]
// ): (number | '')[] {
//   return minutenLinks.map((wert) =>
//     typeof wert === 'number' ? auftragsmenge * wert : ''
//   );
// }

// const initialArray = Array(15).fill('');

export const MinutenPlanung = () => {
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
    bezeichnung: 'Schutzblech',
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

  const kapaBedarf: (number | '')[] = Array.from({ length: 15 }, (_, i) => {
    const sum = zeilen.reduce((acc, zeile) => {
      const min = zeile.minutenLinks[i];
      return acc + (typeof min === 'number' ? min * zeile.auftragsmenge : 0);
    }, 0);
    return sum > 0 ? sum : '';
  });
  
  const initialArray = Array().fill('');
  
  const [ruestzeitNeu, setRuestzeitNeu] = useState<number[]>(initialArray);
  const [rueckstandKapa, setRueckstandKapa] = useState<number[]>(initialArray);
  const [rueckstandRuestzeit, setRueckstandRuestzeit] = useState<number[]>(initialArray);
  const [gesamtKapaBedarf, setGesamtKapaBedarf] = useState<number[]>(initialArray);
  
  // Summenberechnung mit useEffect
  useEffect(() => {
    const neueSumme = Array.from({ length: 15 }, (_, i) => {
      const kapa = typeof kapaBedarf[i] === 'number' ? kapaBedarf[i] : 0;
      const rueckKapa = typeof rueckstandKapa[i] === 'number' ? rueckstandKapa[i] : 0;
      const ruest = typeof ruestzeitNeu[i] === 'number' ? ruestzeitNeu[i] : 0;
      const rueckRuest = typeof rueckstandRuestzeit[i] === 'number' ? rueckstandRuestzeit[i] : 0;
  
      return kapa + rueckKapa + ruest + rueckRuest;
    });
    setGesamtKapaBedarf(neueSumme);
  }, [kapaBedarf, ruestzeitNeu, rueckstandKapa, rueckstandRuestzeit]);

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


// const handleUeberstundenChange = (index: number, value: string) => {
//   const updated = [...benoetigteUeberstunden];
//   const num = Number(value);
//   updated[index] = isNaN(num) ? '' : num;
//   setBenoetigteUeberstunden(updated);
// };

const initialZusatzschichten = Array.from({ length: 15 }, (_, i) => (i === 4 ? 0 : 1));
const [benoetigteZusatzschichten, setBenoetigteZusatzschichten] = useState<(number | '')[]>(initialZusatzschichten);

// const handleZusatzschichtenChange = (index: number, value: string)=> {
//   const updated = [...benoetigteZusatzschichten];
//   const num = Number(value);
//   updated[index] = isNaN(num) ? '' : num;
//   setBenoetigteZusatzschichten(updated);
// };


//für die neue Tabelle
function berechneGZ(zeilenId: string, platzNummer: number) {
  const auftragsId = `${zeilenId}_auftragsmenge`;
  const ezId = `${zeilenId}_ez${platzNummer}`;
  const gzId = `${zeilenId}_gz${platzNummer}`;

  const auftragsElem = document.getElementById(auftragsId);
  const ezElem = document.getElementById(ezId);
  const gzElem = document.getElementById(gzId);

  if (!auftragsElem || !ezElem || !gzElem) return;

  const auftragsmenge = parseFloat(auftragsElem.textContent || "0");
  const ez = parseFloat(ezElem.textContent || "0");

  const result = auftragsmenge * ez;
  gzElem.textContent = result.toString();
}


  useEffect(() => {
    berechneGZ("e4", 10); berechneGZ("e4", 11);
    berechneGZ("e5", 10); berechneGZ("e5", 11);
    berechneGZ("e6", 10); berechneGZ("e6", 11); 
    berechneGZ("e7", 10); berechneGZ("e7", 11);
    berechneGZ("e8", 10); berechneGZ("e8", 11);
    berechneGZ("e9", 10); berechneGZ("e9", 11); 
  }, []);

  
  // useEffect(() => {
  //   const calculateAllArbeitsplaetze = () => {
  //     const ezCells = document.querySelectorAll('[id*="_ez"]');

  //     ezCells.forEach((ezCell) => {
  //       const ezId = ezCell.id; // z.B. e4_ez10
  //       const match = ezId.match(/^(.+)_ez(\d+)$/);

  //       if (match) {
  //         const prefix = match[1];      // z.B. e4
  //         const platzNummer = match[2]; // z.B. 10

  //         const auftragsmengeElement = document.getElementById(`${prefix}_auftragsmenge`);
  //         const gzElement = document.getElementById(`${prefix}_gz${platzNummer}`);

  //         if (auftragsmengeElement && gzElement) {
  //           const auftragsmenge = parseFloat(auftragsmengeElement.textContent ?? '') || 0;
  //           const ez = parseFloat(ezCell.textContent ?? '') || 0;
  //           const result = auftragsmenge * ez;
  //           gzElement.textContent = result.toFixed(0);
  //         }
  //       }
  //     });
  //   };

  //   const calculateKapazitaetsbedarf = () => {
  //     for (let platz = 1; platz <= 15; platz++) {
  //       let summe = 0;

  //       const gzZellen = document.querySelectorAll(`[id$="_gz${platz}"]`);
  //       gzZellen.forEach((gzZelle) => {
  //         const wert = parseFloat(gzZelle.textContent ?? '') || 0;
  //         summe += wert;
  //       });

  //       const zielZelle = document.getElementById(`kapabedarf_neu_${platz}`);
  //       if (zielZelle) {
  //         zielZelle.textContent = summe.toFixed(0);
  //       }
  //     }
  //   };

  //   const observer = new MutationObserver(() => {
  //     calculateAllArbeitsplaetze();
  //     calculateKapazitaetsbedarf();
  //   });

  //   // Beobachte Änderungen an allen _ez und _auftragsmenge Zellen
  //   const relevanteZellen = document.querySelectorAll('[id*="_ez"], [id*="_auftragsmenge"]');
  //   relevanteZellen.forEach((zelle) =>
  //     observer.observe(zelle, { childList: true, subtree: true })
  //   );

  //   // Initiale Berechnung
  //   calculateAllArbeitsplaetze();
  //   calculateKapazitaetsbedarf();

  //   // Clean-up bei Unmount
  //   return () => observer.disconnect();
  // }, []);


  const ruestzeitEinfach = [
    2.5, 3, 2, 4, 3.5, 2.2, 3.1, 2.8, 3.3, 2.7,
    3.6, 2.4, 3.8, 2.9, 3.2
  ];
  const [ruestzeitGesamt, setRuestzeitGesamt] = useState(Array(15).fill(0));

  const handleRuestzeitChange = (index: number, value: string) => {
    const neueWerte = [...ruestzeitGesamt];
    neueWerte[index] = parseFloat(value) || 0;
    setRuestzeitGesamt(neueWerte);
  };


  const [ueberstunden, setUeberstunden] = useState(Array(15).fill(0));

  const handleUeberstundenChange = (index: number, value: string) => {
    const neueWerte = [...ueberstunden];
    neueWerte[index] = parseFloat(value) || 0;
    setUeberstunden(neueWerte);
  };

  const [zusatzschichten, setZusatzschichten] = useState(Array(15).fill(1));

  const handleZusatzschichtenChange = (index: number, value: string) => {
    const neueWerte = [...zusatzschichten];
    neueWerte[index] = parseInt(value) || 0;
    setZusatzschichten(neueWerte);
  };

  return (
    <div className="container mt-4">
      <h1>Minutenplanung</h1>
      <div className="mb-3">
        <LinkContainer to="/">
          <Button className="me-2">Startseite</Button>
        </LinkContainer>
        <LinkContainer to="/Produktionsplanung">
          <Button>Produktionsplanung</Button>
        </LinkContainer>
      </div>

      <Table striped bordered hover style={{ width: '70vw' }}>
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

<tr id="rüstzeit_neu" className="label-fett">
  <td colSpan={4} className="align-middle text-center">Rüstzeit (neu)</td>
  {ruestzeitNeu.map((wert, i) => (
    <React.Fragment key={i}>
        <td className="text-center"> {/* Platz für Rohwert, leer */}</td>
    <td key={i} className="text-center">
      {wert}
    </td>
  </React.Fragment>
    ))}
</tr>



<tr id="rücks_kapaBedarf_neu" className="label-fett">
  <td colSpan={4} className="align-middle text-center">Kap.bed. (Rückstand Vorperiode)</td>
  {rueckstandKapa.map((wert, i) => (
    <td colSpan={2} key={i} className="text-center">
      {wert}
    </td>
  ))}
</tr>

<tr id="rücks_rüstzeit" className="label-fett">
  <td colSpan={4} className="align-middle text-center">Rüstzeit (Rückstand Vorperiode)</td>
  {rueckstandRuestzeit.map((wert, i) => (
    <td colSpan={2} key={i} className="text-center">
      {wert}
    </td>
  ))}
</tr>

<tr id="gesamt_kapabedarf" className="label-fett">
  <td colSpan={4} className="align-middle text-center">Gesamt-Kapazitätsbedarf</td>
  {gesamtKapaBedarf.map((wert, i) => (
    <td key={i} className="text-center">
      {wert}
    </td>
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
      <td key={i} className={cellClass}>
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
      <td key={i} className={cellClass}>
        {wert}
      </td>
    );
  })}
  </tr>
  {/* Abstand von 1cm per Leerzeile simulieren */}
  <tr>
  <td colSpan={19} style={{ height: '1cm', background: 'transparent', border: 'none' }} />
  </tr>

  <tr id="benötigte_überstunden" className="label-fett">
  <td colSpan={4} className="text-center">Benötigte Überstunden</td>

  {benoetigteUeberstunden.map((wert, i) => {
    const num = Number(wert);
    const isCritical = num > 240 || num < 0;

    return (
      <td key={i} className="text-center">
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
    <td key={i} className="text-center">
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

   
  <Table striped bordered hover style={{ width: '80vw' }}>
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
        <tr>
          <td rowSpan={3}>Hinterrad</td>
          <td>K</td>
          <td>E4</td>
          <td id='e4_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e4_ez10'>4</td>
          <td id='e4_gz10'>800</td>
          <td id='e4_ez11'>3</td>
          <td id='e4_gz11'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E5</td>
          <td id='e5_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e5_ez10'>4</td>
          <td id='e5_gz10'>400</td>
          <td id='e5_ez11'>3</td>
          <td id='e5_gz11'>300</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <td>H</td>
          <td>E6</td>
          <td id='e6_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e6_ez10'>5</td>
          <td id='e6_gz10'></td>
          <td id='e6_ez11'>3</td>
          <td id='e6_gz11'></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr><tr>
          <td rowSpan={3}>Vorderrad</td>
          <td>K</td>
          <td>E7</td>
          <td id='e7_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e7_ez10'>4</td>
          <td id='e7_gz10'>800</td>
          <td id='e7_ez11'>3</td>
          <td id='e7_gz11'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E8</td>
          <td id='e8_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e8_ez10'>4</td>
          <td id='e8_gz10'>400</td>
          <td id='e8_ez11'>3</td>
          <td id='e8_gz11'>300</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <td>H</td>
          <td>E9</td>
          <td id='e9_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e9_ez10'>5</td>
          <td id='e9_gz10'></td>
          <td id='e9_ez11'>3</td>
          <td id='e9_gz11'></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td rowSpan={3}>Schutzblech hinten</td>
          <td>K</td>
          <td>E10</td>
          <td id='e10_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e10_ez7'>3</td>
          <td id='e10_gz7'>800</td>
          <td id='e10_ez8'>1</td>
          <td id='e10_gz8'>800</td>
          <td id='e10_ez9'>3</td>
          <td id='e10_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e10_ez12'>3</td>
          <td id='e10_gz12'>800</td>
          <td id='e10_ez13'>3</td>
          <td id='e10_gz13'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E11</td>
          <td id='e11_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e11_ez7'>3</td>
          <td id='e11_gz7'>800</td>
          <td id='e11_ez8'>1</td>
          <td id='e11_gz8'>800</td>
          <td id='e11_ez9'>3</td>
          <td id='e11_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e11_ez12'>3</td>
          <td id='e11_gz12'>800</td>
          <td id='e11_ez13'>3</td>
          <td id='e11_gz13'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <td>H</td>
          <td>E12</td>
          <td id='e12_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e12_ez7'>3</td>
          <td id='e12_gz7'>800</td>
          <td id='e12_ez8'>2</td>
          <td id='e12_gz8'>800</td>
          <td id='e12_ez9'>3</td>
          <td id='e12_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e12_ez12'>3</td>
          <td id='e12_gz12'>800</td>
          <td id='e12_ez13'>3</td>
          <td id='e12_gz13'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td rowSpan={3}>Schutzblech vorne</td>
          <td>K</td>
          <td>E13</td>
          <td id='e13_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e13_ez7'>3</td>
          <td id='e13_gz7'>800</td>
          <td id='e13_ez8'>1</td>
          <td id='e13_gz8'>800</td>
          <td id='e13_ez9'>3</td>
          <td id='e13_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e13_ez12'>3</td>
          <td id='e13_gz12'>800</td>
          <td id='e13_ez13'>3</td>
          <td id='e13_gz13'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E14</td>
          <td id='e14_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e14_ez7'>2</td>
          <td id='e14_gz7'>800</td>
          <td id='e14_ez8'>2</td>
          <td id='e14_gz8'>800</td>
          <td id='e14_ez9'>3</td>
          <td id='e14_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e14_ez12'>3</td>
          <td id='e14_gz12'>800</td>
          <td id='e14_ez13'>2</td>
          <td id='e14_gz13'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <td>H</td>
          <td>E15</td>
          <td id='e15_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e15_ez7'>2</td>
          <td id='e15_gz7'>800</td>
          <td id='e15_ez8'>2</td>
          <td id='e15_gz8'>800</td>
          <td id='e15_ez9'>3</td>
          <td id='e15_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e15_ez12'>3</td>
          <td id='e15_gz12'>800</td>
          <td id='e15_ez13'>2</td>
          <td id='e15_gz13'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>Lenker</td>
          <td>KDH</td>
          <td>E16</td>
          <td id='e16_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e16_ez6'>2</td>
          <td id='e16_gz6'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e16_ez14'>3</td>
          <td id='e16_gz14'>800</td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>Sattel</td>
          <td>KDH</td>
          <td>E17</td>
          <td id='e17_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e17_ez15'>3</td>
          <td id='e17_gz15'>800</td>

        </tr>
        <tr>
          <td rowSpan={3}>Rahmen</td>
          <td>K</td>
          <td>E18</td>
          <td id='e18_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e18_ez6'>3</td>
          <td id='e18_gz6'>800</td>
          <td id='e18_ez7'>2</td>
          <td id='e18_gz7'>800</td>
          <td id='e18_ez8'>3</td>
          <td id='e18_gz8'>800</td>
          <td id='e18_ez9'>2</td>
          <td id='e18_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E19</td>
          <td id='e19_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e19_ez6'>3</td>
          <td id='e19_gz6'>800</td>
          <td id='e19_ez7'>2</td>
          <td id='e19_gz7'>800</td>
          <td id='e19_ez8'>3</td>
          <td id='e19_gz8'>800</td>
          <td id='e19_ez9'>2</td>
          <td id='e19_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <td>H</td>
          <td>E20</td>
          <td id='e20_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e20_ez6'>3</td>
          <td id='e20_gz6'>800</td>
          <td id='e20_ez7'>2</td>
          <td id='e20_gz7'>800</td>
          <td id='e20_ez8'>3</td>
          <td id='e20_gz8'>800</td>
          <td id='e20_ez9'>2</td>
          <td id='e20_gz9'>600</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Pedale</td>
          <td>KDH</td>
          <td>E26</td>
          <td id='e26_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e26_ez7'>2</td>
          <td id='e26_gz7'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e26_ez15'>3</td>
          <td id='e26_gz15'>800</td>

        </tr>

        <tr>
          <td rowSpan={3}>Vorderrad komplett (cpl)</td>
          <td>K</td>
          <td>E49</td>
          <td id='e49_auftragsmenge'>200</td>
          <td id='e49_ez1'>6</td>
          <td id='e49_gz1'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E54</td>
          <td id='e54_auftragsmenge'>100</td>
          <td id='e54_ez1'>6</td>
          <td id='e54_gz1'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>H</td>
          <td>E29</td>
          <td id='e9_auftragsmenge'>220</td>
          <td id='e29_ez1'>6</td>
          <td id='e29_gz1'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td rowSpan={3}>Rahmen und Räder</td>
          <td>K</td>
          <td>E50</td>
          <td id='e50_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td id='e50_ez2'>5</td>
          <td id='e50_gz2'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E55</td>
          <td id='e55_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td id='e55_ez2'>5</td>
          <td id='e55_gz2'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>H</td>
          <td>E30</td>
          <td id='e30_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td id='e30_ez2'>5</td>
          <td id='e30_gz2'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td rowSpan={3}>Fahrrad ohne Pedale</td>
          <td>K</td>
          <td>E51</td>
          <td id='e51_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e51_ez3'>5</td>
          <td id='e51_gz3'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>E56</td>
          <td id='e56_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e56_ez3'>6</td>
          <td id='e56_gz3'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>H</td>
          <td>E31</td>
          <td id='e31_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='e31_ez3'>6</td>
          <td id='e31_gz3'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowSpan={3}>Fahrrad komplett (cpl)</td>
          <td>K</td>
          <td>P1</td>
          <td id='p1_auftragsmenge'>200</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='p1_ez4'>6</td>
          <td id='p1_gz4'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
        <tr>
          <td>D</td>
          <td>P2</td>
          <td id='p2_auftragsmenge'>100</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='p2_ez4'>7</td>
          <td id='p2_gz4'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>H</td>
          <td>P3</td>
          <td id='p3_auftragsmenge'>220</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td id='p3_ez4'>7</td>
          <td id='p3_gz4'>800</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td colSpan={4} id='kadabedarf_neu_Zeile'>Kapazitätsbedarf (neu)</td>
          <td colSpan={2} id='kapabedarf_neu_1'></td>
          <td colSpan={2} id='kapabedarf_neu_2'></td>
          <td colSpan={2} id='kapabedarf_neu_3'></td>
          <td colSpan={2} id='kapabedarf_neu_4'></td>
          <td colSpan={2} id='kapabedarf_neu_5'></td>
          <td colSpan={2} id='kapabedarf_neu_6'></td>
          <td colSpan={2} id='kapabedarf_neu_7'></td>
          <td colSpan={2} id='kapabedarf_neu_8'></td>
          <td colSpan={2} id='kapabedarf_neu_9'></td>
          <td colSpan={2} id='kapabedarf_neu_10'></td>
          <td colSpan={2} id='kapabedarf_neu_11'></td>
          <td colSpan={2} id='kapabedarf_neu_12'></td>
          <td colSpan={2} id='kapabedarf_neu_13'></td>
          <td colSpan={2} id='kapabedarf_neu_14'></td>
          <td colSpan={2} id='kapabedarf_neu_15'></td>

        </tr>

        {/* <tr>
          <td colSpan={4}>Einfache Rüstzeit / Rüstzeit gesamt(neu)</td>
          <td id='ruestzeit_einfach_1'></td>
          <td id='ruestzeit_gesamt_1'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_2'></td>
          <td id='ruestzeit_gesamt_2'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_3'></td>
          <td id='ruestzeit_gesamt_3'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_4'></td>
          <td id='ruestzeit_gesamt_4'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_5'></td>
          <td id='ruestzeit_gesamt_5'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_6'></td>
          <td id='ruestzeit_gesamt_6'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_7'></td>
          <td id='ruestzeit_gesamt_7'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_8'></td>
          <td id='ruestzeit_gesamt_8'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_9'></td>
          <td id='ruestzeit_gesamt_9'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_10'></td>
          <td id='ruestzeit_gesamt_10'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_11'></td>
          <td id='ruestzeit_gesamt_11'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_12'></td>
          <td id='ruestzeit_gesamt_12'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_13'></td>
          <td id='ruestzeit_gesamt_13'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_14'></td>
          <td id='ruestzeit_gesamt_14'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>
          <td id='ruestzeit_einfach_15'></td>
          <td id='ruestzeit_gesamt_15'>
          <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
          </td>

        </tr> */}

<tr>
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

        <tr>
          <td colSpan={4}>Kap.bed. (Rückstand Vorperiode)</td>
          <td colSpan={2} id='kapabedarf_rück_1'></td>
          <td colSpan={2} id='kapabedarf_rück_2'></td>
          <td colSpan={2} id='kapabedarf_rück_3'></td>
          <td colSpan={2} id='kapabedarf_rück_4'></td>
          <td colSpan={2} id='kapabedarf_rück_5'></td>
          <td colSpan={2} id='kapabedarf_rück_6'></td>
          <td colSpan={2} id='kapabedarf_rück_7'></td>
          <td colSpan={2} id='kapabedarf_rück_8'></td>
          <td colSpan={2} id='kapabedarf_rück_9'></td>
          <td colSpan={2} id='kapabedarf_rück_10'></td>
          <td colSpan={2} id='kapabedarf_rück_11'></td>
          <td colSpan={2} id='kapabedarf_rück_12'></td>
          <td colSpan={2} id='kapabedarf_rück_13'></td>
          <td colSpan={2} id='kapabedarf_rück_14'></td>
          <td colSpan={2} id='kapabedarf_rück_15'></td>

        </tr>

        <tr>
          <td colSpan={4}>Rüstzeit (Rückstand Vorperiode)</td>
          <td colSpan={2} id='ruestzeit_rück_1'></td>
          <td colSpan={2} id='ruestzeit_rück_2'></td>
          <td colSpan={2} id='ruestzeit_rück_3'></td>
          <td colSpan={2} id='ruestzeit_rück_4'></td>
          <td colSpan={2} id='ruestzeit_rück_5'></td>
          <td colSpan={2} id='ruestzeit_rück_6'></td>
          <td colSpan={2} id='ruestzeit_rück_7'></td>
          <td colSpan={2} id='ruestzeit_rück_8'></td>
          <td colSpan={2} id='ruestzeit_rück_9'></td>
          <td colSpan={2} id='ruestzeit_rück_10'></td>
          <td colSpan={2} id='ruestzeit_rück_11'></td>
          <td colSpan={2} id='ruestzeit_rück_12'></td>
          <td colSpan={2} id='ruestzeit_rück_13'></td>
          <td colSpan={2} id='ruestzeit_rück_14'></td>
          <td colSpan={2} id='ruestzeit_rück_15'></td>

        </tr>

        <tr>
          <td colSpan={4}>Gesamt-Kapazitätsbedarf</td>
          <td colSpan={2} id='kapabedarf_gesamt_1'></td>
          <td colSpan={2} id='kapabedarf_gesamt_2'></td>
          <td colSpan={2} id='kapabedarf_gesamt_3'></td>
          <td colSpan={2} id='kapabedarf_gesamt_4'></td>
          <td colSpan={2} id='kapabedarf_gesamt_5'></td>
          <td colSpan={2} id='kapabedarf_gesamt_6'></td>
          <td colSpan={2} id='kapabedarf_gesamt_7'></td>
          <td colSpan={2} id='kapabedarf_gesamt_8'></td>
          <td colSpan={2} id='kapabedarf_gesamt_9'></td>
          <td colSpan={2} id='kapabedarf_gesamt_10'></td>
          <td colSpan={2} id='kapabedarf_gesamt_11'></td>
          <td colSpan={2} id='kapabedarf_gesamt_12'></td>
          <td colSpan={2} id='kapabedarf_gesamt_13'></td>
          <td colSpan={2} id='kapabedarf_gesamt_14'></td>
          <td colSpan={2} id='kapabedarf_gesamt_15'></td>

        </tr>

        <tr>
          <td colSpan={4}>Differenz zu max. Wochenarbeitszeit</td>
          <td colSpan={2} id='diff_wochenarbeitszeit_1'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_2'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_3'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_4'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_5'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_6'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_7'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_8'></td>
          <td colSpan={2} id='diff_wochenarbeitszeitt_9'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_10'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_11'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_12'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_13'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_14'></td>
          <td colSpan={2} id='diff_wochenarbeitszeit_15'></td>

        </tr>

        <tr>
          <td colSpan={4}>Schichten und Überstunden / Überzeit pro Tag</td>
          <td colSpan={2} id='ueberzeit_tag_1'></td>
          <td colSpan={2} id='ueberzeit_tag_2'></td>
          <td colSpan={2} id='ueberzeit_tag_3'></td>
          <td colSpan={2} id='ueberzeit_tag_4'></td>
          <td colSpan={2} id='ueberzeit_tag_5'></td>
          <td colSpan={2} id='ueberzeit_tag_6'></td>
          <td colSpan={2} id='ueberzeit_tag_7'></td>
          <td colSpan={2} id='ueberzeit_tag_8'></td>
          <td colSpan={2} id='ueberzeit_tag_9'></td>
          <td colSpan={2} id='ueberzeit_tag_10'></td>
          <td colSpan={2} id='ueberzeit_tag_11'></td>
          <td colSpan={2} id='ueberzeit_tag_12'></td>
          <td colSpan={2} id='ueberzeit_tag_13'></td>
          <td colSpan={2} id='ueberzeit_tag_14'></td>
          <td colSpan={2} id='ueberzeit_tag_15'></td>

        </tr>

        <tr>
  <td colSpan={34} style={{ height: '1cm', background: 'transparent', border: 'none' }} />
  </tr>

  {/* <tr id="benötigte_überstunden" className="label-fett">
  <td colSpan={4} className="text-center">Benötigte Überstunden</td>

  <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>

      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>

      <td colSpan={2} id='betoet_ueberzeit_1' className="text-center">
        <input
          type="number"
          defaultValue={0}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
    
  </tr> */}

  
    <tr id="benötigte_überstunden" className="label-fett">
      <td colSpan={4} className="text-center">Benötigte Überstunden</td>

      {ueberstunden.map((wert, i) => (
        <td colSpan={2} key={i} className="text-center">
          <input
            type="number"
            value={wert}
            onChange={(e) => handleUeberstundenChange(i, e.target.value)}
            style={{
              textAlign: 'center',
              border: '1px solid #ccc',
              width: '60px'
            }}
          />
        </td>
      ))}
    </tr>
  
    <tr id="benötigte_zusatzschichten" className="label-fett">
      <td colSpan={4} className="text-center">Benötigte Zusatzschichten</td>

      {zusatzschichten.map((wert, i) => (
        <td colSpan={2} key={i} className="text-center">
          <input
            type="number"
            value={wert}
            onChange={(e) => handleZusatzschichtenChange(i, e.target.value)}
            style={{
              textAlign: 'center',
              border: '1px solid #ccc',
              width: '60px'
            }}
          />
        </td>
      ))}
    </tr>

  {/* <tr id="benötigte_zusatzschichten" className="label-fett">
  <td colSpan={4} className="text-center">Benötigte Zusatzschichten</td>

  <td colSpan={2} id='benoet_schichten_1' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_2' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_3' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_4' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_5' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_6' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_7' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_8' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_9' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_10' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_11' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_12' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_13' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_14' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>
      <td colSpan={2} id='benoet_schichten_15' className="text-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => handleUeberstundenChange(i, e.target.value)}
          style={{
            textAlign: 'center',
            border: '1px solid #ccc'
          }}
        />
      </td>

      </tr> */}
      
      </tbody>
  </Table>



    </div>

  );
};