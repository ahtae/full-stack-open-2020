import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { TextField } from '../AddPatientModal/FormField';
import { HealthCheckEntry } from '../types';
import { useStateValue } from '../state';

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, 'id'>) => void;
  onCancel: () => void;
}

const AddHealthCheckEntry: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosisCodes }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        type: 'HealthCheck',
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};

        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.healthCheckRating === -1) {
          errors.healthCheckRating = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisCodes)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Health Check Rating"
              placeholder="Health Check Rating"
              name="healthCheckRating"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckEntry;
