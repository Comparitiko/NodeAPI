// Middleware to validate the body of the request with a schema
export const validateData = (schema) => (req, res, next) => {
  const parser = schema.safeParse(req.body) // Validate body
  if (!parser.success) {
    const errors = parser.error.issues.map(error => ({ field: error.path[0], message: error.message })) // Get errors

    return res.status(400).json({ errors }) // Return all the errors
  }
  // If the parser is successful, continue to the next middleware
  next()
}
