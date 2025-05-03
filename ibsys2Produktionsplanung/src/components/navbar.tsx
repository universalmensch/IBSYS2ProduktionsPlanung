import { Link } from 'react-router-dom'; // <-- import Link
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <Link className="navbar-brand mx-3" to="/">SupplyChainManagement</Link>

      <div className="d-flex">
        <Link className="navbar-item text-decoration-none text-dark px-1" to="/Produktionsplanung">Produktionsplanung</Link>
        <Link className="navbar-item text-decoration-none text-dark px-1" to="/Minutenplanung">Minutenplanung</Link>
        <Link className="navbar-item text-decoration-none text-dark px-1" to="/KaufteilDisposition">KaufteilDisposition</Link>
      </div>
    </nav>
  );
}
