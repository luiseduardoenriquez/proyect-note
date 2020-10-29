import React from 'react';
import './NotasCss.css'

import {useHistory} from 'react-router-dom'
import {useMutation, useQuery} from '@apollo/client';  //useQuery para hacer consultas
import {gql} from '@apollo/client';

// Se importa el apollo boost para poder hacer la consulta por medio del api


// No tenemos necesidad de colocar Query{} porque es depende de que modulo importemos podemos hacer querys o mutaciones
// desde @apollo-client importamos useQuery para hacer querys y mutaciones

const DELETE_NOTE = gql`

    mutation DeleteNota($_id:ID){
        deleteNota(_id:$_id){
        _id
        title
        }
    }

`;


const GET_ALLNOTES = gql `

    
       {
            allNotes{
            _id
            title
            description
            }
       }
    

`;



// dentro del componente donde queremoss los datos usamos la sentencia, entonces
//  const { loading, error } = useQuery(GET_ALLNOTES)
// loading ej: if(error) {<p>Hubo un error...</p>} 
//
//y el ultimo parametro es el data 
// con el cual empezaremos a agarrar los datos que queremos

// Nota: remplazamos nota =>( el "nota" por {Definimos las propiedades} , esto para no estar colocando nota.nombre y asi 
/* data.allNotes.map(nota =>(

    )) 

    otra cosa a añadir
    colocamos en el componente o elemento, una propiedad llamada key={_id} en donde colocaremos el identificador
*/
 


const NotasList =  () => {

    const history = useHistory();
    
    const { loading, error, data } = useQuery(GET_ALLNOTES);
    const [deleteNota] = useMutation(DELETE_NOTE);

    
    
    
    if(loading) return <p>Cargando mensajes...</p>
    if(error) {<p>Hubo un error...</p>} 

    return (
        <div className="card-columns ">
            <div className="">
                {
                    data.allNotes.map(({_id, title, description}) =>(
                        <div key={_id}  className="card notas-card-flow">
                            <div className="card-body">
                                <h4>{title}</h4>
                                <p4>{description}</p4>
                            </div>
                            <div>
                           
                                    <button value={_id} onClick={e=>{
                                            history.push(`/notas/edit/${_id}`)

                                            //deleteNota({variables: {_id: _id }})
                                        }} className="btn btn-block btn-warning" >
                                            Editar
                                        </button>
                            </div>
                            <div>
                                <button value={_id} onClick={e=>{
                                    deleteNota({variables: {_id: _id }})
                                    window.location.href="/all-Note";
                                }} className="btn btn-block btn-danger" >
                                    Eliminar
                                </button>
                            </div>    
                        </div>
                    ))
                }
            </div>
        </div>
    )

}
export default NotasList;