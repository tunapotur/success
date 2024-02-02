export const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,16}$/;

// *Regex Test
// https://rubular.com/r/9TIe3qiNoujkxN
// https://uibakery.io/regex-library/password

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
console.log(/^.{8,}$/.test('12345678'));
console.log(/^.{0,16}$/.test('12345678123456780'))
console.log(/([a-z])/.test('abc'));
console.log(/([A-Z])/.test('AHM'));
console.log(/([0-9])/.test('124'));
console.log(/^([#?!@$%^&*_-])/.test('#?!@$%^&*_-'));

password: z.string().regex(PasswordRegex, {
    message:
      "This password doesn't follow the rules. Please correct your password and enter it again.",
  }),




/^.{8,}$/ Password must have at least a minimum 8 characters in length
/^.{0,16}$/ Password must have at least a maximum 16 characters in length
/([a-z])/ Password must have at least one uppercase English letter. [a-z]
/([A-Z])/ Password must have at least one lowercase English letter. [A-Z]
/([0-9])/ Password must have at least one digit. [0-9]
/([#?!@$%^&*_-])/ Password must have at least one special character. [#?!@$%^&*_-]


password: z
    .string()
    .regex(/^.{8,}$/, {
      message: "Password must have at least a minimum 8 characters in length",
    })
    .regex(/^.{0,16}$/, {
      message: "Password must have at least a maximum 16 characters in length",
    })
    .regex(/([a-z])/, {
      message:
        "Password must have at least one uppercase English letter. [a-z]",
    })
    .regex(/([A-Z])/, {
      message:
        "Password must have at least one lowercase English letter. [A-Z]",
    })
    .regex(/([0-9])/, {
      message: "Password must have at least one digit. [0-9]",
    })
    .regex(/([#?!@$%^&*_-])/, {
      message:
        "Password must have at least one special character. [#?!@$%^&*_-]",
    }),
*/
