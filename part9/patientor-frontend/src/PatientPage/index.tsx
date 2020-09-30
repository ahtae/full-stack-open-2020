import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch({ type: 'SET_PATIENT', payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient.id !== id) {
      fetchPatientList();
    }
  }, [dispatch, id, patient]);

  if (!patient) {
    return null;
  }

  const genderSymbol =
    patient.gender === 'female'
      ? 'venus'
      : patient.gender === 'male'
      ? 'mars'
      : 'venus mars';

  return (
    <div>
      <h1>
        {patient.name} <Icon name={genderSymbol} />
      </h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
