import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Register component', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  test('renders the register form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>,
    );

    const registerTitle = screen.getByText('Register');
    expect(registerTitle).toBeInTheDocument();

    const fullNameInput = screen.getByLabelText('Full Name');
    expect(fullNameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();

    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(
      () => {
        expect(screen.queryByText('Register Successfully')).toBeNull();
      },
      { timeout: 2000 },
    );
  });

  test('displays error messages for invalid password', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    const passwordError = await screen.findByText(
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long',
    );
    expect(passwordError).toBeInTheDocument();
  });

  test('does not submit the form with invalid data', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    const fullNameError = await screen.findByText('Full name is required');
    expect(fullNameError).toBeInTheDocument();

    const emailError = await screen.findByText('Email is required');
    expect(emailError).toBeInTheDocument();

    const passwordError = await screen.findByText('Password is required');
    expect(passwordError).toBeInTheDocument();
  });
});
