import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue, setPatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
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

        dispatch(setPatient(patientFromApi));
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

  const entriesOutput = patient.entries.length ? (
    <div>
      <h1>entries</h1>
      {patient.entries.map((entry: Entry) => (
        <div>
          <p>
            {entry.date} <em>{entry.description}</em>
          </p>
          <ul>
            {entry.diagnosisCodes
              ? entry.diagnosisCodes.map((code: string) => (
                  <li key={code}>{code}</li>
                ))
              : null}
          </ul>
        </div>
      ))}
    </div>
  ) : null;

  return (
    <div>
      <h1>
        {patient.name} <Icon name={genderSymbol} />
      </h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {entriesOutput}
    </div>
  );
};

export default PatientPage;
