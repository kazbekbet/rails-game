import React from 'react';
import { VideoDownloadStatusContext } from '../../providers/VideoDownloadStatusProvider';

type TComponentProps = {
  children: string[];
  delay?: number;
  time?: number;
};

type TProps = TComponentProps & {
  component: React.ComponentType<TComponentProps>;
};
export const VideoDownloadStatusWrapper: React.FC<TProps> = ({ component, children, delay, time }) => {
  const { videoIsLoaded } = React.useContext(VideoDownloadStatusContext);
  const Component = component;
  if (!videoIsLoaded) return null;
  return (
    <Component delay={delay} time={time}>
      {children}
    </Component>
  );
};
