import type { FC } from 'react';

type Props = {
  current: number;
  total: number;
};

export const ProgressBar: FC<Props> = ({ current, total }) => {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="progress" aria-label={`Question ${current + 1} of ${total}`}>
      <div className="progress-info">
        <span>Question {current + 1} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-outer" aria-hidden>
        <div className="progress-inner" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;


