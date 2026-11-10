'use client';

import styled from 'styled-components';

/** Centers page content and applies the responsive side gutter. */
export const Container = styled.div`
  inline-size: 100%;
  max-inline-size: ${({ theme }) => theme.layout.maxWidth};
  margin-inline: auto;
  padding-inline: 16px;

  ${({ theme }) => theme.media.tablet} {
    padding-inline: 24px;
  }
`;
