import { DogData } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async (): Promise<DogData[]> => {
    try {
      const response = await fetch("http://localhost:3000/dogs", {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching all dogs:", error);
      throw error; // You might want to handle the error or throw it further up the chain
    }
  },

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async ({
    name,
    description,
    image,
    isFavorite,
  }: {
    name: string;
    description: string;
    image: string;
    isFavorite: boolean;
  }) => {
    try {
      const response = await fetch("http://localhost:3000/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          image,
          isFavorite,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating dog:", error);
      throw error;
    }
  },

  // should delete a dog from the database
  deleteDog: async (index: number) => {
    try {
      const response = await fetch(`http://localhost:3000/dogs/${index}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error deleting dog:", error);
      throw error;
    }
  },

  updateDog: async (dogId: number, updatedData: object) => {
    const url = `http://localhost:3000/dogs/${dogId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error updating dog:", error);
      throw error;
    }
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
