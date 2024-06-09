import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAuth, logout } from '../Slice/authSlice';
import { selectUser, updateUser } from '../Slice/userSlice';
import { Person } from 'react-bootstrap-icons';
import styles from './CustomNavbar.module.css';
import { setCategories } from '../Slice/productCategorySlice';
import { setData } from '../Slice/productListDataSlice';

const CustomNavbar = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  const { fullName } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(updateUser({}));
    dispatch(setCategories([]));
    dispatch(setData(null));
  };

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between px-5">
      <Navbar.Brand as={Link} to="/" className="pl-3">
        Ecomm App
      </Navbar.Brand>
      <Nav className="pr-3">
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          {isAuthenticated ? (
            <>
              <Dropdown.Item disabled className={styles.dropdownItem}>
                <div className={styles.dropdownItemContent}>
                  <Person className="mr-2" />
                  <span className={styles.userName}>{fullName}</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </>
          ) : (
            <>
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">
                Register
              </NavDropdown.Item>
            </>
          )}
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
