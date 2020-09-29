import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, USER } from '../queries';

const Recommendations = ({ show }) => {
  const [getUser, resultOfUser] = useLazyQuery(USER);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [getBooks, resultOfBooks] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (resultOfUser.data && resultOfUser.data.me) {
      setFavoriteGenre(resultOfUser.data.me.favoriteGenre);
    }
  }, [resultOfUser]);

  useEffect(() => {
    if (favoriteGenre) {
      getBooks({
        variables: { genre: favoriteGenre },
      });
    }
  }, [favoriteGenre]);

  useEffect(() => {
    if (resultOfBooks.data && resultOfBooks.data.allBooks) {
      setBooks(resultOfBooks.data.allBooks);
    }
  }, [resultOfBooks]);

  if (!show) {
    return null;
  }

  if (!books) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>recommendations</h1>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
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
    </div>
  );
};

export default Recommendations;
