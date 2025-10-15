
// Base exception for all DAL operations
export class DataAccessException extends Error {
  constructor(message, cause = null) {
    super(message)
    this.name = this.constructor.name
    this.cause = cause
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// Thrown when card validation fails
export class CardValidationException extends DataAccessException {
  constructor(message, originalError = null) {
    super(message, originalError)
  }
}


// Thrown when deck constraints are violated
export class DeckConstraintException extends DataAccessException {
  constructor(message, originalError = null) {
    super(message, originalError)
  }
}


// Thrown when external module operations fail unexpectedly
export class ExternalModuleException extends DataAccessException {
  constructor(operation, originalError = null) {
    super(`External module operation failed: ${operation}`, originalError)
    this.operation = operation
  }
}