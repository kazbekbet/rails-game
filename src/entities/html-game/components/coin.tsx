import { memo } from 'react';
import coin from '@assets/coin.svg';
import styles from '@entities/html-game/styles/html-game.module.scss';
import classNames from 'classnames';

interface CoinProps {
  width: number;
  top: number;
  left: number;
  height: number;
  show: boolean | undefined;
}

export const Coin = memo(({ width, top, left, height, show }: CoinProps) => {
  const className = classNames(styles.coin, {
    [styles.collected!]: !show,
  });

  console.log('coin');

  return <div className={className} style={{ width, top, left, height }} />;
});
