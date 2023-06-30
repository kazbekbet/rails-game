import { memo } from 'react';
import coin from '@assets/coin.svg';

interface CoinProps {
  width: number;
  top: number;
  left: number;
  height: number;
}

export const Coin = memo(({ width, top, left, height }: CoinProps) => {
  return <img src={coin} style={{ position: 'absolute', width, top, left, height }} />;
});
