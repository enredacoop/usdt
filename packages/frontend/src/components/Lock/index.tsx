import "./styles.scss";
import lockImg from "../../assets/img/lock.svg";

const Lock = () => {
  return (
    <div className="lock">
      <img src={lockImg} alt="" width={32} height={32} />
    </div>
  );
};

export default Lock;
