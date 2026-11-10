import * as yup from 'yup';

export type NewsletterFormValues = {
  email: string;
};

type NewsletterMessages = {
  required: string;
  email: string;
};

/** Builds the newsletter schema with messages of the active language. */
export function createNewsletterSchema(
  messages: NewsletterMessages,
): yup.ObjectSchema<NewsletterFormValues> {
  return yup.object({
    email: yup.string().trim().required(messages.required).email(messages.email),
  });
}
