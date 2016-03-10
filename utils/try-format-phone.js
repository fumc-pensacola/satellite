"use strict";

module.exports = function tryFormatPhone(phone) {
  let sanitized = String(phone).replace(/[^\d]/g, '');
  if (sanitized.length === 7) {
    let formatted = `+1850${sanitized}`;
    console.log(`Assuming area code: saving “${phone}” as “${formatted}”`);
    return formatted;
  }
  if (sanitized.length === 10) {
    return `+1${sanitized}`;
  }
  if (sanitized.length === 11 && sanitized[0] === '1') {
    return `+${sanitized}`;
  }
  if (!sanitized) {
    return null;
  }
  
  console.log(`Could not interpret phone number “${phone}”`);
  return phone;
}
