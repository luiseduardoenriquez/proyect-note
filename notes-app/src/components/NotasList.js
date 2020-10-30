import React, {useEffect, useState} from 'react';
import './NotasCss.css'

import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {useMutation, useQuery} from '@apollo/client';  //useQuery para hacer consultas
import {gql} from '@apollo/client';

import { BsBookmarks } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";


//Inicializamos las variables de session
import Cookies from 'universal-cookie';
const cookies = new Cookies();

/* console.log(cookies.get('id'))
console.log(cookies.get('name'))
console.log(cookies.get('email')) */

if (cookies.get('name')) {
    //alert("Estamos melos en esta condicion")

} else{

    //alert("No tenemos acceso")
    //window.location.href="/"
    
}

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
 


    



const NotasList  =  () => {

    const [cantArray, setcantArray] = useState()

    const history = useHistory();
    
    const { loading, error, data } = useQuery(GET_ALLNOTES);
    const [deleteNota] = useMutation(DELETE_NOTE);

    
    
    
   
    useEffect(() => {
        if (data === undefined) {
            //alert('si es undefind')
        }else{
            if (data.allNotes) {
                //alert(data.allNotes)
                //console.log(data.allNotes.length)
                setcantArray(data.allNotes.length)
            }
        }
    }, [data])


    

    if(loading) return <p>Cargando mensajes...</p>
    if(error) {<p>Hubo un error...</p>} 
    
    

    
    return (

        cantArray === 0 ? 
                    
            //console.log('vamos')

            <div className="jumbotron mt-4">
                    

                <div className="container">
                    <div className="row justify-content-center" >
                        <h1 className="display-4 "> Upss.. Aun no tienes notas</h1>
                        <p className="lead"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, alias?</p>
                    </div>
                </div>
                
                <hr className="my-4" />
                <Link to="/new-Note" className="btn btn-primary btn-lg btn-block">Crear Nota</Link>
            
            </div>
            
            : 

            <div className="card-columns ">
                <div className="">
                    {   
                        data.allNotes.map(({_id, title, description}) =>(
                            <div key={_id}  className="card notas-card-flow">
                                <div className="card-body">
                                    <h4> <BsBookmarks/> {title}</h4>
                                    <p4>{description}</p4>
                                </div>
                                
                                
                                <div className="">
                                        <button value={_id} onClick={e=>{
                                        history.push(`/notas/edit/${_id}`)

                                        //deleteNota({variables: {_id: _id }})
                                        }} className="btn  btn-warning col-6" >
                                              <MdEdit/>  Editar
                                        </button>
                                
                                    <button value={_id} onClick={e=>{
                                        deleteNota({variables: {_id: _id }})
                                        window.location.href="/all-Note";
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
export default NotasList;