import React from 'react';
import { render } from '@testing-library/react';

import Navigation from './Navigation';

const onNavigate = jest.fn();

describe('<Navigation />', () => {
  test('All buttons disabled when there is not history', () => {
    const { getByTestId } = render(
      <Navigation currentIndex={0} onNavigate={onNavigate} historyLength={0} />
    );

    const btnBack = getByTestId('btn-back');
    const btnForward = getByTestId('btn-forward');
    expect(btnBack).toBeDisabled();
    expect(btnForward).toBeDisabled();
  });

  test('Forward button enable when there is history forward', () => {
    const { getByTestId } = render(
      <Navigation currentIndex={0} onNavigate={onNavigate} historyLength={2} />
    );

    const btnBack = getByTestId('btn-back');
    const btnForward = getByTestId('btn-forward');
    expect(btnBack).toBeDisabled();
    expect(btnForward).toBeEnabled();
  });

  test('Back button enable when there is history backward', () => {
    const { getByTestId } = render(
      <Navigation currentIndex={2} onNavigate={onNavigate} historyLength={2} />
    );

    const btnBack = getByTestId('btn-back');
    const btnForward = getByTestId('btn-forward');
    expect(btnBack).toBeEnabled();
    expect(btnForward).toBeDisabled();
  });

  test('All buttons enable when there is history backward and forward', () => {
    const { getByTestId } = render(
      <Navigation currentIndex={1} onNavigate={onNavigate} historyLength={3} />
    );

    const btnBack = getByTestId('btn-back');
    const btnForward = getByTestId('btn-forward');
    expect(btnBack).toBeEnabled();
    expect(btnForward).toBeEnabled();
  });

  test('Clicking back should call onNavigate', () => {
    const { getByTestId } = render(
      <Navigation currentIndex={1} onNavigate={onNavigate} historyLength={3} />
    );

    const btnBack = getByTestId('btn-back');
    btnBack.click();

    expect(onNavigate).toBeCalledWith('back');
  });

  test('Clicking forward should call onNavigate', () => {
    const { getByTestId } = render(
      <Navigation currentIndex={1} onNavigate={onNavigate} historyLength={3} />
    );

    const btnForward = getByTestId('btn-forward');
    btnForward.click();

    expect(onNavigate).toBeCalledWith('forward');
  });
});
