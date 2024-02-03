export const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,16}$/;

export const RegexValidationList = {
  minLength: /.{8,}/,
  maxLength: /^.{0,16}$/,
  digit: /[0-9]/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  special: /[#?!@$%^&*_-]/,
  noWhiteSpace: /(?!^[ ]*$)^\S+$/,
};

// *Regex Test
// https://rubular.com/r/9TIe3qiNoujkxN
// https://uibakery.io/regex-library/password
// https://rubular.com/r/7GtdVJR84VZvbt

/**
 * *Code Sample
 * https://webdesign.tutsplus.com/password-validation-with-javascript--cms-107222t
 * https://dev.to/themodernweb/here-is-how-i-made-a-strong-password-checker-using-javascript-3m9o
 */

/*
* Strong password regex rules
* 
Password must have at least
a minimum 8 characters in length
a maximum 16 characters in length
one uppercase English letter. [A-Z]
one lowercase English letter. [a-z]
one digit. [0-9]
one special character. [#?!@$%^&*_-]
*/

// TODO Boşluk için hata vermiyor. DÜZELTİLECEK
// https://stackoverflow.com/questions/19121375/regex-for-empty-string-or-white-space
// https://www.freecodecamp.org/news/how-to-include-empty-string-in-regex/

//TODO PasswordRegex için de boşluk var mı kontrol et. DÜZELTİLECEK
