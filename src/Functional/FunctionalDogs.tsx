import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { DogData } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogData,
  fetchData,
}: {
  dogData: DogData[];
  fetchData: () => Promise<void>;
}) => {
  const handleTrashIconClick = async (dogId: number) => {
    await Requests.deleteDog(dogId);
    await fetchData();
  };

  const handleHeartClick = async (dogId: number) => {
    await Requests.updateDog(dogId, { isFavorite: false });
    await fetchData();
  };

  const handleEmptyHeartClick = async (dogId: number) => {
    await Requests.updateDog(dogId, { isFavorite: true });
    await fetchData();
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
            isLoading={false}
          />
        ))}
      </div>
    </>
  );
};
