import React from 'react';
import { useStateValue } from '../state';
import { Entry, Diagnosis } from '../types';
import { Container, Table, Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosisCodes }] = useStateValue();

  return (
    <Table celled>
      <div style={{ margin: '10px' }} key={entry.id}>
        <div>
          <h2>
            {entry.date} <Icon name="stethoscope" />
          </h2>
        </div>
        <p style={{ color: 'gray' }}>
          <em>{entry.description}</em>
        </p>
        <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code: string) => {
                const diagnosisCode:
                  | Diagnosis
                  | undefined = diagnosisCodes.find((c) => c.code === code);
                const descriptionOfDiagnosisCode = diagnosisCode
                  ? diagnosisCode.name
                  : null;

                return (
                  <li key={code}>
                    {code} {descriptionOfDiagnosisCode}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </Table>
  );
};

export default OccupationalHealthcare;
