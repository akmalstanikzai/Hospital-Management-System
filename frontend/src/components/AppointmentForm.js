import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAppointmentsContext } from '../hooks/useAppointmentContext';

const AppointmentForm = () => {
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const appointment = { patientName, appointmentDate, doctorName, reason , status};

    const response = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setPatientName('');
      setAppointmentDate('');
      setDoctorName('');
      setReason('');
      setStatus('pending');
      setEmptyFields([]);
      // Dispatch an action if required (e.g., to update context state)
      dispatch({ type: 'CREATE_APPOINTMENT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <div className="form-container">
        <h3>Request an Appointment</h3>

        <label>Patient Name:</label>
        <div className='input-div'>
          <input
            type="text"
            onChange={(e) => setPatientName(e.target.value)}
            value={patientName}
            className={emptyFields.includes('patientName') ? 'error' : ''}
          />
        </div>
        
        <label>Appointment Date:</label>
        <div className='input-div'>
          <input
            type="date" // Change to 'date' for a date picker
            onChange={(e) => setAppointmentDate(e.target.value)}
            value={appointmentDate}
            className={emptyFields.includes('appointmentDate') ? 'error' : ''}
          />
        </div>
        

        <label>Doctor Name:</label>
        <div className='input-div'>
          <input
            type="text"
            onChange={(e) => setDoctorName(e.target.value)}
            value={doctorName}
            className={emptyFields.includes('doctorName') ? 'error' : ''}
          />
        </div>
        
        <label>Reason for Appointment:</label>
        <div class="big-textarea">
          <textarea
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            className={emptyFields.includes('reason') ? 'error' : ''}
          ></textarea>
        </div>
        
        <button className='req-button'>Request Appointment</button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default AppointmentForm;
