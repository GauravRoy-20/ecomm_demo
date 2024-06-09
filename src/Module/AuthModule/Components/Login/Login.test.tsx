import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { store } from '../../../../store';

describe('Login component', () => {
  test('renders login form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('shows error message for invalid email format', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(loginButton);

    await screen.findByText(/Invalid email format/i);
  });

  test('shows error message for missing email', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    await screen.findByText(/Email is required/i);
  });

  test('redirects to home page after successful login', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });
});
