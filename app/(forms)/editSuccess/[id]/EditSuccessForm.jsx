"use client";

import FormHeader from "@/components/forms/FormHeader";
import FormWrapper from "@/components/forms/FormWrapper";
import FormAdditionWrapper from "@/components/forms/FormAdditionWrapper";
import { Button, Input } from "@nextui-org/react";

import ButtonBack from "@/components/forms/ButtonBack";
import Form from "@/components/forms/Form";
import InputWrapper from "@/components/forms/InputWrapper";
import { useToast } from "@/components/ui/use-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { InputGeneralConfig } from "@/components/forms/InputGeneralConfig";
import { Heading } from "lucide-react";

const HeaderDateDetail = z.object({
  header: z
    .string()
    .min(16, { message: "Must be 16 or more characters long!" })
    .max(128, { message: "Must be 128 or fewer characters long!" })
    .trim(),
  date: z.date().safeParse(new Date()),
  detail: z
    .string()
    .min(16, { message: "Must be 16 or more characters long!" })
    .trim(),
});

function EditSuccessForm({ success }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [previousSuccessInfos, setPreviousSuccessInfos] = useState({
    header: success.header,
    date: success.date,
    detail: success.detail,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      header: "",
      date: "",
      detail: "",
    },
    resolver: zodResolver(HeaderDateDetail),
  });

  //These db values populates inputs for initial
  useEffect(() => {
    if (previousSuccessInfos) {
      setValue("header", previousSuccessInfos?.header);

      setMounted(true);
    }
  }, [setValue, previousSuccessInfos]);

  const onSubmitHandler = async ({ header }) => {
    console.log("Header", header);
  };

  return (
    <>
      <FormHeader header={"Edit Success"} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Header Input */}
          <InputWrapper isLoading={!mounted}>
            <Input
              {...register("header")}
              {...InputGeneralConfig}
              label={"Header"}
              type={"text"}
              isDisabled={isLoading || !mounted}
              endContent={
                <Heading className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
              }
              isInvalid={!!errors.header?.message}
              errorMessage={errors.header?.message}
              placeholder="Please enter header"
            />
          </InputWrapper>

          <InputWrapper>
            <p>{success.date}</p>
          </InputWrapper>
          <InputWrapper>
            <p>{success.detail}</p>
          </InputWrapper>
          {/* Save Button */}
          <Button
            // isLoading={isLoading || !mounted}
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {isLoading ? "Please Wait" : "Update"}
          </Button>
        </Form>
        <FormAdditionWrapper>
          {/* Back button */}
          {/*<ButtonBack isDisabled={isLoading || !mounted} />*/}
          <ButtonBack />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default EditSuccessForm;
