"use client";

import FormHeader from "@/components/forms/FormHeader";
import FormWrapper from "@/components/forms/FormWrapper";
import FormAdditionWrapper from "@/components/forms/FormAdditionWrapper";
import { Button, Input, Textarea } from "@nextui-org/react";

import ButtonBack from "@/components/forms/ButtonBack";
import Form from "@/components/forms/Form";
import InputWrapper from "@/components/forms/InputWrapper";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { InputGeneralConfig } from "@/components/forms/InputGeneralConfig";
import { Heading } from "lucide-react";
import TextareaWrapper from "@/components/forms/TextareaWrapper";
import DateHeaderDetail from "@/lib/resolver/DateHeaderDetail";
import objectDiff from "@/lib/objectDiff";
import { ToastAction } from "@/components/ui/toast";
import { format, parseISO } from "date-fns";

function EditSuccessForm({ success }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [previousSuccessInfos, setPreviousSuccessInfos] = useState({
    date: success.date.substring(0, 10),
    header: success.header,
    detail: success.detail,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DateHeaderDetail),
  });

  //These db values populates inputs for initial
  useEffect(() => {
    if (previousSuccessInfos) {
      setMounted(true);
    }
  }, [previousSuccessInfos]);

  const onSubmitHandler = async ({ date, header, detail }) => {
    try {
      setIsLoading(true);

      const newSuccessInfos = { date, header, detail };

      const changedSuccessInfos = objectDiff(
        previousSuccessInfos,
        newSuccessInfos,
      );

      // No Changes Check
      if (!changedSuccessInfos) {
        toast({
          variant: "destructive",
          title: "No changes",
          description: `There is no information to update the success!`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
        return;
      }

      // Updating success data
      const response = await fetch(`/api/success/${success._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedSuccessInfos),
      });

      if (response.ok) {
        const result = await response.json();

        setPreviousSuccessInfos({
          date: result.returnData.updatedSuccess.date.substring(0, 10),
          header: result.returnData.updatedSuccess.header,
          detail: result.returnData.updatedSuccess.detail,
        });

        toast({
          variant: "destructive",
          className:
            "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
          description: "Success update successful 👍",
          duration: 1000,
        });

        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Success Update Error",
          description: "Success updating failed",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      setIsLoading(false);

      toast({
        variant: "destructive",
        title: "Success Update Error",
        description: `Success updating failed. Error message: ${error}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <>
      <FormHeader header={"Edit Success"} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Date Input */}
          <InputWrapper isLoading={!mounted}>
            <Input
              {...register("date")}
              {...InputGeneralConfig}
              label={"Date"}
              type={"date"}
              isDisabled={isLoading || !mounted}
              isInvalid={!!errors.date?.message}
              errorMessage={errors.date?.message}
              placeholder="Please enter your success date"
              defaultValue={previousSuccessInfos?.date}
            />
          </InputWrapper>

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
              placeholder="Please enter your success header"
              defaultValue={previousSuccessInfos?.header}
            />
          </InputWrapper>

          {/* Detail Input */}
          <TextareaWrapper isLoading={!mounted}>
            <Textarea
              {...register("detail")}
              {...InputGeneralConfig}
              label={"Detail"}
              type={"textarea"}
              isDisabled={isLoading}
              isInvalid={!!errors.detail?.message}
              errorMessage={errors.detail?.message}
              placeholder="Please enter your success detail"
              defaultValue={previousSuccessInfos?.detail}
              classNames={{
                base: "max-w",
                input: "resize-y min-h-[15rem]",
              }}
            />
          </TextareaWrapper>

          {/* Update Button */}
          <Button
            isLoading={isLoading || !mounted}
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
          {/* Delete Button */}
          <Button
            isLoading={isLoading || !mounted}
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-danger-600 text-primary-foreground dark:bg-danger-300"
          >
            {isLoading ? "Please Wait" : "Delete"}
          </Button>

          {/* Back button */}
          <ButtonBack isDisabled={isLoading || !mounted} />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default EditSuccessForm;
