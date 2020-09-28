import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries';
import Select from 'react-select';

const Authors = ({ show, setError }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const result = useQuery(ALL_AUTHORS);
  let authors = null;
  const [changeBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('author not found');
    }
  }, [result.data, setError]);

  const submit = (event) => {
    event.preventDefault();

    changeBirthYear({ variables: { name, born: Number(born) } });

    setBorn('');
    setName('');
  };

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    authors = result.data.allAuthors;
  }

  const authorsForSelect = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={name}
          onChange={({ value }) => setName(value)}
          options={authorsForSelect}
        />
        <div>
          born
          <input
            name="birthYear"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
