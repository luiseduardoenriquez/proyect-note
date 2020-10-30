import React from 'react';

const Nosotros = () => {
    return(
        <div className="jumbotron mt-4">
            <h1 className="display-4"> Nosotros</h1>
                <p className="lead"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, alias?</p>
                <hr className="my-4" />
                
                <div className="row container">

                    <div className="col">
                        <img src="/img1.jpg"  className="img1" alt="La foto esta buena" />
                    </div>

                    <div className="col">
                        <img src="/img2.jpg"  className="img1" alt="La foto esta buena" />
                    </div>

                    <div className="col">
                         <img src="/img3.jpg"  className="img1" alt="La foto esta buena" />
                    </div>

                </div>
                <hr className="my-4" />

                <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum veniam ex possimus aspernatur
                neque obcaecati cumque libero, eum earum eveniet provident ullam repellat fugit ad tenetur ab 
                dicta non quisquam.
                </p>
            
      </div>
    )
}

export default Nosotros;