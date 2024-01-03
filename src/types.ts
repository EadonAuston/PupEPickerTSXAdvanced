// Add your own custom types in here
export type DogData = {
  id: number;
  image: string;
  description: string;
  isFavorite: boolean;
  name: string;
};

export type WhatToFilter =
  | "favorite"
  | "unfavorite"
  | "create-dog"
  | "non-selected";
