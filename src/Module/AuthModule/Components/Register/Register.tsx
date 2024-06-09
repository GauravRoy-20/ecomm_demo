import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Form, Button, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../Slice/userSlice';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | undefined>(
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (data: any) => {
    if (data) {
      dispatch(updateUser(data));
      console.log(data);
      setToastMessage('Register Successfully');
      setShowToast(true);
      reset();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '300px' }}>
        <Card.Body>
          <Card.Title className="text-center">Sign Up</Card.Title>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group>
              <Form.Label htmlFor="fullName">Full Name</Form.Label>
              <Form.Control
                type="text"
                id="fullName"
                maxLength={30}
                placeholder="Enter fullname"
                {...register('fullName', { required: true, maxLength: 30 })}
              />
              {errors.fullName && (
                <span className="text-danger">Full name is required</span>
              )}
            </Form.Group>
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
                  maxLength={30}
                  placeholder="Enter password"
                  {...register('password', {
                    required: true,
                    maxLength: 30,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
                  })}
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle visibility"
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </div>
              {errors.password?.type === 'required' && (
                <span className="text-danger">Password is required</span>
              )}
              {errors.password?.type === 'pattern' && (
                <span className="text-danger">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, one digit, one special character, and be at
                  least 8 characters long
                </span>
              )}
            </Form.Group>
            <div className="text-center mt-3">
              <Button type="submit" variant="success">
                Register
              </Button>
            </div>
            <div className="text-center mt-2">
              <Link to="/login">Login</Link>
            </div>
          </Form>
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
          backgroundColor: '#28a745',
        }}
      >
        <Toast.Body style={{ color: '#fff' }}>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Register;
