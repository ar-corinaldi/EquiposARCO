import React from "react";
const categorias = ["unidad", "metro", "metro2", "metro3", "venta"];

const tiempo = ["hora", "dia cal", "dia habil", "semana", "mes", "anio"];

/**
 *
 * @param {string} tiempoString. String a formatear, debe se una de: "hora", "dia cal", "dia habil", "semana", "mes", "anio".
 * Si no lo es, se retornará un String vacío. Tiene que ser un match exacto, se usa ===. Se retorna todo sin mayúscula inicial.
 * @param {boolean} plural .Indica si el valor a retornar está en plural. Por defecto es false
 */
export function formatoTiempo(tiempoString, plural = false) {
  if (plural !== true) {
    try {
      plural = plural && plural > 1;
    } catch (e) {
      plural = true;
    }
  }

  if (!tiempoString) {
    return "";
  } else {
    if (tiempoString === "hora") {
      return plural ? "horas" : "hora";
    } else if (tiempoString === "dia cal") {
      return plural ? "días calendario" : "día calendario";
    } else if (tiempoString === "dia habil") {
      return plural ? "días hábiles" : "día hábil";
    } else if (tiempoString === "semana") {
      return plural ? "semanas" : "semana";
    } else if (tiempoString === "mes") {
      return plural ? "meses" : "mes";
    } else if (tiempoString === "anio") {
      return plural ? "años" : "año";
    } else {
      return "";
    }
  }
}

/**
 * @param {string} categoriaString. String a formatear, debe ser una de: "unidad", "metro", "metro2", "metro3", "venta". Si no se retorna una cadena vaía.
 * Tiene que ser un match exacto, se usa ===. Se retorna todo sin mayúscula inicial.
 * @param {boolean} plural. Indica si el valor a retornar está en plural. Por defecto es true
 */
export function formatoCategoria(categoriaString, plural = true) {
  if (!categoriaString) {
    return "";
  } else {
    if (categoriaString === "unidad") {
      return plural ? "unidades" : "unidad";
    } else if (categoriaString === "metro") {
      return plural ? "metros" : "metro";
    } else if (categoriaString === "metro2") {
      return plural ? "metros cuadrados" : "metro cuadrado";
    } else if (categoriaString === "metro3") {
      return plural ? "metros cúbicos" : "metro cúbico";
    } else if (categoriaString === "venta") {
      return plural ? "ventas" : "venta";
    } else {
      return "";
    }
  }
}

/**
 * Formatea los strings de categoria del modelo de precios y devuelve texto marcado con HTML. Usar solo si se va a insertar diirectamente dentro
 * de HTML o JSX. Se usa la etiqueta <sup> para los valores de medida de área y volumen.
 * @param {string} categoriaString. String a formatear, debe ser una de: "unidad", "metro", "metro2", "metro3", "venta". Si no se retorna una cadena vaía.
 * Tiene que ser un match exacto, se usa ===. Se retorna todo sin mayúscula inicial.
 * @param {boolean} plural. Indica si el valor a retornar está en plural. Por defecto es true
 */
export function formatoCategoriaHTML(categoriaString, plural = true) {
  console.log(categoriaString);
  if (!categoriaString) {
    return "";
  } else {
    if (categoriaString === "unidad") {
      return <span>{plural ? "unidades" : "unidad"}</span>;
    } else if (categoriaString === "metro") {
      return <span>{plural ? "metros" : "metro"}</span>;
    } else if (categoriaString === "metro2") {
      return (
        <span>
          m<sup>2</sup>
        </span>
      );
    } else if (categoriaString === "metro3") {
      return (
        <span>
          m<sup>3</sup>
        </span>
      );
    } else if (categoriaString === "venta") {
      return <span>{plural ? "ventas" : "venta"}</span>;
    } else {
      return "";
    }
  }
}
