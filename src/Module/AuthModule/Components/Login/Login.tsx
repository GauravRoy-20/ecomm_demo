import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Form, Button, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../Slice/userSlice';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { login } from '../../../../Slice/authSlice';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { email: storedEmail, password: storedPassword } =
    useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | undefined>(
    undefined,
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (data: any) => {
    const { email, password } = data;
    if (
      email?.toLowerCase() === storedEmail?.toLowerCase() &&
      password === storedPassword
    ) {
      console.log('Login successful');
      setToastMessage('Login successful');
      dispatch(login());
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      console.log('Email or password incorrect');
      setToastMessage('Email or password incorrect');
    }
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <Card style={{ width: '300px' }}>
          <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>

            <Form onSubmit={handleSubmit(submitForm)}>
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  maxLength={30}
                  placeholder="Enter email"
                  {...register('email', {
                    required: true,
                    maxLength: 30,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                />
                {errors.email?.type === 'required' && (
                  <span className="text-danger">Email is required</span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span className="text-danger">Invalid email format</span>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter password"
                    {...register('password')}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle visibility"
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </div>
              </Form.Group>
              <div className="d-grid gap-2 mt-3">
                <Button type="submit" variant="primary">
                  Login
                </Button>
              </div>
            </Form>

            <div className="text-center mt-2">
              <Link to="/register">Register</Link>
            </div>
          </Card.Body>
        </Card>
        <Toast
          show={showToast}
          onClose={handleToastClose}
          delay={3000}
          autohide
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '200px',
            textAlign: 'center',
            backgroundColor:
              toastMessage === 'Login successful' ? '#28a745' : '#dc3545',
          }}
        >
          <Toast.Body style={{ color: '#fff' }}>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default Login;
