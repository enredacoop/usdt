import { Link } from "react-router-dom";
import "./styles.scss";

const NavBar = () => {
  return (
    <nav>
      <div className="navbar">
        <img src="src/assets/img/USD-logo.svg" alt="USD logo" />
        <h1>Intelligent Target Locator</h1>
        <ul>
          <li>
            <Link to="/about">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
