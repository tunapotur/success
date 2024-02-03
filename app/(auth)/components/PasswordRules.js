//TODO: Email, Name, Password gibi text mesajları için ayrı bir dosya yap oraya taşı.
export const EmailIncorrectText =
  "The e-mail address is incorrect. Please correct your e-mail address and enter it again.";
export const NameIncorrectText = "The name must be at least 6 character";
export const PassIncorrectMessage =
  "This password doesn't follow the rules. Please correct your password and enter it again.";

export const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,16}$/;

const PasswordRules = {
  minLength: {
    key: 0,
    regex: /.{8,}/,
    text: "Password must have at least minimum 8 characters in length",
    textShort: "minimum 8 characters in length",
  },
  maxLength: {
    key: 1,
    regex: /^.{0,16}$/,
    text: "Password must have at least maximum 16 characters in length",
    textShort: "maximum 16 characters in length",
  },
  between: {
    key: 2,
    regex: /^.{8,16}$/,
    text: "Password must have at least between 8 and 16 characters in length",
    textShort: "between 8 and 16 characters in length",
  },
  digit: {
    key: 3,
    regex: /[0-9]/,
    text: "Password must have at least one digit. [0-9]",
    textShort: "one digit. [0-9]",
  },
  lowercase: {
    key: 4,
    regex: /[a-z]/,
    text: "Password must have at least one lowercase English letter. [a-z]",
    textShort: "one lowercase English letter. [a-z]",
  },
  uppercase: {
    key: 5,
    regex: /[A-Z]/,
    text: "Password must have at least one uppercase English letter. [A-Z]",
    textShort: "one uppercase English letter. [A-Z]",
  },
  special: {
    key: 6,
    regex: /[#?!@$%^&*_-]/,
    text: "Password must have at least one special character. [#?!@$%^&*_-]",
    textShort: "one special character. [#?!@$%^&*_-]",
  },
  noWhiteSpace: {
    key: 7,
    regex: /(?!^[ ]*$)^\S+$/,
    text: "Password must have at least no space character",
    textShort: "no space character",
  },
};

export default PasswordRules;

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

/*
Password must have at least a minimum 8 characters in length    
Password must have at least a maximum 16 characters in length

Password must have between 8 and 16 characters in length
 */
