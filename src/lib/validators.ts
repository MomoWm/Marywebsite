import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  source: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "A few more words, please."),
  // honeypot
  company: z.string().max(0).optional(),
});

export const customOrderSchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional().or(z.literal("")),
  projectType: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  dimensions: z.string().optional().or(z.literal("")),
  colors: z.string().optional().or(z.literal("")),
  room: z.string().optional().or(z.literal("")),
  style: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  reference: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Tell Mary a little about your vision."),
  attachments: z.array(z.string()).optional(),
  company: z.string().max(0).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CustomOrderInput = z.infer<typeof customOrderSchema>;
