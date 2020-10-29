import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { ApolloProvider } from "@apollo/client";
import {client} from './client'

 

// Aqui es donde le pasamos e inicializamos nuestra API de graphql y debe estar inicializada, ejecutandose
// El conponente app tiene que estar englobada con la conexion por eso se enciarra con el apolloprovider
// Y como etiqueta necesita un cliente ahi es donde le pasamos la variable que contiene la conexion por medio
// de ApolloClient

//App.js esta el componente principal

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}> 
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
