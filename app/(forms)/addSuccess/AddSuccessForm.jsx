"use client";

import FormHeader from "@/components/forms/FormHeader";
import FormWrapper from "@/components/forms/FormWrapper";
import Form from "@/components/forms/Form";
import FormAdditionWrapper from "@/components/forms/FormAdditionWrapper";
import ButtonBack from "@/components/forms/ButtonBack";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { InputGeneralConfig } from "@/components/forms/InputGeneralConfig";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function AddSuccessForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmitHandler = async ({ date, header, detail }) => {
    try {
      setIsLoading(true);

      // Creating new success
      const response = await fetch("api/addSuccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          header,
          detail,
        }),
      });

      // If new success created successfully.
      if (response.ok) {
        toast({
          variant: "destructive",
          className:
            "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
          description: "Success created successful 👍",
          duration: 1000,
        });
        setIsLoading(false);
        router.refresh();
        router.push("/");
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Registration Error",
          description: "Success creation failed!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Success Creation Error",
        description: `Success creation failed. ${error}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
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
