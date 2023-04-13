import { useEffect } from 'react';
import { config } from './config';
import { Game } from 'phaser';

export function PhaserGame() {
  new Game(config);

  return <></>;
}
