import * as z from "zod";

const DateHeaderDetail = z.object({
  //date: z.coerce.date(),
  date: z.string(),
  header: z
    .string()
    .min(16, { message: "Must be 16 or more characters long!" })
    .max(128, { message: "Must be 128 or fewer characters long!" })
    .trim(),
  detail: z
    .string()
    .min(16, { message: "Must be 16 or more characters long!" })
    .trim(),
});

export default DateHeaderDetail;
