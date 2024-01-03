import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Requests } from "../api";
import { DogData, WhatToFilter } from "../types";

type ClassAppState = {
  allDogs: DogData[];
  whatToFilter: WhatToFilter;
};

export class ClassApp extends Component<{}, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    whatToFilter: "non-selected",
  };

  fetchData = async () => {
    try {
      const data = await Requests.getAllDogs();
      this.setState({ allDogs: data });
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  setWhatToFilter = (inputValue: WhatToFilter) => {
    this.setState({ whatToFilter: inputValue });
  };

  render() {
    const { allDogs, whatToFilter } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          fetchData={this.fetchData}
          whatToFilter={whatToFilter}
          setWhatToFilter={this.setWhatToFilter}
        />
      </div>
    );
  }
}
