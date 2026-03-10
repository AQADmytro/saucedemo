import { usersData } from '../users.data';
import { errorMessages } from '../error-messages.data';

export const loginErrorCases = [
  {
    title: 'locked out user',
    user: usersData.lockedOut,
    expectedError: errorMessages.lockedOut,
  },
  {
    title: 'empty username',
    user: { username: '', password: usersData.standard.password },
    expectedError: errorMessages.emptyUsername,
  },
  {
    title: 'empty password',
    user: { username: usersData.standard.username, password: '' },
    expectedError: errorMessages.emptyPassword,
  },
  {
    title: 'invalid credentials',
    user: { username: 'invalid_user', password: 'wrong_password' },
    expectedError: errorMessages.invalidCredentials,
  },
];
