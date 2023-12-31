import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { filter } from "lodash-es";

export function FunctionalApp() {
  const [dogData, setDogData] = useState<[]>([]);
  const [whatToFilter, setWhatToFilter] = useState<string>("");
  const [filteredDogData, setFilteredDogData] = useState<[]>([]);
  const [creatingADog, setCreatingADog] = useState<boolean>(false);
  const [favoritedAmt, setFavoritedAmt] = useState<number>(0);
  const [unfavoritedAmt, setUnfavoritedAmt] = useState<number>(0);

  const fetchData = async () => {
    try {
      const data = await Requests.getAllDogs();
      setFavoritedAmt(
        [...data].filter((dog) => dog.isFavorite === true).length
      );
      setUnfavoritedAmt(
        [...data].filter((dog) => dog.isFavorite === false).length
      );
      setDogData(data);
      if (whatToFilter === "favorite") {
        setFilteredDogData(data.filter((dog) => dog.isFavorite === true));
      } else if (whatToFilter === "unfavorite") {
        setFilteredDogData(data.filter((dog) => dog.isFavorite === false));
      } else {
        setFilteredDogData(data);
      }
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filterDogData = async (cb: () => {}) => {
    const data = await Requests.getAllDogs();
    setFilteredDogData(data.filter(cb));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        favoritedAmt={favoritedAmt}
        unfavoritedAmt={unfavoritedAmt}
        filterDogData={filterDogData}
        creatingADog={creatingADog}
        setCreatingADog={setCreatingADog}
        setWhatToFilter={setWhatToFilter}
        dogData={filteredDogData}
        updatePage={fetchData}
        whatToFilter={whatToFilter}
      />
    </div>
  );
}
