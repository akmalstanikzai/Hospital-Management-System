import React, { useEffect } from 'react';
import { useAppointmentsContext } from '../hooks/useAppointmentContext'; // Import the custom hook for AppointmentsContext
import { useAuthContext } from "../hooks/useAuthContext"


import AppointmentForm from "../components/AppointmentForm"

const Appointments = () => {
  const { dispatch } = useAppointmentsContext(); // Accessing appointments state and dispatch from AppointmentsContext
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments' , {
          headers: {'Authorization': `Bearer ${user.token}`},
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        dispatch({ type: 'SET_APPOINTMENTS', payload: json }); // Dispatching action to set appointments in the context
      } catch (error) {
        console.error('Error fetching appointments:', error);
        // Handle errors, set appropriate state or display error messages
      }
    };

    if ( user ) {
      fetchAppointments();
    }
    
  }, [dispatch, user]);

  return (
    <div className="appointments">
      <AppointmentForm />
    </div>
  );
};

export default Appointments;
