/**
 * @param {amount,decimalCount,decimal,thousands} monto a convertir, la cantidad de decimales, simbolo separacion decimales y de miles
 * Recibe un string con el valor en pesos sin el signo de $
 * Entrega un string en formato: $ xxx,xxx.xx
 */
function formatoPrecios(
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) {
  if (amount) {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        "$ " +
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  }
}

export default formatoPrecios;
