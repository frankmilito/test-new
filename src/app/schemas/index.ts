import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  jobTitle: z.string().nonempty({ message: "Job title is required" }),
  agreeToTerms: z.boolean(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean(),
});

export const companyDetailsSchema1 = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().nonempty("Select Industry"),
  companySize: z.string().nonempty("Select Size"),
  country: z.string().nonempty("Select Country"),
});

export const companyDetailsSchema2 = z.object({
  useCase: z.array(z.string()).nonempty("At least one selection is required"),
});

const singleChoiceSchema = z.object({
  type: z.literal("SINGLE_CHOICE"),
  questionText: z.string().nonempty("Enter Question name"),
  options: z.string().array(),
  required: z.boolean().optional(),
  allowOtherAnswer: z.boolean().optional(),
});
const multiChoiceSchema = z.object({
  type: z.literal("MULTIPLE_CHOICE"),
  questionText: z.string().nonempty("Enter Question name"),
  options: z.string().array(),
  required: z.boolean().optional(),
  allowOtherAnswer: z.boolean().optional(),
});

const textInputSchema = z.object({
  type: z.literal("TEXTINPUT_CHOICE"),
  questionText: z.string().nonempty("Enter Question name"),
  question: z.string().nonempty("Enter Question name"),
  required: z.boolean().optional(),
});

const textAreaSchema = z.object({
  type: z.literal("TEXTAREA_CHOICE"),
  questionText: z.string().nonempty("Enter Question name"),
  question: z.string().nonempty("Enter Question name"),
  required: z.boolean().optional(),
});
const moodRatingSchema = z.object({
  type: z.literal("MOOD_CHOICE"),
  questionText: z.string().nonempty("Enter Question name"),
  question: z.string().nonempty("Enter Question name"),
  options: z.array(z.string().nonempty("Option cannot be empty")),
  required: z.boolean().optional(),
});
const promoterSchema = z.object({
  type: z.literal("PROMOTER_CHOICE"),
  questionText: z.string().nonempty("Enter Question name"),
  question: z.string().nonempty("Enter Question name"),
  scale: z.number(),
  required: z.boolean().optional(),
  leftLabel: z.string().nullable().optional(),
  rightLabel: z.string().nullable().optional(),
});

export const questionSchema = z.discriminatedUnion("type", [
  singleChoiceSchema,
  multiChoiceSchema,
  moodRatingSchema,
  textInputSchema,
  textAreaSchema,
  promoterSchema,
]);
