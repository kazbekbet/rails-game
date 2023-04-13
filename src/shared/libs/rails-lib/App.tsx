import React from 'react';
import { Content } from './modules';
import { ModalProvider } from './providers';

export const App: React.FC<{}> = () => (
  <ModalProvider>
    <Content />
  </ModalProvider>
);
