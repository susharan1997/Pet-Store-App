import React, { createContext } from "react";
import { Pet } from "./APIResponseTypes";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet | null) => void]
>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    description: "Lorem ipsum",
    breed: "Beagle",
    images: [],
    city: "Seattle",
    state: "WA"
  },
  () => {}
]);

export default AdoptedPetContext;
