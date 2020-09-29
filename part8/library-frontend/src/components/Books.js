import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all genres');
  const [getBooks, resultOfBooks] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (genre === 'all genres') {
      getBooks();
    } else {
      getBooks({
        variables: { genre },
      });
    }

    if (resultOfBooks.data) {
      setBooks(resultOfBooks.data.allBooks);
    }
  }, [genre]);

  useEffect(() => {
    if (resultOfBooks.data) {
      setBooks(resultOfBooks.data.allBooks);
    }
  }, [resultOfBooks]);

  if (!show) {
    return null;
  }

  // if (resultOfBooks.loading) {
  //   return <div>loading...</div>;
  // } else {
  //   books =
  //     genre === 'all genres'
  //       ? resultOfBooks.data.allBooks
  //       : resultOfBooks.data.allBooks.filter((book) =>
  //           book.genres.includes(genre)
  //         );
  // }

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
