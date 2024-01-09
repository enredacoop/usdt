import Form from "../../components/Form";
import "./styles.scss";
import itlImg from "../../assets/img/ITL-hero.svg";
import amicoImg from "../../assets/img/amico.svg";
import upoImg from "../../assets/img/upo.png";
import vilniausImg from "../../assets/img/vilniaus.jpeg";
import savoniaImg from "../../assets/img/savonia.png";
import openodsImg from "../../assets/img/openods.jpeg";

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
              Lorem ipsum dolor sit amet consectetur. Elementum quis massa
              auctor lectus pharetra ullamcorper maecenas vitae. Arcu tincidunt
              gravida quis ornare montes ut dictum quis. Tortor viverra
              ultricies ut eu. Amet ut in aliquam commodo scelerisque. Dictum
              volutpat pellentesque integer enim placerat faucibus sagittis
              phasellus euismod. Tellus pretium blandit viverra malesuada
              molestie euismod. Dapibus feugiat aliquet morbi amet ut non
              facilisis feugiat. Mauris vulputate egestas lorem praesent.
            </p>
            <p>
              Integer donec rhoncus massa ornare lectus adipiscing quis neque
              mauris. Sed amet lacus sed velit dictum luctus et. Ut etiam
              faucibus sed ipsum risus neque aliquet amet mattis. Quis enim duis
              ac tempor. Donec ac quis egestas vitae ut commodo. Sed egestas
              vitae a id amet et ut facilisis. Varius scelerisque et erat et
              hendrerit odio dui non. Cras integer commodo donec lectus risus
              nibh morbi pharetra. Sociis pulvinar viverra posuere eu mattis et
              id sed. Nisl dolor mattis molestie egestas turpis in dictum turpis
              sit.
            </p>
            <p>
              Consequat feugiat amet rutrum aenean commodo lacus rutrum. Auctor
              sed nunc et mollis. Vel in odio in dictumst eget adipiscing
              commodo lacus orci. Morbi egestas cras sed pretium mi.
              Pellentesque sem congue in velit nec ut. In tellus eu consectetur
              sagittis viverra nulla sed ultrices. At id dignissim in magna
              imperdiet at augue et. In dictum scelerisque fringilla dis orci
              duis. Proin faucibus quis in ut mi sollicitudin sem. Vitae sit
              massa fermentum quis donec proin in. Augue leo quam quam ut
              aliquam tempor tellus risus elit. Nunc in condimentum eget mi quis
              commodo quisque et lectus. Phasellus turpis bibendum pulvinar.
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
