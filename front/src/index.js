import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Prueba from './prueba';
import NavigationBar from './navbar';
import SideBar from './side_bar/sideBar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <div id = "contenido">
      <NavigationBar />
      <p>Holaaaa, Contenidoooo</p>
    </div>
    <SideBar />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
