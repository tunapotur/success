"use client";

import FormHeader from "../components/FormHeader";
import FormWrapper from "../components/FormWrapper";
import Form from "../components/Form";
import FormAdditionWrapper from "../components/FormAdditionWrapper";
import ButtonBack from "../components/ButtonBack";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { InputGeneralConfig } from "../components/InputGeneralConfig";
import { useForm, Controller } from "react-hook-form";

const onSubmitHandler = async () => {
  console.log("Form Submit");
};

function AddSuccessForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control } = useForm();

  const onSubmitHandler = async ({ date, header, detail }) => {
    console.log("Date", date);
    console.log("Header", header);
    console.log("Detail", detail);
  };

  return (
    <>
      <FormHeader header={"Add Success"} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Date Input */}
          <Input
            {...register("date", { required: true })}
            {...InputGeneralConfig}
            isRequired={true}
            label={"Date"}
            type={"date"}
            isDisabled={isLoading}
            placeholder="Please enter your success date"
          ></Input>

          {/* Header Input */}
          <Input
            {...register("header", { required: true })}
            {...InputGeneralConfig}
            isRequired={true}
            label={"Header"}
            type={"text"}
            isDisabled={isLoading}
            placeholder="Please enter your success header"
          ></Input>

          {/* Detail Input */}
          <Textarea
            {...register("detail", { required: true })}
            {...InputGeneralConfig}
            isRequired={true}
            label={"Detail"}
            type={"textarea"}
            isDisabled={isLoading}
            placeholder="Please enter your success detail"
            classNames={{
              base: "max-w",
              input: "resize-y min-h-[15rem]",
            }}
          ></Textarea>

          {/* Submit Button */}
          <Button
            isLoading={isLoading}
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {isLoading ? "Please Wait" : "Add Success"}
          </Button>
        </Form>

        <FormAdditionWrapper>
          {/* Back button */}
          <ButtonBack isDisabled={isLoading} />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default AddSuccessForm;
