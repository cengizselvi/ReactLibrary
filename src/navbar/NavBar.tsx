import { NavLink } from "react-router-dom";

function BasicExample() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-dark main-color py-3 ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          TEKNOKİTAP
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Ana Sayfa
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Kitap Ara
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="/admin">
                Admin Giriş
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#">
                Link3
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BasicExample;
