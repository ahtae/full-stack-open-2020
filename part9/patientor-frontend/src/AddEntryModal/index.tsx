import React from 'react';
import { Modal, ModalHeader, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, {
  HospitalEntryFormValues,
} from './AddHospitalEntryForm';
import AddHealthCheckEntryForm, {
  HealthCheckEntryFormValues,
} from './AddHealthCheckEntryForm';
import AddOccupationalHealthcareEntryForm, {
  OccupationalHealthcareEntryFormValues,
} from './AddOccupationalHealthCareEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (
    values:
      | HospitalEntryFormValues
      | HealthCheckEntryFormValues
      | OccupationalHealthcareEntryFormValues
  ) => void;
  error?: string;
  type: string;
}

const AddEntryModal = ({
  type,
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    {type === 'Hospital' ? (
      <Modal.Header>Add a New Hospital Entry</Modal.Header>
    ) : type === 'Health Check' ? (
      <ModalHeader>Add a New Health Check Entry</ModalHeader>
    ) : (
      <Modal.Header>Add a New Occupational Health Care Entry</Modal.Header>
    )}
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {type === 'Hospital' ? (
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      ) : type === 'Health Check' ? (
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      ) : (
        <AddOccupationalHealthcareEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
