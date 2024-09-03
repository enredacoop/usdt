/* eslint-disable */

import { Link } from "react-router-dom";
import "./styles.scss";
import Chart from "../../components/Chart";
import { documentAffinity } from "./document_affinity";
import sdg1 from "../../assets/img/sdg/E-WEB-Goal-01.png";
import sdg2 from "../../assets/img/sdg/E-WEB-Goal-02.png";
import sdg3 from "../../assets/img/sdg/E-WEB-Goal-03.png";
import sdg4 from "../../assets/img/sdg/E-WEB-Goal-04.png";
import sdg5 from "../../assets/img/sdg/E-WEB-Goal-05.png";
import sdg6 from "../../assets/img/sdg/E-WEB-Goal-06.png";
import sdg7 from "../../assets/img/sdg/E-WEB-Goal-07.png";
import sdg8 from "../../assets/img/sdg/E-WEB-Goal-08.png";
import sdg9 from "../../assets/img/sdg/E-WEB-Goal-09.png";
import sdg10 from "../../assets/img/sdg/E-WEB-Goal-10.png";
import sdg11 from "../../assets/img/sdg/E-WEB-Goal-11.png";
import sdg12 from "../../assets/img/sdg/E-WEB-Goal-12.png";
import sdg13 from "../../assets/img/sdg/E-WEB-Goal-13.png";
import sdg14 from "../../assets/img/sdg/E-WEB-Goal-14.png";
import sdg15 from "../../assets/img/sdg/E-WEB-Goal-15.png";
import sdg16 from "../../assets/img/sdg/E-WEB-Goal-16.png";
import sdg17 from "../../assets/img/sdg/E-WEB-Goal-17.png";

const sdgObj = {
  sdg1,
  sdg2,
  sdg3,
  sdg4,
  sdg5,
  sdg6,
  sdg7,
  sdg8,
  sdg9,
  sdg10,
  sdg11,
  sdg12,
  sdg13,
  sdg14,
  sdg15,
  sdg16,
  sdg17,
};

export default function Results() {
  const affinity = documentAffinity;
  let sortedAffinity: any[] = [];
  for (let sdg = 1; sdg <= 17; sdg++) {
    let sdgTargets = affinity
      .filter((obj) => obj.id_target.startsWith(`${sdg.toString()}.`))
      .map((t) => ({ name: t.id_target, value: t.affinity_value }));
    sortedAffinity.push({
      name: sdg.toString(),
      children: [...sdgTargets],
    });
  }

  console.log("sortedAffinity");
  console.log(sortedAffinity);

  let sdgList: any[] = [];

  sortedAffinity.forEach((item) => sdgList.push(item.name));

  console.log(sdgList);

  const affinityObj = {
    name: "sdg",
    children: sortedAffinity,
  };

  return (
    <>
      <div className="subheader">
        <Link to="/">Scan another document</Link>
      </div>
      <div className="heading">
        <h2>Mi documento</h2>
      </div>
      <div className="results">
        <div className="first-row">
          <div className="sdg-grid">
            <h3>SDG Detected</h3>
            <div className="sdg-grid__results">
              {sdgList.map((sdg) => {
                return <img key={sdg} src={sdgObj[`sdg${sdg}`]} />;
              })}
            </div>
          </div>
          <div className="sdg-chart">
            <h3>SDGs and targets detected</h3>
            <Chart data={affinityObj} />
          </div>
        </div>
        <div className="second-row">
          <div className="sdg-bars">
            <h3>SDG percentages</h3>
          </div>
        </div>
      </div>
    </>
  );
}
