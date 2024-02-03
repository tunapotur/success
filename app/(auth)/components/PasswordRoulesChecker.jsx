import { RegexValidationList } from "./PasswordRegex";

const { between, digit, lowercase, uppercase, special, noWhiteSpace } =
  RegexValidationList;

function PasswordRoulesChecker({ password }) {
  return (
    <div className="ml-2 mt-2">
      <h3 className="mb-1 font-medium">Password must have at least</h3>
      <div className="ml-1 flex flex-col gap-y-0.5">
        <RuleCheck
          regex={between}
          password={password}
          ruleText={"between 8 and 16 characters in length"}
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
        <RuleCheck
          regex={noWhiteSpace}
          password={password}
          ruleText={"no space character"}
        />
      </div>
    </div>
  );
}

function RuleCheck({ regex, password, ruleText }) {
  return (
    <div>
      <p
        className={`flex flex-row text-sm leading-none ${regex.test(password) ? "text-success" : "text-destructive"}`}
      >
        <span className="font-bold">{regex.test(password) ? "✓" : "×"}</span>
        <span className="ml-0.5 font-light">{ruleText}</span>
      </p>
    </div>
  );
}

export default PasswordRoulesChecker;
