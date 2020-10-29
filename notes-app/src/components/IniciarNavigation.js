import React,  {useState, useEffect} from 'react';
import {gql} from 'apollo-boost'
import { useLazyQuery } from '@apollo/client';
import {toast} from 'react-toastify'
//import logo from '../public/logo.png'

const MATCH_USER = gql`

  query userMatch($correo:String, $contra:String){
    Macht(correo:$correo,contra:$contra){
      _id
      name
      email
    }
  }

`;

const IniciarNavigation = () => {

    const [correo, setCorreo] = useState("")
    const [contra, setContra] = useState("")

    const [login, setLogin] = useState()

    
     const [Macht,{data}] = useLazyQuery(MATCH_USER)

     

     useEffect(() => {
      
      setLogin(data)
       
     }, [data])

     // la consulta en la base de datos funciona, y 
     // si comprueba si encuentra a un usuario con 
     // las mismas credenciales, la respuesta es 
     // devolver , las credenciales que se encontraron

     // si no encuentra nada, igualmente devuelve un objeto 
     // vacio por eso entra en las dos condiciones

     useEffect(() => {

         if(login === undefined){
          //alert(login)
        }else{
          if (login.Macht === null) {
            //alert(login.Macht + "siguiente")
            //console.log(login.Macht)
            toast.warning('Credenciales incorrectos')
          }else{
            //console.log(login.Macht)
            toast.success('Iniciado session correctamente');

          }
          
        } 

         
        
     }, [login])

      

    return(
        <div className="jumbotron mt-4">
        <div className="display-4 d-flex justify-content-center">
          <div className="card">
            <div className="card-header justify-content-center">
              <h1 className="display-4 d-flex justify-content-center"> Iniciar Session </h1>
            </div>
            <div className="card-body">
                {/* <img src={logo} width="200" height="200" className="mx-auto d-block m-4"/> */}
              <form onSubmit={ (e)=>{
                e.preventDefault();

                   Macht({variables: {correo, contra}})

              }} >
                <div className="form-group">
                  <div className="form-group">
                    <img src="/img/logo.png" className="logo mx-auto d-block m-4" alt="" />
                  </div>
                  <div className="form-group m-1">
                    <input type="email"  onChange={e => setCorreo(e.target.value)}  className="form-control" placeholder="Correo" />
                  </div>
                  <div className="form-group m-1">
                    <input type="password" onChange={e => setContra(e.target.value)}  className="form-control" placeholder="Contraseña" />
                  </div>
                  <hr className="my-4" />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" type="submit">
                    Iniciar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default IniciarNavigation;