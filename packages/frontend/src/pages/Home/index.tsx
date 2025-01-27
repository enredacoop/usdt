import Form from "../../components/Form";
import "./styles.scss";
import itlImg from "../../assets/img/ITL-hero.svg";
import amicoImg from "../../assets/img/amico.svg";
import upoImg from "../../assets/img/upo.png";
import vilniausImg from "../../assets/img/vilniaus.jpeg";
import savoniaImg from "../../assets/img/savonia.png";
import openodsImg from "../../assets/img/openods.jpeg";
import table1 from "../../assets/img/table1.png";
import table2 from "../../assets/img/table2.png";

export default function Home() {
  return (
    <>
      <div className="herosection">
        <div className="herosection__wrapper">
          <div className="herosection__block">
            <h2 className="herosection__title">
              Scan your academic document and align it with the Sustainable
              Development Goals
            </h2>
            <img
              className="herosection__img"
              height={308.2}
              width={417.93}
              src={itlImg}
              alt="Intelligent Target Locator"
            />
          </div>
          <div className="herosection__form">
            <div className="herosection__form__card">
              <Form />
            </div>
          </div>
        </div>
      </div>
      <div className="infosection">
        <h2>What is Intelligent Target Locator?</h2>
        <div className="infosection__block">
          <img className="infosection__image" src={amicoImg} alt="" />
          <div className="infosection__content">
            <p>
            The &quot;Intelligent Target Locator: AI {2030}&quot; (ITL) is a data analytics tool
powered by AI that enables the recognition and assessment of the direct or
indirect relationship between any document and each of the 169 targets of the
17 SDGs. In this way, a cutting-edge tool is made available to higher education
institutions and third parties, allowing them to quantify the alignment of any
scenario (curriculum, course, project, publication, activity, etc.) with the 2030
Agenda..
            </p>
            <p>
            Through this portal, anyone can submit a document (PDF) to ITL for analysis,
            and within a few minutes, they will receive an email with the results report..
            </p>
            <p>
            ITL employs an innovative methodology developed by the DATA ANALYTICS
SCIENCE &amp; ENGINEERING research group (TIC 200) at the Universidad Pablo
de Olavide in Seville, Spain. This methodology combines various Machine
Learning techniques to quantify the affinity of the input text with each of the
SDG targets..
            </p>
            <h3>How to use?</h3>
            <p>
            <strong>Provide the Information</strong>
            <ol>
              <li>Specify the location on your computer where the document you want
              to analyze is stored.</li>
              <li>Enter the email address where you want to receive the link to the
              results.</li>
              <li>Provide the document title or any information that will help you
              identify the document when you receive the results.</li>
              <li>Accept the terms and conditions of use.</li>
              <li>Click the ”Send&quot; button.</li>
            </ol>
            <strong>Confirm Your Email</strong>
            <ol>
              <li>You will need to confirm the email address provided by entering the
              verification code sent to that same email address.</li>
              <li>Click &quot;Verify.&quot;</li>
            </ol>
            <strong>Receive the Results</strong>
            <ol>
              <li>You will receive an email with a link to the results</li>
              <li>Click on the link and you will see the results and download them.</li>
            </ol>
            </p>
            <h3>What results does it return?</h3>
            <p>
           <strong>Affinity</strong> is a numerical measure that quantifies the relationship between a text
and each target individually. It is based on the similarity of the words and
combinations of words that appear in the target texts and the documents being
analyzed. Affinity is, therefore, sensitive to the properties of the reference texts

(the targets, in this case), meaning there is no single reference affinity value
applicable to all targets; instead, each target has a specific objective affinity
value to be reached.
            </p>  
            <p>
            Thus, ITL provides three affinity values for the document with respect to each
target:
            <ul>
              <li>
              <strong>Absolute Affinity Value</strong>: The affinity value calculated by the tool for the
              reference target.
              </li>
              <li>
              <strong>Relative Affinity Value</strong>: The ratio of the absolute affinity value to the
reference affinity value. The closer this value is to 1, the greater the
affinity of the text with the specific target.
              </li>
<li><strong>Affinity Value</strong>: The percentage affinity value of the document for each
target. In other words, it identifies which targets are most related to the
document, regardless of the magnitude of the relationship.</li>
            </ul>
            </p> 
            <h3>Downloading numerical results</h3>
            <p>
            The tool provides two options to download the numerical results of the analysis:
              <ul>
                <li>
                Document Affinity: Returns a file (CSV) with the affinity values of the whole
                document for each target.
                </li>
              </ul>
              <img className="infosection__descriptionImage" src={table1} alt="Affinity values per target" />
              <ul><li>
              Affinity Table: Returns a file (CSV) with all the absolute affinity values for each
              goal and target for every sentence in the document.
              </li></ul>
              <img className="infosection__descriptionImage" src={table2} alt="Affinity values per target" />
            </p>
          </div>
        </div>
      </div>
      <div className="partnerssection">
        <h2>Partners</h2>
        <div className="partnerssection__block">
          <img
            src={upoImg}
            alt="Logo de Universidad Pablo Olavide"
            width={250}
            height={250}
          />
          <img
            src={vilniausImg}
            alt="Logo de Universidad de Vilniaus"
            width={250}
            height={250}
          />
          <img
            src={savoniaImg}
            alt="Logo de Universidad de Savonia"
            width={250}
            height={250}
          />
          <img
            src={openodsImg}
            alt="Logo de OpenODS"
            width={250}
            height={250}
          />
        </div>
      </div>
    </>
  );
}
