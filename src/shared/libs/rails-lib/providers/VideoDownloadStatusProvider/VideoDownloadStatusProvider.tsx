import React from 'react';

import { VideoDownloadStatusContext } from './context';

type TProps = {
  children: React.ReactNode;
};

/**
 * Провайдер контекста состояния загрузки видео.
 */
export const VideoDownloadStatusProvider: React.FC<TProps> = ({ children }) => {
  const [videoIsLoaded, setVideoIsLoaded] = React.useState(false);

  return (
    <VideoDownloadStatusContext.Provider
      value={{
        videoIsLoaded,
        setVideoIsLoaded,
      }}
    >
      {children}
    </VideoDownloadStatusContext.Provider>
  );
};
