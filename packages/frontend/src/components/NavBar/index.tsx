import { Link } from "react-router-dom";
import "./styles.scss";
import usdImg from "../../assets/img/USD-logo.svg";

const NavBar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="navbar__section">
          <img src={usdImg} alt="USD logo" />
        </div>
        <div className="navbar__section">
          <a href="/">
            <h1>Intelligent Target Locator</h1>
          </a>
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
