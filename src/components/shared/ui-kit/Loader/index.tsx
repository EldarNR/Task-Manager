// libraries
import type { FC } from 'react';
// components
import { Spinner, SpinnerSize } from '@blueprintjs/core';

interface LoaderProps {
  size?: SpinnerSize;
  fullScreen?: boolean;
  className?: string;
}

export const Loader: FC<LoaderProps> = ({
  size = SpinnerSize.STANDARD,
  fullScreen = false,
  className = '',
}) => {
  const containerClass = fullScreen
    ? `loader loader--fullscreen ${className}`
    : `loader loader--centered ${className}`;

  return (
    <div className={containerClass}>
      <div className="loader__content">
        <Spinner size={size} />
      </div>
    </div>
  );
};

export default Loader;
