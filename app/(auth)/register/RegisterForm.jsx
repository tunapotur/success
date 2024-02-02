// *Regex Test
// https://rubular.com/r/9TIe3qiNoujkxN
// https://uibakery.io/regex-library/password
/*
* Strong password regex
Has minimum 8 characters in length. Adjust it by modifying {8,}
At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
At least one lowercase English letter.  You can remove this condition by removing (?=.*?[a-z])
At least one digit. You can remove this condition by removing (?=.*?[0-9])
At least one special character,  You can remove this condition by removing (?=.*?[#?!@$%^&*_-])
*/

function RegisterForm() {
  return (
    <>
      <p>Register Form</p>
    </>
  );
}

export default RegisterForm;
