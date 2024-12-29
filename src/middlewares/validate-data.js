// Middleware para validar los datos enviados en la solicitud con un schema pasado por parámetro
export const validateData = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body) // Validar el cuerpo de la solicitud con el schema pasado por parámetro
    next()
  } catch (err) {
    return res.status(400).json({ errors: err.errors }) // Devuelve los errores si falló la validación
  }
}
