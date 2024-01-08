import Form from "../../components/Form";
import "./styles.scss";

export default function Home() {
  // const [users, setUsers] = useState<object[]>([]);
  // const apiService = useApiService();

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await apiService.fetchUsers();
  //     setUsers(fetchedUsers);
  //     console.log(fetchedUsers);
  //   };
  //   if (!users.length) fetchUsers();
  // }, [apiService]);

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
              src="src/assets/img/ITL-hero.svg"
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
          <img
            className="infosection__image"
            src="src/assets/img/amico.svg"
            alt=""
          />
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
            src="src/assets/img/upo.png"
            alt="Logo de Universidad Pablo Olavide"
            width={250}
            height={250}
          />
          <img
            src="src/assets/img/vilniaus.jpeg"
            alt="Logo de Universidad de Vilniaus"
            width={250}
            height={250}
          />
          <img
            src="src/assets/img/savonia.png"
            alt="Logo de Universidad de Savonia"
            width={250}
            height={250}
          />
          <img
            src="src/assets/img/openods.jpeg"
            alt="Logo de OpenODS"
            width={250}
            height={250}
          />
        </div>
      </div>
    </>
  );
}
