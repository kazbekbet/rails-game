import { createContext } from 'react';
import { TVideoDownloadStatusContext } from './types';
import { INITIAL_STATE } from './constants';

/**
 * Контекст состояния загрузки видео.
 */
export const VideoDownloadStatusContext = createContext<TVideoDownloadStatusContext>(INITIAL_STATE);
