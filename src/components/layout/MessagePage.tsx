'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

import { buttonStyles, type ButtonVariant } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { StateView } from '@/shared/StateView';
import { Link } from '@/utils/navigation';

type MessagePageProps = {
  icon: ReactNode;
  title: string;
  description: string;
  tone?: 'neutral' | 'danger';
  /** Button or link shown under the message. */
  action: ReactNode;
};

const Page = styled(Container)`
  padding-block: 40px;
`;

/** Button-styled link for the action slot of a message page. */
export const MessagePageLink = styled(Link)<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

/** Full-page message used by the not-found and error routes. */
export function MessagePage({ icon, title, description, tone, action }: MessagePageProps) {
  return (
    <Page>
      <StateView
        icon={icon}
        title={title}
        titleAs="h1"
        description={description}
        tone={tone}
        action={action}
      />
    </Page>
  );
}
