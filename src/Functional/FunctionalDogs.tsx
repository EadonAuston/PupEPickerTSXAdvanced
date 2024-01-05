import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { useDogData } from "../Providers/DogDataProvider";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = () => {
  const { allDogs, whatToFilter, setAllDogs } = useDogData();
  const [isLoading] = useState(false);

  function dogDataToShow() {
    switch (whatToFilter) {
      case "favorite":
        return allDogs.filter((dog) => dog.isFavorite);
      case "unfavorite":
        return allDogs.filter((dog) => !dog.isFavorite);
      case "non-selected":
        return allDogs;
      default:
        return [];
    }
  }

  const handleTrashIconClick = (dogId: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogId));
    Requests.deleteDog(dogId).catch(() => {
      setAllDogs(allDogs);
    });
  };

  const handleHeartClick = (dogId: number) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: false } : dog
      )
    );

    Requests.updateDog(dogId, { isFavorite: false }).catch(() => {
      setAllDogs(allDogs);
    });
  };

  const handleEmptyHeartClick = async (dogId: number) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: true } : dog
      )
    );

    Requests.updateDog(dogId, { isFavorite: true }).catch(() => {
      setAllDogs(allDogs);
    });
  };

  return (
    <>
      <div className="content-container">
        {dogDataToShow().map((dog) => (
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
};
