import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import PetModal from "./PetModal";
import FetchPet from "./FetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

export const PetDetails = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("No ID present in the details!");
  }

  const [petModal, setPetModal] = useState<boolean>(false);
  console.log(petModal, "PET MODAL");
  const navigate = useNavigate();
  const Result = useQuery({
    queryKey: ["details", id],
    queryFn: FetchPet,
  });
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (Result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const pet = Result?.data?.pets[0];
  if (!pet) {
    throw new Error("Pet not found!");
  }
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h2>{pet.name}</h2>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}</h2>
        <button onClick={() => setPetModal(true)}>{`Adopt ${pet.name}`}</button>
        <h3>{pet.description}</h3>
        {petModal ? (
          <PetModal>
            <div>
              <h2>{`Do you want to adopt ${pet.name} ?`}</h2>
              <div>
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setPetModal(false)}>No</button>
              </div>
            </div>
          </PetModal>
        ) : null}
      </div>
    </div>
  );
};

export default function PetDetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <PetDetails />
    </ErrorBoundary>
  );
}
