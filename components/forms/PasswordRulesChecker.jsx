import PasswordRules from "./PasswordRules";

function PasswordRulesChecker({ password }) {
  return (
    <div className="ml-2 mt-2">
      <h3 className="mb-1 font-medium">Password must have at least</h3>
      <div className="ml-1 flex flex-col gap-y-0.5">
        {[
          PasswordRules.between,
          PasswordRules.digit,
          PasswordRules.lowercase,
          PasswordRules.uppercase,
          PasswordRules.special,
          PasswordRules.noWhiteSpace,
        ].map((rule) => (
          <RuleCheck
            key={rule.key}
            regex={rule.regex}
            password={password}
            ruleText={rule.textShort}
          />
        ))}
      </div>
    </div>
  );
}

function RuleCheck({ regex, password, ruleText }) {
  const regexTest = regex.test(password);

  return (
    <div>
      <p
        className={`flex flex-row text-sm leading-none ${regexTest ? "text-success" : "text-destructive"}`}
      >
        <span className="font-bold">{regexTest ? "✓" : "×"}</span>
        <span className="ml-0.5 font-light">{ruleText}</span>
      </p>
    </div>
  );
}

export default PasswordRulesChecker;

// const {
//   between,
//   digit,
//   lowercase,
//   uppercase,
//   special,
//   noWhiteSpace,
// } = require("./PasswordRules");
