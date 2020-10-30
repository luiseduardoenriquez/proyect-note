
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {toast} from 'react-toastify';
import {useHistory, useParams} from 'react-router-dom';

import {gql} from 'apollo-boost';


const SEARCH_NOTE = gql`

    query OneNote($_id: ID){
        oneNote(_id: $_id){
        _id
        title
        description
        }
    }

`;

const UPDATE_NOTA = gql`

    mutation UpdateNota($_id:ID, $title:String!, $description:String!){
        uptadeNota(_id:$_id,input:{
        title:$title
        description:$description
        }){
        _id
        title
        description
        }
    }

`;


const NotasEdit =  () => {

     const history = useHistory();
     const {id} = useParams();

     const [title, setTitle] = useState("");
     const [description, setDescription] = useState(""); 
     
    
    const { loading, error, data } =  useQuery(SEARCH_NOTE, {variables: { _id:id }});
    const [uptadeNota] = useMutation(UPDATE_NOTA)
        
    useEffect(() => {
        if (data) {
            setTitle(data.oneNote.title)
            setDescription(data.oneNote.description)
        }
    }, [data])

    if(loading) return <p>Cargando mensajes...</p>
    if(error) {<p>Hubo un error...</p>} 
    
    //console.log(data)

    //if (loading) return "cargando"; 
    
         //const [title, setTitle] = useState("");

          return (
              <div className="row">
                  <div className="col-md-6 offset-md-4">
                      <div className="card">
                          <div className="card-body">
                              
                                  <div className="card-title ">
                                      <h3 className="card-text ">Editar Nota</h3>
                                  </div>
                                  
                              <form onSubmit={async (e) => {
                                  e.preventDefault(); // Prevenie que el formulario se refresque

                                  await uptadeNota({variables: {_id:id, title, description}}); // -> en el nivel de variabbles estariamos invocando al CREATENOTA sin necesidad de mencionarlo

                                  //Ya con esto guardaria
                                  toast.success('Nota editada');
                                  history.push('/all-Note');

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

export default NotasEdit;

// Hay una ley aca en react y es que siempre que un elemento se vaya a repetir por medio de un for o buble
// toca colocarlo en row , columnas

// Para agarrar los estados tenemos que importar in modulo llamado useState