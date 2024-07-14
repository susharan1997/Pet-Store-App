import { QueryFunction, useQuery } from "@tanstack/react-query";
import { breedListAPIResponse, Animal } from "./APIResponseTypes";

const fetchBreedList: QueryFunction<breedListAPIResponse, ["breeds", Animal]> =
  async function ({ queryKey }) {
    const animal = queryKey[1];
    if (!animal) {
      return [];
    }
    const Result = await fetch(
      `https://pets-v2.dev-apis.com/breeds?animal=${animal}`,
    );
    if (!Result.ok) {
      throw new Error(`No results found for ${animal}`);
    }
    return Result.json();
  };
export default fetchBreedList;
