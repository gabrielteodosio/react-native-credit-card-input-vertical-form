import pick from "lodash.pick";
import valid from "card-validator";
import { removeNonNumber, removeLeadingSpaces } from "./Utilities";

const limitLength = (string = "", maxLength) => string.substr(0, maxLength);
const addGaps = (string = "", gaps) => {
  const offsets = [0].concat(gaps).concat([string.length]);

  return offsets.map((end, index) => {
    if (index === 0) return "";
    const start = offsets[index - 1];
    return string.substr(start, end - start);
  }).filter(part => part !== "").join(" ");
};

const formatToMask = (value, Mask) => {
  let maskBoolean

  const exp = /-|\.|\/|\(|\)| /g
  const numberSanitized = value.toString().replace(exp, '')

  let fieldPosition = 0
  let newFieldValue = ''
  let maskLength = numberSanitized.length

  for (let i = 0; i <= maskLength; i++) {
    maskBoolean = ((Mask.charAt(i) === '-') || (Mask.charAt(i) === '.') || (Mask.charAt(i) === '/'))
    maskBoolean = maskBoolean || ((Mask.charAt(i) === '(') || (Mask.charAt(i) === ')') || (Mask.charAt(i) === ' '))
    if (maskBoolean) {
      newFieldValue += Mask.charAt(i)
      maskLength++
    } else {
      newFieldValue += numberSanitized.charAt(fieldPosition)
      fieldPosition++
    }
  }

  return newFieldValue
}

const FALLBACK_CARD = { gaps: [4, 8, 12], lengths: [16], code: { size: 3 }, type: undefined };
export default class CCFieldFormatter {
  constructor(displayedFields) {
    this._displayedFields = [...displayedFields, 'type', 'rawDocument'];
  }

  formatValues = (values, permittedBrands) => {
    const card = valid.number(values.number).card || FALLBACK_CARD;

    let type = undefined
    const isPermitted = typeof card.type === 'string' && permittedBrands.reduce((acc, cur) => !acc ? !!cur.match(card.type.toLowerCase()) : acc, false)

    if (isPermitted) {
      type = card.type
    }

    return pick({
      type,
      number: this._formatNumber(values.number, card),
      expiry: this._formatExpiry(values.expiry),
      cvc: this._formatCVC(values.cvc, card),
      document: limitLength(this._formatDocument(values.document), 14),
      rawDocument: removeNonNumber(values.rawDocument),
      name: removeLeadingSpaces(values.name),
      postalCode: removeNonNumber(values.postalCode),
    }, this._displayedFields);
  };

  _formatDocument = (number) => {
    const numberSanitized = removeNonNumber(number);
    const formatted = formatToMask(""+numberSanitized, '000.000.000-00')
    return formatted
  }

  _formatNumber = (number, card) => {
    const numberSanitized = removeNonNumber(number);
    const maxLength = card.lengths[card.lengths.length - 1];
    const lengthSanitized = limitLength(numberSanitized, maxLength);
    const formatted = addGaps(lengthSanitized, card.gaps);
    return formatted;
  };

  _formatExpiry = (expiry) => {
    const sanitized = limitLength(removeNonNumber(expiry), 4);
    if (sanitized.match(/^[2-9]$/)) { return `0${sanitized}`; }
    if (sanitized.length > 2) { return `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`; }
    return sanitized;
  };

  _formatCVC = (cvc, card) => {
    const maxCVCLength = card.code.size;
    return limitLength(removeNonNumber(cvc), maxCVCLength);
  };
}
