import { checkoutInfo } from '../checkout.data';
import { errorMessages } from '../error-messages.data';

export const checkoutValidationCases = [
  {
    title: 'missing first name',
    shippingInfo: { firstName: '', lastName: checkoutInfo.lastName, postalCode: checkoutInfo.postalCode },
    expectedError: errorMessages.emptyFirstName,
  },
  {
    title: 'missing last name',
    shippingInfo: { firstName: checkoutInfo.firstName, lastName: '', postalCode: checkoutInfo.postalCode },
    expectedError: errorMessages.emptyLastName,
  },
  {
    title: 'missing postal code',
    shippingInfo: { firstName: checkoutInfo.firstName, lastName: checkoutInfo.lastName, postalCode: '' },
    expectedError: errorMessages.emptyPostalCode,
  },
];
