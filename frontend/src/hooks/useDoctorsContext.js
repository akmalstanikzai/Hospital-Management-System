import { DoctorsContext } from "../context/DoctorsContext";
import { useContext } from "react";

export const useDoctorsContext = () => {
  const context = useContext(DoctorsContext);

  if (!context) {
    throw new Error('useDoctorsContext must be used inside a DoctorsContextProvider');
  }

  return context;
};
