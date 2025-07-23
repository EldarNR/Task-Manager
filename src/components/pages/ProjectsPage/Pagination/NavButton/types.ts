// types
import type { MaybeElement } from '@blueprintjs/core';
import type { BlueprintIcons_16Id } from '@blueprintjs/icons/lib/esnext/generated/16px/blueprint-icons-16';

export interface PaginationNavButtonProps {
  icon: BlueprintIcons_16Id | MaybeElement;
  title: string;
  onClick: () => void;
  disabled: boolean;
}
