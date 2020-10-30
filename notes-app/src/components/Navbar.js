import React from "react";
import {Link} from 'react-router-dom';
import {FiLogOut, FiHome, FiInfo, FiLogIn, FiUsers} from 'react-icons/fi';
import {BsBookmarks, BsBookmarkPlus} from 'react-icons/bs';
import {AiOutlineUser} from 'react-icons/ai';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

// Recibiendo las variables de session para poder empezar a hacer condiciones con ellas
console.log(cookies.get('id'))
console.log(cookies.get('name'))
console.log(cookies.get('email'))
console.log(cookies.get('rol'))




function cerrarSession(){
    cookies.remove('id',{path:"/"})
    cookies.remove('name',{path:"/"})
    cookies.remove('email',{path:"/"})
    cookies.remove('rol',{path:"/"})

    window.location.href="/"
}

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
                            

                            <li className="nav-item active ">
                                 <Link className="nav-link"  to="/"> <FiHome/> Home </Link>
                            </li>

                            <li className="nav-item">
                            <Link className="nav-link" to="/nosotros"> <FiInfo/> Nosotros</Link>
                            </li>

                            
                        </ul>



                        <ul className="navbar-nav ">
                            
                        {
                            cookies.get('name') ? 

                            <li className="nav-item active">
                            <Link className="nav-link" to="/all-Note"> <BsBookmarks/> Lista de Notas </Link>
                            </li>

                            : <p></p> 
                        }

                        {
                            cookies.get('name') ?
                            <li className="nav-item">
                            <Link className="nav-link" to="/new-Note"> <BsBookmarkPlus/> Nueva Nota</Link>
                            </li>

                            : <p></p> 
                        }

                        {
                            cookies.get('rol') === "admin" ?
                            <li className="nav-item">
                            <Link className="nav-link" to="/all-usuarios"> <BsBookmarkPlus/> Lista de usuarios </Link>
                            </li>

                            : <p></p> 
                        }
                            
                            
                        </ul>

                        <ul className="navbar-nav "> 
                            
                                
                             {
                                 cookies.get('name') ? <p></p> :
                                 
                                    <li className="nav-item active">
                                    <Link className="nav-link" to="/iniciar"> <FiLogIn/> Iniciar session </Link>
                                    </li>
                            }

                            {
                                cookies.get('name') ? <p></p> :
                                <li className="nav-item">
                                    <Link className="nav-link" to="/registrarse"> <FiUsers/> Registrarse</Link>
                                </li>
                            }    
                            {
                                cookies.get('name') ? 
                                
                                <h5 className="pstName"> <AiOutlineUser/> Bienvenido {cookies.get('name')}</h5>
                                :
                                <p></p>   
                            }
                            {
                                cookies.get('name') ? 

                                <li className="nav-item">
                                    <FiLogOut onClick={() => cerrarSession()} className="iconlogout" /> 
                                </li>
                                :
                                <li className="nav-item">
                                    
                                </li>
                            }
                            
                        </ul>

                    </div>
                    
            </div>

    </div>
)

export default Navbar;