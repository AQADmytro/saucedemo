import { usersData } from '../users.data';
import { errorMessages } from '../error-messages.data';

export const loginErrorCases = [
  {
    title: 'locked out user',
    username: usersData.lockedOut.username,
    password: usersData.lockedOut.password,
    expectedError: errorMessages.lockedOut,
  },
  {
    title: 'empty username',
    username: '',
    password: usersData.standard.password,
    expectedError: errorMessages.emptyUsername,
  },
  {
    title: 'empty password',
    username: usersData.standard.username,
    password: '',
    expectedError: errorMessages.emptyPassword,
  },
  {
    title: 'invalid credentials',
    username: 'invalid_user',
    password: 'wrong_password',
    expectedError: errorMessages.invalidCredentials,
  },
];
