import React from 'react';
import { Pet as PetType } from "./APIResponseTypes";
import Pet from "./Pet";
import styled from "styled-components";

const PetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const PetResults = ({ pets }: { pets: PetType[] }) => {
  return (
    <PetContainer>
      {!pets.length ? (
        <div>No pets found!</div>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            id={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            location={`${pet.city}, ${pet.state}`}
            images={pet.images}
          />
        ))
      )}
    </PetContainer>
  );
};

export default PetResults;
