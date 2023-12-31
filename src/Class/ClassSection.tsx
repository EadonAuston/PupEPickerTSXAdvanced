// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { DogData } from "../types";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

type ClassSectionProps = {
  filterDogData: (cb: (item: DogData) => {}) => Promise<void>;
  creatingADog: boolean;
  setCreatingADog: (inputValue: boolean) => void;
  setWhatToFilter: (inputValue: string) => void;
  dogData: DogData[];
  updatePage: () => Promise<void>;
  favoritedAmt: number;
  unfavoritedAmt: number;
  whatToFilter: string;
};

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const {
      filterDogData,
      creatingADog,
      setCreatingADog,
      setWhatToFilter,
      dogData,
      updatePage,
      favoritedAmt,
      unfavoritedAmt,
      whatToFilter,
    } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
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
              unfavorited ( {unfavoritedAmt} )
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
            <ClassDogs dogData={dogData} updatePage={updatePage} />
          ) : (
            <ClassCreateDogForm updatePage={updatePage} />
          )}
        </div>
      </section>
    );
  }
}
