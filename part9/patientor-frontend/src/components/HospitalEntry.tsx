import React from 'react';
import { useStateValue } from '../state';
import { Entry, Diagnosis } from '../types';
import { Table, Icon } from 'semantic-ui-react';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosisCodes }] = useStateValue();

  return (
    <Table.Row>
      <Table.Cell>
        <p style={{ fontSize: 20 }}>
          {entry.date} <Icon name="hospital" />
        </p>
        <p style={{ color: 'gray' }}>
          <em>{entry.description}</em>
        </p>
        {
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
        }
      </Table.Cell>
    </Table.Row>
  );
};

export default HospitalEntry;
