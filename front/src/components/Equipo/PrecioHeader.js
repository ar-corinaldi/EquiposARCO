import React from "react";

function PrecioHeader(props) {
  let counter = 0;
  const headers = [];

  for (const header in props.precio) {
    if (
      !props.hideFields.includes(header) &&
      props.precio.hasOwnProperty(header)
    ) {
      let element = props.precio[header];
      if (element === -1) element = 0;
      headers.push(<th key={`header-${header}-${counter + 1}`}>{header}</th>);
      counter++;
    }
  }
  return <tr>{headers}</tr>;
}

export default PrecioHeader;
