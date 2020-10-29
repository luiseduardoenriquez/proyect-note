import React from "react";
import {Link} from 'react-router-dom';

// Las etiquetas href nada que ver aca, se tiene que importar el modulo: react router dom , y remplazarlas por
// Por etiquetas <link/> == <a/>

const Navbar = () => (
    <div className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container">

                    <Link className="navbar-brand" to="/">Note APP</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse container" id="navbarNav">


                        <ul className="navbar-nav ">
                            

                            <li className="nav-item active">
                            <Link className="nav-link" to="/">Home </Link>
                            </li>

                            <li className="nav-item">
                            <Link className="nav-link" to="/nosotros">Nosotros</Link>
                            </li>

                            
                        </ul>



                        <ul className="navbar-nav ">
                            

                            <li className="nav-item active">
                            <Link className="nav-link" to="/all-Note">Lista de Notas </Link>
                            </li>

                            <li className="nav-item">
                            <Link className="nav-link" to="/new-Note">Nueva Nota</Link>
                            </li>

                            
                            
                        </ul>

                        <ul className="navbar-nav "> 

                            <li className="nav-item active">
                            <Link className="nav-link" to="/iniciar">Iniciar session </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/registrarse">Registrarse</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/desconectarse">Desconectarse</Link>
                            </li>
                        </ul>

                    </div>
                    
            </div>

    </div>
)

export default Navbar;