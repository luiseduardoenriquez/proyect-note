import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom'

import {gql} from 'apollo-boost';


const CREATE_USER = gql`

    mutation CREATEUSER($name: String!, $email: String!, $password: String!){
        
            createUser(input:{
              name:$name,
              email:$email
              password:$password
            }){
              _id
              name
              email
              password
            }
          
    }
        
      

`;


const RegistrarseNavigation = () => {

    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUser] = useMutation(CREATE_USER);

    return(
        <div className="jumbotron mt-4">
        <div className="display-4 d-flex justify-content-center">
          <div className="card">
            <div className="card-header justify-content-center">
              <h1 className="display-4 d-flex justify-content-center"> Registrarse </h1>
            </div>
            <div className="card-body">
              <form onSubmit={async e=>{
                  e.preventDefault();



                  
                  await createUser({variables: {name,email,password}});
                  toast.success('Se ha registrado exitosamente');
                  history.push('/iniciar');
                  //window.location.href="/iniciar";
              }}>
                
                  <div className="form-group m-1">
                    <input type="text"  className="form-control" placeholder="Username" autofocus onChange={e => setName(e.target.value)} value={name} />
                  </div>
                  
                
                <div className="form-group">
                  <div className="form-group m-1">
                    <input type="email"  className="form-control" placeholder="Correo" onChange={e => setEmail(e.target.value)} value={email} />
                  </div>
                  <div className="form-group m-1">
                    <input type="password"  className="form-control" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} value={password} />
                  </div>
                  {/* <div className="form-group m-1">
                    <input type="text"  className="form-control" placeholder="Confirmar contraseña" />
                  </div> */}
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
      </div>
    )
}

export default RegistrarseNavigation;