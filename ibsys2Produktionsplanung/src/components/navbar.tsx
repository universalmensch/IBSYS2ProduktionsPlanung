import { Link } from 'react-router-dom'; // <-- import Link
import 'bootstrap/dist/css/bootstrap.min.css';
import DownloadXmlButton from './fileoutput';
import { useGeneralStore } from '../helper/GeneralStoreContext';

export default function Navbar() {
  const {generalStore} = useGeneralStore()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <Link className="navbar-brand mx-3" to="/">SupplyChainManagement</Link>

      <div className="d-flex">
        <Link className="navbar-item text-decoration-none text-dark px-1" to="/Produktionsplanung">Produktionsplanung</Link>
        <Link className="navbar-item text-decoration-none text-dark px-1" to="/Minutenplanung">Minutenplanung</Link>
        <Link className="navbar-item text-decoration-none text-dark px-1" to="/KaufteilDisposition">KaufteilDisposition</Link>
        <DownloadXmlButton {...(generalStore?.output ?? undefined)} />
      </div>
    </nav>
  );
}
