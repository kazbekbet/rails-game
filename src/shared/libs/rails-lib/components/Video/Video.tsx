import React from 'react';
import { VideoDownloadStatusContext } from '../../providers/VideoDownloadStatusProvider';

export const Video = ({ src }: { src: string }) => {
  const { setVideoIsLoaded } = React.useContext(VideoDownloadStatusContext);
  return (
    <video
      onCanPlayThrough={() => {
        setVideoIsLoaded(true);
      }}
      src={src}
      autoPlay
    />
  );
};
