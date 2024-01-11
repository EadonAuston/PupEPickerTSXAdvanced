import { DogCard } from "../Shared/DogCard";
import { useDogData } from "../Providers/DogDataProvider";

export const FunctionalDogs = () => {
  const {
    handleEmptyHeartClick,
    handleHeartClick,
    handleTrashIconClick,
    filteredDogData,
  } = useDogData();

  return (
    <div className="content-container">
      {filteredDogData.map((dog) => (
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
  );
};
