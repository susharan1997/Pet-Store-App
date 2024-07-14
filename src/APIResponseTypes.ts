export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export type Pet = {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
};

export type PetAPIResponse = {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
};

export type breedListAPIResponse = {
  animal: Animal;
  breeds: string[];
};
