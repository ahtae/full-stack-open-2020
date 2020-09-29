import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, USER } from '../queries';

const Recommendations = ({ show }) => {
  const { loading, error, data: user } = useQuery(USER);
  const favoriteGenre = user ? user.me.favoriteGenre : null;
  const { loading: loadingBooks, data: allBooks } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: favoriteGenre === null,
  });
  const books = allBooks ? allBooks.allBooks : null;

  if (!show) {
    return null;
  }

  if (loading || loadingBooks) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>recommendations</h1>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
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
