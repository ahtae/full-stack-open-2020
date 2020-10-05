import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue, setPatient, addEntry } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
import { Icon, Button, Table, Container } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal/index';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';
import { HealthCheckEntryFormValues } from '../AddEntryModal/AddHealthCheckEntryForm';
import { OccupationalHealthcareEntryFormValues } from '../AddEntryModal/AddOccupationalHealthCareEntryForm';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [type, setType] = React.useState<string>('');

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (
    values:
      | HospitalEntryFormValues
      | HealthCheckEntryFormValues
      | OccupationalHealthcareEntryFormValues
  ) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
    <Container textAlign="center">
      <Table celled>
        <Table.Body>
          {Object.values(patient.entries).map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </Table.Body>
      </Table>
    </Container>
  ) : null;

  return (
    <div>
      <h1>
        {patient.name} <Icon name={genderSymbol} />
      </h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {entriesOutput}
      <AddEntryModal
        type={type}
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <br />
      <Button
        onClick={() => {
          openModal();
          setType('Hospital');
        }}
      >
        Add New Hospital Entry
      </Button>
      <Button
        onClick={() => {
          openModal();
          setType('Health Check');
        }}
      >
        Add New Health Check Entry
      </Button>
      <Button
        onClick={() => {
          openModal();
          setType('Occupational Healthcare');
        }}
      >
        Add New Occupational Healthcare Entry
      </Button>
    </div>
  );
};

export default PatientPage;
