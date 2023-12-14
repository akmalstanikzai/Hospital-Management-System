import React, { useEffect } from 'react';
import { useDoctorsContext } from '../hooks/useDoctorsContext'; // Import the custom hook for DoctorsContext
import { useAuthContext } from '../hooks/useAuthContext'; // Import the custom hook for authentication context

// Import necessary components (e.g., DoctorDetails, DoctorForm)
import DoctorDetails from '../components/DoctorDetails';

const Doctors = () => {
  const { doctors, dispatch } = useDoctorsContext(); // Accessing doctors state and dispatch from DoctorsContext
  const { user } = useAuthContext(); // Accessing user information from authentication context

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (!user || !user.token) {
          return; // Exit early if user or user.token is undefined
        }

        const response = await fetch('/api/doctors', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const json = await response.json();
        dispatch({ type: 'SET_DOCTORS', payload: json }); // Dispatching action to set doctors in the context
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Handle errors, set appropriate state, or display error messages
      }
    };

    fetchDoctors();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="doctors">
        {doctors &&
          doctors.map(doctor => (
            <DoctorDetails doctor={doctor} key={doctor._id} />
          ))}
      </div>
    </div>
  );
};

export default Doctors;
