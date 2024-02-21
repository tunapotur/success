"use client";
import FormHeader from "../components/FormHeader";
import FormWrapper from "../components/FormWrapper";
import Form from "../components/Form";

import { Input, Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

function UserForm() {
  const { handleSubmit, control } = useForm();
  const onSubmitHandler = async (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <FormHeader header={"User Test"} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Controller
            render={({ field }) => <Input {...field} />}
            name="firstName"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />

          <Controller
            name="animals"
            render={({ field }) => (
              <Select {...field} label="Select an animal" className="max-w-xs">
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            )}
            control={control}
            defaultValue=""
          />

          <Button
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            Save
          </Button>
        </Form>
      </FormWrapper>
    </>
  );
}

export default UserForm;
