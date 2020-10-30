
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';

import { BsBookmarkPlus } from "react-icons/bs";

import {gql} from 'apollo-boost';




// En la linea del mutation y ese Nombre en mayuscula es para diferenciarla del nombre de la mutacion 
// interna, y lo que hacemos es definir el tipo de datos que van a ingresar aqui por medio del cliente
// CREATE_NOTE es muy diferente a CREATENOTA, con el primero es el que usamos en el metodo useMutation
// el otro es una forma en la que cuando estamos en el formulario definimos el tipo de dato

// Lo mismo como hacemos la consulta en nuestro graphql
const CREATE_NOTE = gql`

    mutation CREATENOTA($title: String!, $description: String!){

        createNota(input:{
            title:$title,
            description:$description
          }){
            _id
            title
            description
          }

    }

`;


// Podemos declarar cada estado para cada input
// Estos estados los vamos a ir llenando mediante estados, y es cada que el cliente tipea algo
// Por medio del metodo onchange

// Mediante onChange={e => setTitle(e.target.value)} el cual es una funcion declarado 
// llamada "e" La cual se autoproclama cuando se va cambiando el evento y va setiando o llenando la variable title , en el useState
const NotasForm = () => {

     //const history = useHistory();
     const {id} = useParams();
     
     
     const [title, setTitle] = useState("");
     const [description, setDescription] = useState("");
     

     const [createNota] = useMutation(CREATE_NOTE); 
     //const { loading, error, data } = useQuery(SEARCH_NOTE, {variables: { _id:id }});
     
     /* if(loading) return <p>Cargando mensajes...</p>
     if(error) {<p>Hubo un error...</p>}  */

          // Al usar la
          // useMatation y el nombre, estamos diciendo que entre ahi
          // y luego en la constante que vamos a usar esa funcion, por asi decirlo
          // Y pasarle los campos titulo description etc
          return (
              <div className="row">
                  <div className="col-md-6 offset-md-4">
                      <div className="card">
                          <div className="card-body">
                              
                                  <div className="card-title ">
                                      <h3 className="card-text "> <BsBookmarkPlus/> Nueva Nota</h3>
                                  </div>

                              <form onSubmit={async (e) => {
                                  e.preventDefault(); // Prevenie que el formulario se refresque



                                  //console.log(title, description) ahora lo que tenemos que hacer es usar un modulo llamado useMutation, asi como anterior mente usamos el useQuery
                                  // usamos la funcion que acabamos de sacar del use ---> const [createNota] = useMutation(CREATENOTA) y le pasamos los parametros que le definimos
                                  await createNota({ variables: { title, description } }); // -> en el nivel de variabbles estariamos invocando al CREATENOTA sin necesidad de mencionarlo


                                  //Ya con esto guardaria
                                  toast.success('Nueva nota agregada');
                                  window.location.href="/all-Note";
                                  //history.push('/all-Note');

                                  //window.location.href="/all-Note";
                                  // ya lo que podemos hacer es hacer una redireccion bien chevere
                              } }>

                                  <div className="form-group">
                                      <input type="text" placeholder="Titulo" id="title" className="form-control" onChange={e => setTitle(e.target.value)}
                                          value={title } //colocamos la variable del useState para que se pueda ver
                                      />
                                  </div>

                                  <div className="form-group">
                                      <input type="text" placeholder="Descripcion" className="form-control"
                                          onChange={e => setDescription(e.target.value)}
                                          value={description } />
                                  </div>

                                  {id ?
                                      <button className="btn btn-block btn-warning">
                                          Editar
                                      </button>
                                      :
                                      <button className="btn btn-block btn-primary">
                                                       Guardar
                                      </button>}



                              </form>


                          </div>
                      </div>
                  </div>
              </div>
          );
      }

export default NotasForm;

// Hay una ley aca en react y es que siempre que un elemento se vaya a repetir por medio de un for o buble
// toca colocarlo en row , columnas

// Para agarrar los estados tenemos que importar in modulo llamado useState