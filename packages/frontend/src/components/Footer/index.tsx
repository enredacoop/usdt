import "./styles.scss";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <img src="src/assets/img/eu-funding.png" alt="" />
        <p>
          The cooperation project (2021-1-ES01-KA220-HED-000029950) has been
          funded with support from the European Commission. This website
          reflects the views only of the author, and the Commission cannot be
          held responsible for any use which may be made of the information
          contained therein.
        </p>
      </div>
      <div className="subfooter">
        <p>2024 © UPO | Diseñado y desarrollado por enreda.coop</p>
      </div>
    </>
  );
};

export default Footer;
