import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { DogData, WhatToFilter } from "../types";

export const FunctionalSection = ({
  allDogs,
  fetchData,
  whatToFilter,
  setWhatToFilter,
}: {
  allDogs: DogData[];
  fetchData: () => Promise<void>;
  whatToFilter: WhatToFilter;
  setWhatToFilter: React.Dispatch<React.SetStateAction<WhatToFilter>>;
}) => {
  const favoritedAmt = [...allDogs].filter((dog) => dog.isFavorite).length;
  const unfavoritedAmt = [...allDogs].filter((dog) => !dog.isFavorite).length;

  function dogDataToShow() {
    switch (whatToFilter) {
      case "favorite":
        return [...allDogs].filter((dog) => dog.isFavorite);
      case "unfavorite":
        return [...allDogs].filter((dog) => !dog.isFavorite);
      case "non-selected":
        return [...allDogs].filter((dog) => dog);
      default:
        return [];
    }
  }

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              whatToFilter === "favorite" ? "active" : ""
            }`}
            onClick={() => {
              whatToFilter === "favorite"
                ? setWhatToFilter("non-selected")
                : setWhatToFilter("favorite");
            }}>
            favorited ( {favoritedAmt} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              whatToFilter === "unfavorite" ? "active" : ""
            }`}
            onClick={() => {
              whatToFilter === "unfavorite"
                ? setWhatToFilter("non-selected")
                : setWhatToFilter("unfavorite");
            }}>
            unfavorited ( {unfavoritedAmt} )
          </div>
          <div
            className={`selector ${
              whatToFilter === "create-dog" ? "active" : ""
            }`}
            onClick={() => {
              whatToFilter === "create-dog"
                ? setWhatToFilter("non-selected")
                : setWhatToFilter("create-dog");
            }}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {whatToFilter !== "create-dog" ? (
          <FunctionalDogs dogData={dogDataToShow()} fetchData={fetchData} />
        ) : (
          <FunctionalCreateDogForm fetchData={fetchData} />
        )}
      </div>
    </section>
  );
};
