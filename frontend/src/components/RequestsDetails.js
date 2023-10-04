import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAppointmentsContext } from '../hooks/useAppointmentContext';
import { useAuthContext } from '../hooks/useAuthContext';

const AppointmentDetails = ({ appointment }) => {

  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDecline = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${appointment._id}`, {
        method: 'DELETE', // or DELETE based on your API implementation
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const deleteAppointment = await response.json();
        dispatch({ type: 'DELETE_APPOINTMENT', payload: deleteAppointment });
      } else {
        console.error('Failed to decline appointment');
      }
    } catch (error) {
      console.error('Error declining appointment:', error);
    } finally {
      setShowConfirm(false);
    }
  };

  
  const handleAccept = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${appointment._id}`, {
        method: 'PATCH', // Use appropriate method (PUT, POST, etc.) based on your API
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'accepted' }) // Update status to 'accepted'
      });

      if (response.ok) {
        const acceptedAppointment = await response.json();
        dispatch({ type: 'UPDATE_APPOINTMENT', payload: acceptedAppointment });
      } else {
        console.error('Failed to accept appointment');
      }
    } catch (error) {
      console.error('Error accepting appointment:', error);
    } finally {
      setShowConfirm(false);
    }
  };

  if(appointment.status === 'pending'){
    return (
      <div className="appointment-details">
        <div>
          <h4>Patient Name:  {appointment.patientName}</h4> 
          <p>Reason:  {appointment.reason}</p>
          <p>Doctor:  {appointment.doctorName}</p>
          <p>Staus:  {appointment.status}</p>
          <p>Date:  {formatDistanceToNow(new Date(appointment.appointmentDate), { addSuffix: true })}</p>
        </div>
        
        <div class="buttons">
          <button class="accept" onClick={handleAccept}>Accept</button>
          <button class="decline" onClick={() => setShowConfirm(true)}>Decline</button>
          {showConfirm && (
            <div className="modal">
              <div className="modal-content">
                <p>Are you sure you want to decline this appointment?</p>
                <button onClick={handleDecline} className="dec-btn">Yes, Decline</button>
                <button onClick={() => setShowConfirm(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

};

export default AppointmentDetails;
