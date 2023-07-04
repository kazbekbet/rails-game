import React from 'react';

/**
 * Тип контекста состояния загрузки видео.
 */

export type TVideoDownloadStatusContext = {
  videoIsLoaded: boolean;
  setVideoIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};
