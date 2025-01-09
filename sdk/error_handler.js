export class BuildAIError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.name = "BuildAIError";
    this.code = code;
  }
}

/**
 * Handles errors gracefully and logs details.
 * @param {Error} error
 */
export const handleError = (error) => {
  console.error(`[Error ${error.code || 500}]: ${error.message}`);
  // Optionally add additional error tracking here
};
