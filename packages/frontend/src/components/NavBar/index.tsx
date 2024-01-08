import { Link } from "react-router-dom";
import "./styles.scss";

const NavBar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="navbar__section">
          <img src="src/assets/img/USD-logo.svg" alt="USD logo" />
        </div>
        <div className="navbar__section">
          <h1>Intelligent Target Locator</h1>
        </div>
        <div className="navbar__section">
          <ul>
            <li>
              <Link to="/about">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
