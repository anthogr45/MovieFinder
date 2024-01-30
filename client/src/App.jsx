// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import Footer from './components/Footer';
import { setContext } from '@apollo/client/link/context';
import FavoriteMoviesProvider from './utils/FavoriteMoviesContext';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <FavoriteMoviesProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          <div style={{ flex: 1, margin: '0 16px 20px' }}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </FavoriteMoviesProvider>
    </ApolloProvider>
  );
};

export default App;
