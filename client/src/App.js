import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import apolloClient from "./apolloClient";
import { ApolloProvider } from "react-apollo";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Query
        query={gql`
          query {
            test {
              fullname
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) {
            throw error;
          }
          console.log(data);
          return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{data}</p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
