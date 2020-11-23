interface ValidateResponse {
  isValid: boolean;
  messages: string[];
}

export function validate(identifier: string): ValidateResponse {
  const messages: string[] = [];

  if (!identifier) {
    messages.push('Parameter IDENTIFIER is not set');
  }

  if (identifier.length !== 11) {
    messages.push('Parameter IDENTIFIER must have 11 numbers');
  }

  const isValid = !messages.length;

  return { isValid, messages };
}
