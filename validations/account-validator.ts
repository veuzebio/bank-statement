import { CreateAccountPayload } from '../interfaces/models';

interface ValidateResponse {
  isValid: boolean;
  messages: string[];
}

export function validate(payload: CreateAccountPayload): ValidateResponse {
  const messages: string[] = [];
  const { name, age } = payload;

  if (!name) {
    messages.push('Parameter NAME is not correct');
  }

  if (!age) {
    messages.push('Parameter AGE is not correct');
  }

  const isValid = !messages.length;

  return { isValid, messages };
}
