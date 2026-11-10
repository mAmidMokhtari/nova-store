import 'styled-components';

import type { AppTheme } from '@/utils/theme';

declare module 'styled-components' {
  // Declaration merging requires an interface here.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
