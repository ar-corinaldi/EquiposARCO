import React from "react";

function EquiposTable(props) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Cantidad</th>
            <th>Tipo de Cobro</th>
            <th>Valor</th>
            <th>Status</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <b>Laptop</b>
              <br />
              Brand Model VGN-TXN27N/B 11.1" Notebook PC
            </td>
            <td>1</td>
            <td>$1799.00</td>
            <td className="text-right">$1799.00</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <b>Warranty</b>
              <br />
              Two Year Extended Warranty - Parts and Labor
            </td>
            <td>3</td>
            <td>$499.00</td>
            <td className="text-right">$1497.00</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <b>LED</b>
              <br />
              80cm (32) HD Ready LED TV
            </td>
            <td>2</td>
            <td>$412.00</td>
            <td className="text-right">$824.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EquiposTable;
