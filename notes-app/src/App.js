import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // este es el enrutador
import {ToastContainer} from 'react-toastify';
// Es similar a como se definen las rutas en eXpress, es decirle a donde se quiere dirigir
// Y el exact es para que exactamente coloque ese componente, ya que si creamos otra ruta llamada
//      ( /notas ) como en cierta parte de cumple el "/" entonces se colocaria ese, y el otro que llamemos

import NotasList from "./components/NotasList"; /// Listado de notas
import NotasForm from "./components/NotasForm"; /// Formulario de notas
import Navbar from "./components/Navbar";  /// Barra de navegacion
import Home from "./components/Home";
import Nosotros from "./components/Nosotros";
import IniciarNavigation from "./components/IniciarNavigation";
import RegistrarseNavigation from "./components/RegistrarseNavigation";
import NotasEdit from "./components/NotasEdit";

import {UserContextProvider} from './components/UserContext'
import 'react-toastify/dist/ReactToastify.css';
import "bootswatch/dist/cosmo/bootstrap.min.css";

function App() {
  return (
    <UserContextProvider>

        <Router>

          <Navbar/> 
          
          <Switch>

            <div className="container p-4">

              <Route exact path="/" component={Home} />
              <Route exact path="/nosotros" component={Nosotros} />

              <Route exact path="/all-Note" component={NotasList} />
              <Route exact path="/new-Note" component={NotasForm} />
              <Route exact path="/notas/edit/:id" component={NotasEdit} />

              <Route exact path="/iniciar" component={IniciarNavigation} />
              <Route exact path="/registrarse" component={RegistrarseNavigation} />
            
            </div>  
            
          </Switch>

          <ToastContainer/>
        </Router>
        
    </UserContextProvider>
  );
}

export default App;
