const festivities = {
  pascuas: "Pascuas",
  "san valentin": "San Valentín",
  navidad: "Navidad",
  "dia del padre": "Día del Padre",
  "dia de la madre": "Día de la Madre",
  "dia del nino": "Día del Niño",
};

export default function festivityCheck(productFestivity) {
  const isProductFestivity =
    productFestivity !== "no" ? productFestivity : false;
  const festivity = festivities?.[isProductFestivity];

  return festivity;
}
