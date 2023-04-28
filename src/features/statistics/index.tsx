import { Meetings } from './ui/meetings';
import { useMemo } from 'react';
import { createModel } from '@features/statistics/model';

export function Statistics() {
  const model = useMemo(createModel, []);

  return (
    <>
      <Meetings model={model} />
    </>
  );
}
