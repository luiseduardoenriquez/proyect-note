import React from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';

import {useHistory} from 'react-router-dom';
import { MdDelete, MdEdit } from "react-icons/md";

import Cookies from 'universal-cookie';
const cookies = new Cookies();


const GET_ALLUSER = gql `
    {
            allUsuarios{
            _id
            name
            email
            rol
            }
    }
`;

const DELETE_USER = gql`

    mutation DeleteUser($_id:ID){
        deleteUser(_id:$_id){
        _id
        title
        }
    }

`;

const UsuariosList  =  () => {


    const history = useHistory();
    const { loading, error, data } = useQuery(GET_ALLUSER);
    const [deleteUser] = useMutation(DELETE_USER)

    

    if(loading) return <p>Cargando mensajes...</p>
    if(error) {<p>Hubo un error...</p>} 

    if (cookies.get("rol") !== "admin" ) {

        return(
                <div className="jumbotron bg-danger">
                    <h1 className="display-4 letrasWN"> Upss.. No tienes permiso a esta area</h1>
                    <p className="letrasWN">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, alias?</p>
                </div>       
             )
        
    }else{

        return(

        
            <div className="card-columns ">
                    <div className="">
                        {   
                            data.allUsuarios.map(({_id, name, email, rol}) =>(
                                <div key={_id}  className="card notas-card-flow">
                                    <div className="card-body">
                                        <h4>Username: {name}</h4>
                                        <p4>Correo: {email}</p4>
                                        <br/>
                                        <p4>Rol: {rol}</p4>
                                    </div>

                                    <div className="">
                                            <button value={_id} onClick={e=>{
                                            history.push(`/usuarios/${_id}`)

                                            //deleteNota({variables: {_id: _id }})
                                            }} className="btn  btn-warning col-6" >
                                                <MdEdit/>  Editar
                                            </button>
                                    
                                        <button value={_id} onClick={e=>{
                                            deleteUser({variables: {_id: _id }})
                                            window.location.href="/all-usuarios";
                                        }} className="btn  btn-danger col-6" >
                                            <MdDelete/> Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            

        )

    }

}
export default UsuariosList;