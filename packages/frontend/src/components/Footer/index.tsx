import "./styles.scss";
import footerImg from "../../assets/img/eu-funding.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="content">
          <img src={footerImg} alt="" />
          <p>
            The cooperation project (2021-1-ES01-KA220-HED-000029950) has been
            funded with support from the European Commission. This website
            reflects the views only of the author, and the Commission cannot be
            held responsible for any use which may be made of the information
            contained therein.
          </p>
        </div>
      </div>
      <div className="subfooter">
        <p>2024 © UPO | Diseñado y desarrollado por enreda.coop</p>
      </div>
    </>
  );
};

export default Footer;
