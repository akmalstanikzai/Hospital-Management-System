import React from 'react';

const DoctorDetails = ({ doctor }) => {

  return (
    <div className="doctor-details">
      <div className="profile-picture">
        <i class="material-symbols-outlined">account_circle</i>
      </div>
      <div className="doc-det">
        <h4>{doctor.name}</h4>
        <p>{doctor.specialty}</p>
        <p><strong>Experience: </strong>{doctor.experience}</p>
        <p><strong>Achievements: </strong>{doctor.achievements}</p>
        <p><strong>Timing: </strong>{doctor.timing}</p>
      </div>
    </div>
  );
};

export default DoctorDetails;
