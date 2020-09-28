import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('all genres');
  const result = useQuery(ALL_BOOKS);
  let books = null;

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    books =
      genre === 'all genres'
        ? result.data.allBooks
        : result.data.allBooks.filter((book) => book.genres.includes(genre));
  }

  return (
    <div>
      <h2>books</h2>

      {genre !== 'all genres' ? (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
