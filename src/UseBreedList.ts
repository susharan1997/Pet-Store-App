/*import { QueryStatus, useQuery } from "@tanstack/react-query";
import { Animal } from "./APIResponsesTypes";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal : Animal){
    const result = useQuery(["breeds", animal], fetchBreedList);
    return[result?.data?.breeds ?? [], result.status] as 
    [string[], QueryStatus];
}*/
