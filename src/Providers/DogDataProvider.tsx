import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DogData, WhatToFilter } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type DogDataContextValue = {
  allDogs: DogData[];
  setAllDogs: React.Dispatch<React.SetStateAction<DogData[]>>;
  whatToFilter: WhatToFilter;
  setWhatToFilter: React.Dispatch<React.SetStateAction<WhatToFilter>>;
  fetchData: () => Promise<void>;
  favoritedAmt: number;
  unfavoritedAmt: number;
  filteredDogData: DogData[];
  handleEmptyHeartClick: (dogId: number) => void;
  handleHeartClick: (dogId: number) => void;
  handleTrashIconClick: (dogId: number) => void;
  postDog: (
    name: string,
    description: string,
    image: string,
    isFavorite: boolean
  ) => Promise<unknown>;
};

const DogDataContext = createContext<DogDataContextValue>(
  {} as DogDataContextValue
);

export const DogDataProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<DogData[]>([]);
  const [whatToFilter, setWhatToFilter] =
    useState<WhatToFilter>("non-selected");

  const favoritedAmt = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedAmt = allDogs.filter((dog) => !dog.isFavorite).length;

  const fetchData = () => Requests.getAllDogs().then(setAllDogs);

  useEffect(() => {
    fetchData().catch(() => {
      toast.error("Failed to fetch the dogs");
    });
  }, []);

  const filteredDogData = (() => {
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
  })();

  const handleTrashIconClick = (dogId: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogId));
    return Requests.deleteDog(dogId).catch(() => {
      setAllDogs(allDogs);
    });
  };

  const handleHeartClick = (dogId: number) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: false } : dog
      )
    );
    return Requests.updateDog(dogId, { isFavorite: false }).catch(() => {
      setAllDogs(allDogs);
    });
  };

  const handleEmptyHeartClick = async (dogId: number) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: true } : dog
      )
    );
    return Requests.updateDog(dogId, { isFavorite: true }).catch(() => {
      setAllDogs(allDogs);
    });
  };
  const postDog = (
    name: string,
    description: string,
    image: string,
    isFavorite: boolean
  ) => Requests.postDog({ name, description, image, isFavorite });

  return (
    <DogDataContext.Provider
      value={{
        allDogs,
        setAllDogs,
        whatToFilter,
        setWhatToFilter,
        fetchData,
        favoritedAmt,
        unfavoritedAmt,
        postDog,
        filteredDogData,
        handleEmptyHeartClick,
        handleHeartClick,
        handleTrashIconClick,
      }}>
      {children}
    </DogDataContext.Provider>
  );
};

export const useDogData = () => useContext(DogDataContext);
