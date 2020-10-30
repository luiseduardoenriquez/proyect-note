import React, { useEffect, useState} from 'react';
import { useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
//import {useHistory} from 'react-router-dom'

import {gql} from 'apollo-boost';

const CREATE_USER = gql`

mutation CREATEUSER($name: String!, $email: String!, $password: String, $rol: String){
  createUser(input:{
    name:$name
    email:$email
    password:$password
    rol:$rol
  }){
    name
    email
    password
    rol
  }
}

`;


const RegistrarseNavigation = () => {

    //const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [PasswordMatch, setPasswordMatch] = useState("");
    const [rol, setRol] = useState("");

    console.log(rol)

    const [createUser,{data}] = useMutation(CREATE_USER);
    

    //console.log(data)

    useEffect(() => {
      if (data === undefined) {
        
      }else{
        if (data.createUser === null) {
          toast.warning('El correo ya se encuentra en la base de datos');
        }else{
          toast.success('Se ha registrado correctamente');
          window.location.href="/iniciar"
          
        }
      }
    }, [data])


    return(
        

        <div className="display-4 d-flex justify-content-center">
          <div className="card">
            <div className="card-header justify-content-center">
              <h4 className="display-4 d-flex justify-content-center"> Registrarse </h4>
            </div>

            <div className="container mt-1">
            <img
                    src="/logo.png"
                    className="logo mx-auto d-block m-4"
                    alt="imagen logo"
                  />
            </div>

            <div className="card-body">
              <form onSubmit={async e=>{
                
                  e.preventDefault();

                  if (password === PasswordMatch) {
                    await createUser({variables: {name,email,password,rol}})
                  }else{
                    toast.warning('Las contraseñas no coinciden');
                  }
                  
                  //history.push('/iniciar');

              }}>
                
                  <div className="form-group m-1">
                    <input type="text" required  className="form-control" placeholder="Username"  onChange={e => setName(e.target.value)} value={name} />
                  </div>
                  
                
                <div className="form-group">
                  <div className="form-group m-1">
                    <input type="email" required  className="form-control" placeholder="Correo" onChange={e => setEmail(e.target.value)} value={email} />
                  </div>

                  <div className="row ">

                    <div className="col">
                      <input type="password" required  className="form-control" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} value={password} />
                    </div>

                    <div className="col">
                      <input type="password" required className="form-control" placeholder="Confirmar contraseña" onChange={e => setPasswordMatch(e.target.value)} value={PasswordMatch} />
                    </div>

                  </div>

                  <select className="form-control mt-2" id="exampleFormControlSelect1" onChange={e => setRol(e.target.value)}  >

                      <option>Roles</option>
                      <option value="usuario">Usuario</option>
                      <option value="admin">Admin</option>

                  </select>

                  <hr className="my-4" />
                  
                </div>
                <div className="form-group">

                  <button className="btn btn-primary btn-block">
                    Guardar
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      
    )
}

export default RegistrarseNavigation;