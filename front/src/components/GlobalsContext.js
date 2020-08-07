import React, { useState, useEffect } from 'react';


let globalContext = {
    crearOrden: {
        firstStep: "active",
        secondStep: "pending",
        bodega: {},
        cotizacion: {},
    }
}
let GlobalsContext = React.createContext({ globals: globalContext, setter: () => {}});

export default GlobalsContext;