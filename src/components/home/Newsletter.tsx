'use client';

import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/shared/Button';
import { createNewsletterSchema, type NewsletterFormValues } from '@/validations/newsletter.schema';

const INITIAL_VALUES: NewsletterFormValues = { email: '' };

const Wrapper = styled.section`
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 24px 32px;
  }
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const IconCircle = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  inline-size: 52px;
  block-size: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 800;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const HiddenLabel = styled.label`
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const EmailInput = styled(Field)<{ $invalid: boolean }>`
  flex: 1;
  min-inline-size: 0;
  min-block-size: 44px;
  padding-inline: 14px;
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Message = styled.p<{ $tone: 'danger' | 'success' }>`
  margin-block-start: 6px;
  color: ${({ theme, $tone }) => ($tone === 'danger' ? theme.colors.danger : theme.colors.success)};
  font-size: 13px;
`;

/**
 * Newsletter sign-up. The mock API has no endpoint for it, so a valid submit only
 * confirms on screen; the form still shows the Formik + Yup validation flow.
 */
export function Newsletter() {
  const t = useTranslations('newsletter');
  const tValidation = useTranslations('validation');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const inputId = useId();
  const messageId = useId();

  const validationSchema = useMemo(
    () =>
      createNewsletterSchema({
        required: tValidation('required'),
        email: tValidation('email'),
      }),
    [tValidation],
  );

  const handleSubmit = (
    _values: NewsletterFormValues,
    { resetForm }: FormikHelpers<NewsletterFormValues>,
  ) => {
    setIsSubscribed(true);
    resetForm();
  };

  return (
    <Wrapper aria-labelledby={`${inputId}-title`}>
      <Intro>
        <IconCircle>
          <Mail size={24} aria-hidden="true" />
        </IconCircle>
        <div>
          <Title id={`${inputId}-title`}>{t('title')}</Title>
          <Description>{t('description')}</Description>
        </div>
      </Intro>

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          const error = touched.email ? errors.email : undefined;

          return (
            <Form noValidate>
              <Row>
                <HiddenLabel htmlFor={inputId}>{t('emailLabel')}</HiddenLabel>
                <EmailInput
                  id={inputId}
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder={t('emailPlaceholder')}
                  $invalid={error !== undefined}
                  aria-invalid={error !== undefined}
                  aria-describedby={messageId}
                  onInput={() => setIsSubscribed(false)}
                />
                <Button type="submit">{t('submit')}</Button>
              </Row>
              <div id={messageId} aria-live="polite">
                {error && <Message $tone="danger">{error}</Message>}
                {!error && isSubscribed && <Message $tone="success">{t('success')}</Message>}
              </div>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
}
