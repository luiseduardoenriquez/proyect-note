import React from 'react';
import {Link} from 'react-router-dom';

//Inicializamos las variables de session
import Cookies from 'universal-cookie';
const cookies = new Cookies();



const Home = () => {

     if (cookies.get('name')){


        return (
            <div className="jumbotron mt-4">
                
                    
                
                <h1 className="display-4"> Bienvenido {cookies.get('name')} </h1>
                    <p className="lead"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, alias?</p>
                    <hr className="my-4" />
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum veniam ex possimus aspernatur
                    neque obcaecati cumque libero, eum earum eveniet provident ullam repellat fugit ad tenetur ab 
                    dicta non quisquam.
                    </p>
                <Link to="/new-Note" className="btn btn-primary btn-lg btn-block">Crear Nota</Link>
                
          </div>
        )



     } else {


        return (
            <div className="jumbotron mt-4">
                
                    
                
                <h1 className="display-4"> NotesApp NodeJS + Mongodb + Graphql + React</h1>
                    <p className="lead"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, alias?</p>
                   
                    <div className=" ">

                        <div className="display-4 d-flex justify-content-center">
                            <img src="/ultra.jpg"  className="img2" alt="La foto esta buena" />
                        </div>

                     </div>
                   
                    <hr className="my-4" />
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum veniam ex possimus aspernatur
                    neque obcaecati cumque libero, eum earum eveniet provident ullam repellat fugit ad tenetur ab 
                    dicta non quisquam.
                    </p>
                <Link to="/iniciar" className="btn btn-primary btn-lg btn-block">Iniciar session</Link>
                
          </div>
        )




     }


    
}

export default Home;



/* import React from 'react'

const Home = () => (
    <h1>Home</h1>
)

export default Home; */