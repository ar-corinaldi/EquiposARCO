import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import PrecioDetail from "./PrecioDetail";
import PrecioHeader from "./PrecioHeader";

function PrecioTable(props) {
  const [hideFields] = useState(["__v", "_id"]);
  if (!props.precios || props.precios.length === 0) {
    return null;
  }
  return (
    <Table>
      <thead>
        <PrecioHeader precio={props.precios[0]} hideFields={hideFields} />
      </thead>
      <tbody>
        {props.precios.map((precio) => (
          <PrecioDetail precio={precio} hideFields={hideFields} />
        ))}
      </tbody>
    </Table>
  );
}

export default PrecioTable;
