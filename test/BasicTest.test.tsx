import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Square from '../src/Square';
import React from 'react';

describe('BasicTest', () => {

  it('renders', () => {

    expect(1+1).toEqual(2);

    render(<Square />)

    expect(screen.getByText('X')).toBeVisible();

  });



});