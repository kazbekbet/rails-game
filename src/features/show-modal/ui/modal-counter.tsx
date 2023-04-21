import * as model from '../model';
import { MODALS_CONFIG } from '@libs/rails-lib';
import styles from '../styles/show-modal.module.scss';
import { useStore } from 're-event';
import cn from 'classnames';

export function ModalCounter() {
  const allCount = MODALS_CONFIG.length;

  return (
    <div className={cn(styles.counter, styles.container)}>
      <p className={cn(styles.counter, styles.label)}>Знакомств с коллегами: </p>
      <div>
        <h2 className={cn(styles.counter, styles.progress)}>
          <Counter /> из {allCount}
        </h2>
      </div>
    </div>
  );
}

function Counter() {
  const completedModals = useStore(model.completedModalIds);

  return <>{completedModals.length}</>;
}
