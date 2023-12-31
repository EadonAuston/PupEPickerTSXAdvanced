// you can use this type for react children if you so choose
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { update } from "lodash-es";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { DogData } from "../types";

export const FunctionalSection = ({
  filterDogData,
  creatingADog,
  setCreatingADog,
  setWhatToFilter,
  dogData,
  updatePage,
  favoritedAmt,
  unfavoritedAmt,
  whatToFilter,
}: {
  filterDogData: (cb: (item: DogData) => {}) => Promise<void>;
  creatingADog: boolean;
  setCreatingADog: React.Dispatch<React.SetStateAction<boolean>>;
  setWhatToFilter: React.Dispatch<React.SetStateAction<string>>;
  dogData: DogData[];
  updatePage: () => Promise<void>;
  favoritedAmt: number;
  unfavoritedAmt: number;
  whatToFilter: string;
}) => {
  const [updateUnfavoriteAmt, setUpdateUnfavoriteAmt] = useState(0);
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
              setCreatingADog(false);
              if (whatToFilter === "favorite") {
                filterDogData((dog) => dog);
                setWhatToFilter("");
              } else {
                filterDogData((dog) => dog.isFavorite === true);

                setWhatToFilter("favorite");
              }
            }}>
            favorited ( {favoritedAmt} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              whatToFilter === "unfavorite" ? "active" : ""
            }`}
            onClick={() => {
              setCreatingADog(false);
              if (whatToFilter === "unfavorite") {
                filterDogData((dog) => dog);
                setWhatToFilter("");
              } else {
                filterDogData((dog) => dog.isFavorite === false);
                setWhatToFilter("unfavorite");
              }
            }}>
            unfavorited ( {unfavoritedAmt + updateUnfavoriteAmt} )
          </div>
          <div
            className={`selector ${
              whatToFilter === "createdog" ? "active" : ""
            }`}
            onClick={() => {
              if (creatingADog) {
                setCreatingADog(false);
                setWhatToFilter("");
                filterDogData((dog) => dog);
              } else {
                setCreatingADog(true);
                setWhatToFilter("createdog");
              }
            }}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {!creatingADog ? (
          <FunctionalDogs dogData={dogData} updatePage={updatePage} />
        ) : (
          <FunctionalCreateDogForm updatePage={updatePage} />
        )}
      </div>
    </section>
  );
};
