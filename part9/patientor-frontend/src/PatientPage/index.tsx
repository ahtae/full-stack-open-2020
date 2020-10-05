import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue, setPatient, addHospitalEntry } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
import { Icon, Button, Table, Container } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal/index';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    try {
      const { data: newHospitalEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(addHospitalEntry(newHospitalEntry, id));
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
        modalOpen={modalOpen}
        onSubmit={submitNewHospitalEntry}
        error={error}
        onClose={closeModal}
      />
      <br />
      <Button onClick={() => openModal()}>Add New Hospital Entry</Button>
    </div>
  );
};

export default PatientPage;
