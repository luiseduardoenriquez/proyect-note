
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';

import {gql} from 'apollo-boost';


const SEARCH_USER = gql`

    query OneUser($_id: ID){
        oneUser(_id: $_id){
        _id
        name
        email
        rol
        }
    }

`;

const EDIT_USER = gql`

    mutation UpdateUser($_id:ID, $name:String!, $email:String!, $rol:String){
        uptadeUser(_id:$_id,input:{
        name:$name
        email:$email
        rol:$rol
        }){
        name
        email
        rol
        }
    }

`;


const UserEdit =  () => {

    //const history = useHistory();
     const {id} = useParams();
     

     const [name, setName] = useState("");
     const [email, setEmail] = useState(""); 
     const [rol, setRol] = useState(""); 
     
    
     const { loading, error, data } =  useQuery(SEARCH_USER, {variables: { _id:id }});
     const [uptadeUser] = useMutation(EDIT_USER)

    useEffect(() => {
            if (data) {
                setName(data.oneUser.name)
                setEmail(data.oneUser.email)
                setRol(data.oneUser.rol)
            }            
    }, [data])


    if(loading) return <p>Cargando mensajes...</p>
    if(error) {<p>Hubo un error...</p>} 
    
    //console.log(data)

          return (
              <div className="row">
                  <div className="col-md-6 offset-md-4">
                      <div className="card">
                          <div className="card-body">
                              
                                  <div className="card-title ">
                                      <h3 className="card-text ">Editar Usuario</h3>
                                  </div>
                                  
                              <form onSubmit={async (e) => {
                                  e.preventDefault(); // Prevenie que el formulario se refresque

                                  await uptadeUser({variables: {_id:id, name, email, rol}})

                                  toast.success('Usuario editado');
                                  //history.push('/all-usuarios')
                                  window.location.href="/all-usuarios"
                                  
                              } }>

                                  <div className="form-group">
                                      <input type="text" placeholder="Name" id="Name" className="form-control" onChange={e => setName(e.target.value)}
                                          value={name} 
                                      />
                                  </div>

                                  <div className="form-group">
                                      <input type="text" placeholder="Descripcion" className="form-control"
                                          onChange={e => setEmail(e.target.value)}
                                          value={email} />
                                  </div>

                                    <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Roles: Actual {rol}</label>

                                        <select className="form-control" id="exampleFormControlSelect1" onChange={e => setRol(e.target.value)} value={rol} >
                                        <option></option>
                                        <option value="usuario">Usuario</option>
                                        <option value="admin">Admin</option>
                                        
                                        </select>
                                    </div>

                                  
                                      <button className="btn btn-block btn-warning">
                                          Editar
                                      </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          );
      }

export default UserEdit;
