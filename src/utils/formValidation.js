export default function formValidation(formData) {
  const errors = {};
  const { name, email, message } = formData.target.elements;
  const formattedData = {
    name: name.value,
    email: email.value,
    message: message.value,
  };
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formattedData.name)
    errors.name = "Debes rellenar el campo con tu nombre";

  if (!formattedData.email) {
    errors.email = "Debes rellenar el campo con tu correo electrónico";
  } else if (!email_pattern.test(formattedData.email)) {
    errors.email = "El correo electrónico no es correcto";
  }

  //   if (!formattedData.subject)
  if (!formattedData.message) {
    errors.message = "El pedido no debe de estar vacío";
  }

  return errors;
}
