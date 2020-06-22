import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";
import "./prueba.css";

console.log("ahhhh")

let count = 0;
function Prueba() {
    count += 1;
    console.log("prueba");
    console.log(count);

    return (
        <div className="prueba">
            <p>Esto es una prueba</p>
            <h1>Pruebaaaa</h1>
        </div>
    );

}

// ReactDOM.render(
//     <React.StrictMode>
//         <Prueba />
//     </React.StrictMode>,
//     document.getElementById('root2')
// );
export default Prueba;