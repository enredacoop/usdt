/* eslint-disable */

import { Link, useParams } from "react-router-dom";
import "./styles.scss";
import Chart from "../../components/Chart";
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
import { useEffect, useState } from "react";
import { useApiService } from "../../hooks/useApiService";
import { UUID } from "crypto";
import Bars from "../../components/Bars";
import BarsDouble from "../../components/BarsDouble";
import {
  AbsoluteValue,
  AffinityValues,
  RelativeValue,
} from "../../services/ApiService";

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
  const apiService = useApiService();
  const { uuid } = useParams();
  const [formattedResults, setFormattedResults] = useState<{
    sortedSdgList: any[];
    affinityObj: any;
  }>();
  const [relativeValues, setRelativeValues] = useState<RelativeValue[]>([]);
  const [absoluteValues, setAbsoluteValues] = useState<AbsoluteValue[]>([]);
  const [documentName, setDocumentName] = useState("");

  function formatAffinityValues(affinityValues: AffinityValues[]) {
    let sortedAffinity: any[] = [];
    for (let sdg = 1; sdg <= 17; sdg++) {
      let sdgTargets = affinityValues
        .filter(
          (obj) => obj.name.startsWith(`${sdg.toString()}.`) && obj.value > 0
        )
        .map((t) => {
          return { name: t.name, value: t.value };
        });

      if (sdgTargets.length > 0)
        sortedAffinity.push({
          name: sdg.toString(),
          children: [...sdgTargets],
        });
    }

    let sdgList: any[] = [];

    sortedAffinity.forEach((item) =>
      sdgList.push({
        name: item.name,
        value: item.children.reduce(
          (acc, curr) => parseFloat((acc + curr.value).toFixed(2)),
          0
        ),
      })
    );

    let sortedSdgList = sdgList.sort((a, b) => b.value - a.value);

    const affinityObj = {
      name: "sdg",
      children: sortedAffinity,
    };

    return { sortedSdgList, affinityObj };
  }

  const downloadData = async (e) => {
    e.preventDefault();
    await apiService.downloadData(uuid as UUID);
  };

  useEffect(() => {
    async function loadResults() {
      try {
        const { documentName, affinityValues, relativeValues, absoluteValues } =
          await apiService.fetchResults(uuid as UUID);

        const formattedResults = formatAffinityValues(affinityValues);
        setDocumentName(documentName);
        setFormattedResults(formattedResults);
        setRelativeValues(relativeValues);
        setAbsoluteValues(absoluteValues);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }
    loadResults();
  }, []);

  return (
    <>
      <div className="subheader">
        <div className="back">
          <Link to="/">Scan another document</Link>
        </div>
        <div className="download">
          <Link
            onClick={(e) => {
              downloadData(e);
            }}
            to={""}
          >
            Download CSV data
          </Link>
        </div>
      </div>
      <div className="heading">
        <h2>{documentName}</h2>
      </div>
      <div className="results">
        <div className="first-row">
          <div className="sdg-grid">
            <h3>SDG Detected</h3>
            <div className="sdg-grid__results">
              {formattedResults &&
                formattedResults.sortedSdgList.map((sdg) => {
                  return (
                    <div key={sdg.name} className="sdg-grid__results__item">
                      <img src={sdgObj[`sdg${sdg.name}`]} />
                      <span>{`${sdg.value} %`}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="sdg-chart">
            <h3>SDGs and targets detected</h3>
            {formattedResults && <Chart data={formattedResults.affinityObj} />}
          </div>
        </div>
        <div className="second-row">
          <Bars data={relativeValues} />
          <BarsDouble data={absoluteValues} />
        </div>
      </div>
    </>
  );
}
