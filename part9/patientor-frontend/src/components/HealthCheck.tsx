import React from 'react';
import { useStateValue } from '../state';
import { HealthCheckEntry, Diagnosis } from '../types';
import { Container, Table, Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnosisCodes }] = useStateValue();

  return (
    <Table celled>
      <div style={{ margin: '10px' }} key={entry.id}>
        <div>
          <h2>
            {entry.date} <Icon name="doctor" />
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
        <Icon
          name="heart"
          style={{
            color:
              entry.healthCheckRating === 0
                ? 'green'
                : entry.healthCheckRating === 1
                ? 'yellow'
                : entry.healthCheckRating === 2
                ? 'orange'
                : 'red',
          }}
        />
      </div>
    </Table>
  );
};

export default HealthCheck;
