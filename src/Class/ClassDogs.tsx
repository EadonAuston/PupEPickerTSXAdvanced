import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { DogData } from "../types";

type ClassDogsProps = {
  dogData: DogData[];
  fetchData: () => Promise<void>;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps> {
  state = {
    isLoading: false,
  };
  render() {
    const { isLoading } = this.state;
    const { dogData, fetchData } = this.props;

    const handleTrashIconClick = async (dogId: number) => {
      this.setState({ isLoading: true });
      await Requests.deleteDog(dogId);
      await fetchData();
      this.setState({ isLoading: false });
    };

    const handleHeartClick = async (dogId: number) => {
      this.setState({ isLoading: true });
      await Requests.updateDog(dogId, { isFavorite: false });
      await fetchData();
      this.setState({ isLoading: false });
    };

    const handleEmptyHeartClick = async (dogId: number) => {
      this.setState({ isLoading: true });
      await Requests.updateDog(dogId, { isFavorite: true });
      await fetchData();
      this.setState({ isLoading: false });
    };

    return (
      <>
        <div className="content-container">
          {dogData.map((dog) => (
            <DogCard
              dog={{
                id: dog.id,
                image: dog.image,
                description: dog.description,
                isFavorite: dog.isFavorite,
                name: dog.name,
              }}
              key={dog.id}
              onTrashIconClick={() => handleTrashIconClick(dog.id)}
              onHeartClick={() => handleHeartClick(dog.id)}
              onEmptyHeartClick={() => handleEmptyHeartClick(dog.id)}
              isLoading={isLoading}
            />
          ))}
        </div>
      </>
    );
  }
}
