import React, { useState } from 'react';
import { useAppointmentsContext } from '../hooks/useAppointmentContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const AppointmentDetails = ({ appointment }) => {
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${appointment._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const deletedAppointment = await response.json();
        dispatch({ type: 'DELETE_APPOINTMENT', payload: deletedAppointment });
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      // Handle fetch or other errors
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="meetings-details">
      <h4>Patient Name:  {appointment.patientName}</h4> 
      <p>Reason:  {appointment.reason}</p>
      <p>Doctor:  {appointment.doctorName}</p>
      <p>Timing: 01:00 PM to 04:00 PM</p>
      <p>Location: Consultation Room</p>
      <p>Date:  {formatDistanceToNow(new Date(appointment.appointmentDate), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={() => setShowConfirm(true)}>delete</span>

      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this appointment?</p>
            <button className="delete-button" onClick={handleDelete}>Yes, delete</button>
            <button className="cancel-button" onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
