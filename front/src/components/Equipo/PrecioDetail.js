import React from "react";

function PrecioDetail(props) {
  const bodies = [];
  let counter = 0;
  for (const header in props.precio) {
    if (
      !props.hideFields.includes(header) &&
      props.precio.hasOwnProperty(header)
    ) {
      let element = props.precio[header];
      if (element === -1) element = 0;
      bodies.push(<td key={`element-${element}-${counter + 1}`}>{element}</td>);
      counter++;
    }
  }
  return <tr>{bodies}</tr>;
}

export default PrecioDetail;
