import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <a className="navbar-brand mx-3" href="/">SupplyChainManagement</a>

      <div className="d-flex">
        <a className="navbar-item text-decoration-none text-dark px-1" href="/Minutenplanung">Minutenplanung</a>
        <a className="navbar-item text-decoration-none text-dark px-1" href="/Produktionsplanung">Produktionsplanung</a>
      </div>
    </nav>
  );
}
