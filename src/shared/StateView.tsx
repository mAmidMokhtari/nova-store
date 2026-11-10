'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

import { Spinner } from './Spinner';

type StateTone = 'neutral' | 'danger';

type StateViewProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Usually a retry button or a link back to the products. */
  action?: ReactNode;
  tone?: StateTone;
  /** Element of the title; use a heading when the message is the main content of a page. */
  titleAs?: 'p' | 'h1' | 'h2';
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-block: 56px;
  padding-inline: 16px;
  text-align: center;
`;

const IconCircle = styled.span<{ $tone: StateTone }>`
  display: grid;
  place-items: center;
  inline-size: 68px;
  block-size: 68px;
  margin-block-end: 6px;
  border-radius: 50%;
  background: ${({ theme, $tone }) =>
    $tone === 'danger' ? theme.colors.dangerSoft : theme.colors.accentSoft};
  color: ${({ theme, $tone }) => ($tone === 'danger' ? theme.colors.danger : theme.colors.accent)};
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const Description = styled.p`
  max-inline-size: 420px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ActionSlot = styled.div`
  margin-block-start: 12px;
`;

/** Centered message used for empty, no-result and error states. */
export function StateView({
  icon,
  title,
  description,
  action,
  tone = 'neutral',
  titleAs = 'p',
}: StateViewProps) {
  return (
    <Wrapper role={tone === 'danger' ? 'alert' : 'status'}>
      {icon && <IconCircle $tone={tone}>{icon}</IconCircle>}
      <Title as={titleAs}>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <ActionSlot>{action}</ActionSlot>}
    </Wrapper>
  );
}

type LoadingStateProps = {
  label: string;
};

const LoadingWrapper = styled(Wrapper)`
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** Centered spinner with an announced label. */
export function LoadingState({ label }: LoadingStateProps) {
  return (
    <LoadingWrapper role="status" aria-live="polite">
      <Spinner size={30} />
      <span>{label}</span>
    </LoadingWrapper>
  );
}
