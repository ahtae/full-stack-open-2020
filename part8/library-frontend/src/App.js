import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import { useSubscription, useApolloClient } from '@apollo/client';
import Recommendations from './components/Recommendations';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((b) => b.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  const notify = (message) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    setPage('authors');
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;

      alert(`${addedBook.name} added`);
      updateCacheWith(addedBook);
    },
  });

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage('recommended')}>recommended</button>
        ) : null}

        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : null}
        {token ? <button onClick={logout}>logout</button> : null}
      </div>

      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} />
      <NewBook
        updateCacheWith={updateCacheWith}
        show={page === 'add'}
        setError={notify}
      />
      <Recommendations show={page === 'recommended'} setError={notify} />
      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
