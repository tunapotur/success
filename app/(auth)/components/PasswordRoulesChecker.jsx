import { RegexValidationList } from "./PasswordRegex";

const { minLength, maxLength, digit, lowercase, uppercase, special } =
  RegexValidationList;

function PasswordRoulesChecker({ password }) {
  return (
    <div className="ml-2 mt-2">
      <h3 className="mb-1 font-medium">Password must have at least</h3>
      <RuleCheck
        regex={maxLength}
        password={password}
        ruleText={"a maximum 16 characters in length"}
      />
      <RuleCheck
        regex={minLength}
        password={password}
        ruleText={"a minimum 8 characters in length"}
      />
      <RuleCheck
        regex={lowercase}
        password={password}
        ruleText={"one lowercase English letter. [a-z]"}
      />
      <RuleCheck
        regex={uppercase}
        password={password}
        ruleText={"one uppercase English letter. [A-Z]"}
      />
      <RuleCheck
        regex={digit}
        password={password}
        ruleText={"one digit. [0-9]"}
      />
      <RuleCheck
        regex={special}
        password={password}
        ruleText={"one special character. [#?!@$%^&*_-]"}
      />
    </div>
  );
}

function RuleCheck({ regex, password, ruleText }) {
  return (
    <div>
      <p
        className={`text-sm leading-[1.3] ${regex.test(password) ? "text-success" : "text-destructive"}`}
      >
        {regex.test(password) ? <span>✓</span> : <span>×</span>}
        <span>&#32;</span>
        <span>{ruleText}</span>
      </p>
    </div>
  );
}

export default PasswordRoulesChecker;
