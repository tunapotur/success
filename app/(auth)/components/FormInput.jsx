import { Input } from "@nextui-org/react";

function FormInput({
  label,
  type,
  size = "lg",
  radius = "sm",
  value,
  onChange,
}) {
  return (
    <Input
      label={label}
      type={type}
      size={size}
      radius={radius}
      onChange={onChange}
      value={value}
    ></Input>
  );
}

export default FormInput;
