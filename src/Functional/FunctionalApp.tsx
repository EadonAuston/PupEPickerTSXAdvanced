import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { DogData, WhatToFilter } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<DogData[]>([]);
  const [whatToFilter, setWhatToFilter] =
    useState<WhatToFilter>("non-selected");

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

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        fetchData={fetchData}
        whatToFilter={whatToFilter}
        setWhatToFilter={setWhatToFilter}
      />
    </div>
  );
}
