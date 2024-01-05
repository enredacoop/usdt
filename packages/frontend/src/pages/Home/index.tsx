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
          <div className="herosection__form__card"></div>
        </div>
      </div>
    </div>
  );
}
