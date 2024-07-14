import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponseTypes";

const FetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];
  const Result = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);
  if (!Result.ok) {
    throw new Error(`details/${id} Fetch not ok`);
  }
  return Result.json();
};

export default FetchPet;
