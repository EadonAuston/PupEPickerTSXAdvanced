import { DogDataProvider } from "../Providers/DogDataProvider";
import { useDogData } from "../Providers/DogDataProvider";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";

export function FunctionalApp() {
  const { whatToFilter } = useDogData();
  return (
    <>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
      </div>
      <DogDataProvider>
        <FunctionalSection>
          {whatToFilter !== "create-dog" ? (
            <FunctionalDogs />
          ) : (
            <FunctionalCreateDogForm />
          )}
        </FunctionalSection>
      </DogDataProvider>
    </>
  );
}
