// Middleware to validate the body of the request with a schema
export const validateData = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body) // Validate body
    next()
  } catch (err) {
    const errors = err.errors.map(error => ({ field: error.path[0], message: error.message })) // Get errors
    return res.status(400).json({ errors }) // Return all the errors
  }
}
