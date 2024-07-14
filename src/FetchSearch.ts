import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponseTypes";

const FetchSearch: QueryFunction<
  PetAPIResponse,
  [
    "search",
    {
      animal: string;
      breed: string;
      location: string;
    },
  ]
> = async function ({ queryKey }) {
  const { animal, breed, location } = queryKey[1];
  const Result = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );
  if (!Result.ok) {
    throw new Error(`Search not found for ${animal}, ${breed}, ${location}`);
  }
  return Result.json();
};

export default FetchSearch;
