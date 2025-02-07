import React, { useEffect, useRef, RefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

const PetModal = ({ children }: { children: ReactElement }) => {
  const modalRef: RefObject<HTMLDivElement | null> = useRef(null);
  if (!modalRef.current) {
    modalRef.current = document.createElement("div");
    console.log(modalRef.current, "CURRENT REF VALUE");
  }

  useEffect(() => {
    const modalRootElement = document.getElementById("modal");
    console.log(modalRootElement, "ROOT ELEMENT");
    if (!modalRootElement || !modalRef.current) return;

    modalRootElement.appendChild(modalRef.current);
    return () => {
      if (modalRef.current) {
        modalRootElement.removeChild(modalRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, modalRef.current);
};

export default PetModal;
