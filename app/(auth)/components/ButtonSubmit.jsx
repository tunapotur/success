import { Button } from "@nextui-org/react";

//TODO eksik kaldı devam et
function ButtonSubmit({}) {
  return (
    <Button
      isLoading={isLoading}
      type="submit"
      size="lg"
      radius="sm"
      isDisabled={!email || !password}
      variant="shadow"
      className="bg-primary text-primary-foreground"
    >
      {isLoading ? "Please Wait" : "Sign In"}
    </Button>
  );
}

export default ButtonSubmit;
