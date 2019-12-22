import React from 'react';

import { OnNavigate } from '../types';
import './Navigation.css';

interface Props {
  currentIndex: number;
  onNavigate: OnNavigate;
  historyLength: number;
}

const Navigation: React.FC<Props> = ({
  currentIndex,
  onNavigate,
  historyLength
}) => {
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < historyLength - 1;

  const onClickBack = () => onNavigate('back');
  const onClickForward = () => onNavigate('forward');

  return (
    <div id="navigation-container">
      {onClickBack && (
        <button
          data-testid="btn-back"
          type="button"
          className="btn-back"
          onClick={onClickBack}
          disabled={!canGoBack}
        >
          Back
        </button>
      )}
      {onClickForward && (
        <button
          data-testid="btn-forward"
          type="button"
          className="btn-forward"
          onClick={onClickForward}
          disabled={!canGoForward}
        >
          Forward
        </button>
      )}
    </div>
  );
};

export default Navigation;
