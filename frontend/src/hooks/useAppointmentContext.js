import { AppointmentsContext } from "../context/AppointmentContext";
import { useContext } from "react";

export const useAppointmentsContext = () => {
  const context = useContext(AppointmentsContext);

  if (!context) {
    throw new Error('useAppointmentsContext must be used inside an AppointmentsContextProvider');
  }

  return context;
};
