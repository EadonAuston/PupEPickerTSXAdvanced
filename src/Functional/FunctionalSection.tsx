import { Link } from "react-router-dom";
import { useDogData } from "../Providers/DogDataProvider";
import { WhatToFilter } from "../types";
import { ReactNode } from "react";

export const FunctionalSection = ({ children }: { children: ReactNode }) => {
  const { setWhatToFilter, whatToFilter, favoritedAmt, unfavoritedAmt } =
    useDogData();

  const toggleWhatToFilter = (input: WhatToFilter) => {
    if (input === whatToFilter) setWhatToFilter("non-selected");
    else setWhatToFilter(input);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${
              whatToFilter === "favorite" ? "active" : ""
            }`}
            onClick={() => {
              toggleWhatToFilter("favorite");
            }}>
            favorited ( {favoritedAmt} )
          </div>

          <div
            className={`selector ${
              whatToFilter === "unfavorite" ? "active" : ""
            }`}
            onClick={() => {
              toggleWhatToFilter("unfavorite");
            }}>
            unfavorited ( {unfavoritedAmt} )
          </div>
          <div
            className={`selector ${
              whatToFilter === "create-dog" ? "active" : ""
            }`}
            onClick={() => {
              toggleWhatToFilter("create-dog");
            }}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
