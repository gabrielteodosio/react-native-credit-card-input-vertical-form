import valid from "card-validator";
import pick from "lodash.pick";
import values from "lodash.values";
import every from "lodash.every";
import { isValidCpf, removeNonNumber } from './Utilities'

const toStatus = validation => {
  return validation.isValid ? "valid" :
         validation.isPotentiallyValid ? "incomplete" :
         "invalid";
};

const FALLBACK_CARD = { gaps: [4, 8, 12], lengths: [16], code: { size: 3 } };
const fallback = {
  validatePostalCode: () => {},
  validateDocument: () => {}
}

export default class CCFieldValidator {
  constructor(displayedFields, validationFunctions = fallback) {
    this._displayedFields = [...displayedFields, 'rawDocument'];
    this._validatePostalCode = validationFunctions.validatePostalCode;
    this._validateDocument = validationFunctions.validateDocument;
  }

  validateValues = (formValues) => {
    const numberValidation = valid.number(formValues.number);
    const expiryValidation = valid.expirationDate(formValues.expiry);
    const maxCVCLength = (numberValidation.card || FALLBACK_CARD).code.size;
    const cvcValidation = valid.cvv(formValues.cvc, maxCVCLength);

    const validationStatuses = pick({
      number: toStatus(numberValidation),
      expiry: toStatus(expiryValidation),
      cvc: toStatus(cvcValidation),
      document: isValidCpf(removeNonNumber(formValues.document)) ? "valid" : "incomplete",
      rawDocument: isValidCpf(removeNonNumber(formValues.rawDocument)) ? "valid" : "incomplete",
      name: !!formValues.name ? "valid" : "incomplete",
      postalCode: this._validatePostalCode(formValues.postalCode),
    }, this._displayedFields);

    return {
      valid: every(values(validationStatuses), status => status === "valid"),
      status: validationStatuses,
    };
  };
}
