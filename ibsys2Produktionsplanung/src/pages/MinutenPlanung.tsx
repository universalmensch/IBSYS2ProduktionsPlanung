import { Button, Table} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/minutenplanung.css';
import { useEffect, useState } from 'react';


export function Minutenplanung() {


    const [kapaBedarf, setKapaBedarf] = useState<number[]>([]);

    useEffect(() => {
        fetch('./minutenPlanung') 
          .then((res) => res.json())
          .then((data) => { //Erinnerung: Hier brauch ich ein Array mit den berechneten Minuten
            setKapaBedarf(data);
          })
          .catch((err) => {
            console.error('Fehler beim Laden der Kapazitätsbedarfe', err);
          });
      }, []);


      const [rüstzeit, setRüstzeit] = useState<number[]>([]);

      useEffect(() => {
          fetch('./minutenPlanung') 
            .then((res) => res.json())
            .then((data) => { //Erinnerung: Hier brauch ich ein Array mit den berechneten Minuten
                setRüstzeit(data);
            })
            .catch((err) => {
              console.error('Fehler beim Laden der Rüstzeit', err);
            });
        }, []);

        const [gesKapaBedarf, setGesKapaBedarf] = useState<number[]>([]);

      useEffect(() => {
          fetch('./minutenPlanung') 
            .then((res) => res.json())
            .then((data) => { //Erinnerung: Hier brauch ich ein Array mit den berechneten Minuten
                setGesKapaBedarf(data);
            })
            .catch((err) => {
              console.error('Fehler beim Laden der Gesamt-Kapazitätsbedarfe', err);
            });
        }, []);

        const [schichtÜberstund, setSchichtÜberstund] = useState<number[]>([]);

      useEffect(() => {
          fetch('./minutenPlanung') 
            .then((res) => res.json())
            .then((data) => { //Erinnerung: Hier brauch ich ein Array mit den berechneten Minuten
                setSchichtÜberstund(data);
            })
            .catch((err) => {
              console.error('Fehler beim Laden der Schichten und Überstunden', err);
            });
        }, []);

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

            <Table id="minutentabelle" bordered>
                <thead>
                    <tr>
                        <th rowSpan={2} className="align-middle text-center">Bezeichnung</th>
                        <th rowSpan={2} className="align-middle text-center">Fahrradart</th>
                        <th rowSpan={2} className="align-middle text-center">Sach-Nr.</th>
                        <th rowSpan={2} className="align-middle text-center">Auftragsmenge</th>
                        <th colSpan={30} className="text-center">Arbeitsplatz</th>
                    </tr>
                    <tr>
                        {Array.from({ length: 15 }, (_, i) => (
                        <th key={i} colSpan={2} className="text-center">{i + 1}</th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    <tr id="hinterrad-k-E5">
                        <td rowSpan={3} className="align-middle text-center">Hinterrad</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E4</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => (
                    <>
                        <td key={`K-${i}-1`} className="text-center small-cell border-end">
                        {(i === 9 || i === 10) ? (i === 9 ? '4' : '3') : ''}
                        </td>
                        <td key={`K-${i}-2`} className="text-center small-cell"></td>
                    </>
                    ))}

                    </tr>
                    <tr id="hinterrad-d-E5">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E5</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => (
                    <>
                        <td key={`D-${i}-1`} className="text-center small-cell border-end">
                        {(i === 9 || i === 10) ? (i === 9 ? '4' : '3') : ''}
                        </td>
                        <td key={`D-${i}-2`} className="text-center small-cell"></td>
                    </>
                    ))}

                    </tr>
                    <tr id="hinterrad-h-E6">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E6</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => (
                    <>
                        <td key={`H-${i}-1`} className="text-center small-cell border-end">
                        {(i === 9 || i === 10) ? (i === 9 ? '4' : '3') : ''}
                        </td>
                        <td key={`H-${i}-2`} className="text-center small-cell"></td>
                    </>
                    ))}
                    </tr>
                    <tr id="vorderrad-k-E7">
                        <td rowSpan={3} className="align-middle text-center">Vorderrad</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E7</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => (
                    <>
                        <td key={`K-${i}-1`} className="text-center small-cell border-end">
                        {(i === 9 || i === 10) ? (i === 9 ? '4' : '3') : ''}
                        </td>
                        <td key={`K-${i}-2`} className="text-center small-cell"></td>
                    </>
                    ))}

                    </tr>
                    <tr id="vorderrad-d-E8">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E8</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => (
                    <>
                        <td key={`D-${i}-1`} className="text-center small-cell border-end">
                        {(i === 9 || i === 10) ? (i === 9 ? '4' : '3') : ''}
                        </td>
                        <td key={`D-${i}-2`} className="text-center small-cell"></td>
                    </>
                    ))}

                    </tr>
                    <tr id="vorderrad-h-E9">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E9</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => (
                    <>
                        <td key={`H-${i}-1`} className="text-center small-cell border-end">
                        {(i === 9 || i === 10) ? (i === 9 ? '4' : '3') : ''}
                        </td>
                        <td key={`H-${i}-2`} className="text-center small-cell"></td>
                    </>
                    ))}
                    </tr>
                    <tr id="schutzblech_h-k-E10">
                        <td rowSpan={3} className="align-middle text-center">Schutzblech hinten</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E10</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 6) value = '2';
                            else if (i === 7) value = '1';
                            else if (i === 8) value = '3';
                            else if (i === 11) value = '3';
                            else if (i === 12) value = '2';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="schutzblech_h-d-E11">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E11</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 6) value = '2';
                            else if (i === 7) value = '2';
                            else if (i === 8) value = '3';
                            else if (i === 11) value = '3';
                            else if (i === 12) value = '2';

                            return (
                                <>
                                <td key={`D-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`D-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="schutzblech_h-h-E12">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E12</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 6) value = '2';
                            else if (i === 7) value = '2';
                            else if (i === 8) value = '3';
                            else if (i === 11) value = '3';
                            else if (i === 12) value = '2';

                            return (
                                <>
                                <td key={`H-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`H-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="schutzblech_v-k-E13">
                        <td rowSpan={3} className="align-middle text-center">Schutzblech vorne</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E13</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 6) value = '2';
                            else if (i === 7) value = '1';
                            else if (i === 8) value = '3';
                            else if (i === 11) value = '3';
                            else if (i === 12) value = '2';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="schutzblech_v-d-E14">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E14</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 6) value = '2';
                            else if (i === 7) value = '2';
                            else if (i === 8) value = '3';
                            else if (i === 11) value = '3';
                            else if (i === 12) value = '2';

                            return (
                                <>
                                <td key={`D-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`D-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="schutzblech_v-h-E15">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E15</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 6) value = '2';
                            else if (i === 7) value = '2';
                            else if (i === 8) value = '3';
                            else if (i === 11) value = '3';
                            else if (i === 12) value = '2';

                            return (
                                <>
                                <td key={`H-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`H-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="lenker-kdh-E16">
                        <td className="align-middle text-center">Lenker</td>
                        <td className="text-center small-cell">KDH</td>
                        <td className="text-center small-cell">E16</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 5) value = '2';
                            else if (i === 13) value = '3';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="sattel-kdh-E17">
                        <td className="align-middle text-center">Sattel</td>
                        <td className="text-center small-cell">KDH</td>
                        <td className="text-center small-cell">E17</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 14) value = '3';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="rahmen-k-E18">
                        <td rowSpan={3} className="align-middle text-center">Rahmen</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E18</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 5) value = '3';
                            else if (i === 6) value = '2';
                            else if (i === 7) value = '3';
                            else if (i === 8) value = '2';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="rahmen-d-E19">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E19</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 5) value = '3';
                            else if (i === 6) value = '2';
                            else if (i === 7) value = '3';
                            else if (i === 8) value = '2';

                            return (
                                <>
                                <td key={`D-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`D-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="rahmen-h-E20">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E20</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 5) value = '3';
                            else if (i === 6) value = '2';
                            else if (i === 7) value = '3';
                            else if (i === 8) value = '2';

                            return (
                                <>
                                <td key={`H-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`H-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="pedale-kdh-E26">
                        <td className="align-middle text-center">Pedale</td>
                        <td className="text-center small-cell">KDH</td>
                        <td className="text-center small-cell">E26</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 6) value = '2';
                            else if (i === 14) value = '3';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="vorderrad_k-k-E49">
                        <td rowSpan={3} className="align-middle text-center">Vorderrad komplett (cpl)</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E49</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 0) value = '6';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="vorderrad_k-d-E54">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E54</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 0) value = '6';

                            return (
                                <>
                                <td key={`D-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`D-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="vorderrad_k-h-E29">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E29</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 0) value = '6';

                            return (
                                <>
                                <td key={`H-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`H-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="rahm_u_räd-k-E50">
                        <td rowSpan={3} className="align-middle text-center">Rahmen und Räder</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E50</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 1) value = '5';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="rahm_u_räd-d-E55">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E55</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 1) value = '5';

                            return (
                                <>
                                <td key={`D-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`D-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="rahm_u_räd-h-E30">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E30</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 1) value = '5';

                            return (
                                <>
                                <td key={`H-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`H-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="fahrr_o_peda-k-E51">
                        <td rowSpan={3} className="align-middle text-center">Fahrrad ohne Pedale</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">E51</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 2) value = '5';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="fahrr_o_peda-d-E56">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">E56</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 2) value = '6';

                            return (
                                <>
                                <td key={`D-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`D-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="fahrr_o_peda-h-E31">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">E31</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 2) value = '6';

                            return (
                                <>
                                <td key={`H-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`H-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="fahrr_komplett-k-P1">
                        <td rowSpan={3} className="align-middle text-center">Fahrrad komplett (cpl)</td>
                        <td className="text-center small-cell">K</td>
                        <td className="text-center small-cell">P1</td>
                        <td className="text-center small-cell">200</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 3) value = '6';

                            return (
                                <>
                                <td key={`K-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`K-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="fahrr_komplett-d-P2">
                        <td className="text-center small-cell">D</td>
                        <td className="text-center small-cell">P2</td>
                        <td className="text-center small-cell">100</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 3) value = '7';

                            return (
                                <>
                                <td key={`D-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`D-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="fahrr_komplett-h-P3">
                        <td className="text-center small-cell">H</td>
                        <td className="text-center small-cell">P3</td>
                        <td className="text-center small-cell">220</td>
                        {Array.from({ length: 15 }, (_, i) => {
                            let value = '';
                            if (i === 3) value = '7';

                            return (
                                <>
                                <td key={`H-${i}-1`} className="text-center small-cell border-end">{value}</td>
                                <td key={`H-${i}-2`} className="text-center small-cell"></td>
                                </>
                            );
                        })}
                    </tr>
                    <tr id="kapabedarf_neu" className="label-fett">
                        <td colSpan={4} className="align-middle text-center">Kapazitätsbedarf(neu) </td>
                        {Array.from({ length: 15 }, (_, i) => (
                            <td colSpan={2} key={`gesamt-${i}`} className="text-center small-cell">
                                {kapaBedarf[i] ?? ''}
                            </td>
                        ))}
                    </tr>
                    <tr id="rüstzeit_neu" className="label-fett">
                        <td colSpan={4} className="align-middle text-center">Rüstzeit(neu) </td>
                        {Array.from({ length: 15 }, (_, i) => (
                            <td colSpan={2} key={`gesamt-${i}`} className="text-center small-cell">
                                {rüstzeit[i] ?? ''}
                            </td>
                        ))}
                    </tr>
                    <tr id="rücks_kapaBedarf_neu" className="label-fett">
                        <td colSpan={4} className="align-middle text-center"> Kap.bed. (Rückstand Vorperiode)</td>
                        {Array.from({ length: 15 }, (_, i) => (
                            <td colSpan={2} key={`gesamt-${i}`} className="text-center small-cell">
                                {/* {rüstzeit[i] ?? ''} */}
                            </td>
                        ))}
                    </tr>
                    <tr id="rücks_rüstzeit" className="label-fett">
                        <td colSpan={4} className="align-middle text-center">Rüstzeit (Rückstand Vorperiode)</td>
                        {Array.from({ length: 15 }, (_, i) => (
                            <td colSpan={2} key={`gesamt-${i}`} className="text-center small-cell">
                                {/* {rüstzeit[i] ?? ''} */}
                            </td>
                        ))}
                    </tr>
                    <tr id="gesamt_kapabedarf" className="label-fett">
                        <td colSpan={4} className="align-middle text-center"> Gesamt-Kapzitätsbedarf </td>
                        {Array.from({ length: 15 }, (_, i) => (
                            <td colSpan={2} key={`gesamt-${i}`} className="text-center small-cell">
                                {gesKapaBedarf[i] ?? ''}
                            </td>
                        ))}
                    </tr>
                    <tr id="schicht_u_überst" className="label-fett">
                        <td colSpan={4} className="align-middle text-center">Schichten und Überstunden</td>
                        {Array.from({ length: 15 }, (_, i) => (
                            <td colSpan={2} key={`gesamt-${i}`} className="text-center small-cell">
                                {schichtÜberstund[i] ?? ''}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </Table>



            
        </div>
    );
}
