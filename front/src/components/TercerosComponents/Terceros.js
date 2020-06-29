import React, { useState, useEffect } from "react";
import "./Terceros.css";
import Card from "react-bootstrap/Card";

function Terceros(params) {
  const [idTercero, setId] = useState("");
  useEffect(() => {
    async function prueba() {
      console.log("wtf");
      const res = await fetch("/terceros");
      const terceros = await res.json();
      console.log(terceros);
      setId(terceros[0]._id);
    }
    prueba();
    
  }, []);

  return (
    <div id="bodegasActualesWraper">
      <Card>
        <Card.Text>Hola</Card.Text>
        <Card.Text>{idTercero}</Card.Text>
      </Card>
    </div>
  );
}

export default Terceros;
