"use client";

import FormHeader from "@/components/forms/FormHeader";
import FormWrapper from "@/components/forms/FormWrapper";
import FormAdditionWrapper from "@/components/forms/FormAdditionWrapper";
import { Button } from "@nextui-org/react";

import ButtonBack from "@/components/forms/ButtonBack";
import Form from "@/components/forms/Form";
import InputWrapper from "@/components/forms/InputWrapper";
import { useToast } from "@/components/ui/use-toast";

function EditSuccessForm({ success }) {
  const { toast } = useToast();
  return (
    <>
      <FormHeader header={"Edit Success"} />
      <FormWrapper>
        <InputWrapper>
          <p>{success.header}</p>
        </InputWrapper>
        <InputWrapper>
          <p>{success.date}</p>
        </InputWrapper>
        <InputWrapper>
          <p>{success.detail}</p>
        </InputWrapper>
        <Form>
          {/* Save Button */}
          <Button
            // isLoading={isLoading || !mounted}
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {/*{isLoading ? "Please Wait" : "Update"}*/}
            Update
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
