import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./styles.css";
import styled from "styled-components";
import AdoptedPetContext from "./AdoptedPetContext";
import { Animal } from "./APIResponseTypes";
import PetResults from "./PetResults";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledPetContainer = styled.div`
  width: 200px;
  height: 100px;
`;

const StyledForm = styled.form`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 500px;
  height: 300px;
  border: 1px solid black;
`;

const StyledInput = styled.input`
  length: 100dvw;
  width: 50dvh;
  padding: 10px;
`;

const StyledSelect = styled.select`
  length: 100dvw;
  width: 50dvh;
  padding: 10px;
`;

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const AnimalForm = () => {
  const [requestParams, setRequestParams] = useState({
    animal: "",
    breed: "",
    location: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("" as Animal);

  const BreedsResults = useQuery({
    queryKey: ["breeds", animal],
    queryFn: async () => {
      const res = await fetch(
        `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const data = await res.json();
      return data;
    },
  });
  const breeds = BreedsResults?.data?.breeds ?? [];
  const SearchResults = useQuery({
    queryKey: ["search", requestParams],
    queryFn: async () => {
      const res = await fetch(
        `https://pets-v2.dev-apis.com/pets?animal=${requestParams.animal}&location=${requestParams.location}&breed=${requestParams.breed}`
      );
      const data = await res.json();
      return data;
    },
  });
  const pets = SearchResults?.data?.pets ?? [];

  return (
    <StyledContainer>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const objData = {
            animal: formData.get("animal")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          setRequestParams(objData);
        }}
      >
        {adoptedPet ? (
          <StyledPetContainer>
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </StyledPetContainer>
        ) : null}
        <StyledInput
          id="location"
          name="location"
          placeholder="Enter the Location"
        />
        <StyledSelect
          id="animal"
          name="animal"
          value={animal}
          onChange={(e) => setAnimal(e.target.value as Animal)}
          onBlur={(e) => setAnimal(e.target.value as Animal)}
        >
          <option defaultValue="Select an Animal">Select an Animal</option>
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect id="breed" name="breed" disabled={!breeds.length}>
          <option value="" disabled>
            Select a Breed
          </option>
          {breeds.length ? (
            breeds.map((breed: string) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))
          ) : (
            <option>No breeds found</option>
          )}
        </StyledSelect>
        <button type="submit">Submit</button>
      </StyledForm>
      <PetResults pets={pets} />
    </StyledContainer>
  );
};

export default AnimalForm;
