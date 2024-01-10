import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DogData, WhatToFilter } from "../types";
import { Requests } from "../api";

type DogDataContextValue = {
  allDogs: DogData[];
  setAllDogs: React.Dispatch<React.SetStateAction<DogData[]>>;
  whatToFilter: WhatToFilter;
  setWhatToFilter: React.Dispatch<React.SetStateAction<WhatToFilter>>;
  fetchData: () => Promise<void>;
  favoritedAmt: number;
  unfavoritedAmt: number;
  postDog: (
    name: string,
    description: string,
    image: string,
    isFavorite: boolean
  ) => Promise<any>;
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

  const fetchData = async () => {
    try {
      const data = await Requests.getAllDogs();
      setAllDogs(data);
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      }}>
      {children}
    </DogDataContext.Provider>
  );
};

export const useDogData = () => useContext(DogDataContext);
