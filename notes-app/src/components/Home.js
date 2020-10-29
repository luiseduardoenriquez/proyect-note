import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="jumbotron mt-4">
            <h1 className="display-4"> NotesApp NodeJS + Mongodb + Graphql + React</h1>
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
}

export default Home;



/* import React from 'react'

const Home = () => (
    <h1>Home</h1>
)

export default Home; */