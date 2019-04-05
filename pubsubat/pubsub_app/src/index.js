import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import App from './components/App';

// Reads GRAPHQL_HOST from Webpack config
// In DEBUG, set GRAPHQL_HOST as http://localhost:8000 (to django wsgi server)
const graphql_host = process.env.GRAPHQL_HOST || '';
const client = new ApolloClient({
  uri: graphql_host + '/graphql/',
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app')
);

module.hot.accept();
