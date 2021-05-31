
/**
 *
 * @param {*} object
 * @returns {boolean} Whether an object is an instance of 'Object'
 */
 export function isObject(object) {
  return Object.is(object, undefined) || Object.is(object, null) || Object.is(object, NaN) ? false : object.constructor.name === 'Object';
}

/**
 *validate the email
 * @param {String} mail
 * @returns {Boolean} Returns a Boolean value that indicates whether or not a the email is valid or not.
 */
export function validateEmail(mail) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
}

/**
 * Gets an array of number with passed length within a range
 * @param {Number} length
 * @param {Object} range
 * @param {Number} [range.min]
 * @param {Number} [range.max]
 * @returns {Array<Number>}
 */
export function getRandomNumbersInRange (length, range) {
  const {min, max} = range;
  const arr = [];
  while(arr.length < length){
    const num = Math.floor(Math.random() * (max - min) + min);
    if(arr.indexOf(num) === -1) arr.push(num);
  }

  return arr;
}