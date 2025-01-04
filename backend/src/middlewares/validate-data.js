// Middleware para validar los datos enviados en la solicitud con un schema pasado por parámetro
export const validateData = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body) // Validar el cuerpo de la solicitud con el schema pasado por parámetro
    next()
  } catch (err) {
    const errors = err.errors.map(error => ({ field: error.path[0], message: error.message })) // Obtener los errores de validación
    return res.status(400).json({ errors }) // Devuelve los errores si falló la validación
  }
}
