import { Component, Dispatch, SetStateAction } from "react";
import { ClassSection } from "./ClassSection";
import { Requests } from "../api";

export class ClassApp extends Component {
  state = {
    dogData: [],
    whatToFilter: "",
    filteredDogData: [],
    creatingADog: false,
    favoritedAmt: 0,
    unfavoritedAmt: 0,
  };

  fetchData = async () => {
    try {
      const data = await Requests.getAllDogs();
      this.setState({
        favoritedAmt: data.filter((dog) => dog.isFavorite === true).length,
        unfavoritedAmt: data.filter((dog) => dog.isFavorite === false).length,
        dogData: data,
      });

      if (this.state.whatToFilter === "favorite") {
        this.setState({
          filteredDogData: data.filter((dog) => dog.isFavorite === true),
        });
      } else if (this.state.whatToFilter === "unfavorite") {
        this.setState({
          filteredDogData: data.filter((dog) => dog.isFavorite === false),
        });
      } else {
        this.setState({ filteredDogData: data });
      }
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  filterDogData = async (cb: () => {}) => {
    const data = await Requests.getAllDogs();
    this.setState({ filteredDogData: data.filter(cb) });
  };

  setCreatingADog = (inputValue: boolean) => {
    this.setState({ creatingADog: inputValue });
  };

  setWhatToFilter = (inputValue: string) => {
    this.setState({ whatToFilter: inputValue });
  };

  render() {
    const {
      dogData,
      whatToFilter,
      filteredDogData,
      creatingADog,
      favoritedAmt,
      unfavoritedAmt,
    } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favoritedAmt={favoritedAmt}
          unfavoritedAmt={unfavoritedAmt}
          filterDogData={this.filterDogData}
          creatingADog={creatingADog}
          setCreatingADog={this.setCreatingADog}
          setWhatToFilter={this.setWhatToFilter}
          dogData={filteredDogData}
          updatePage={this.fetchData}
          whatToFilter={whatToFilter}
        />
      </div>
    );
  }
}
