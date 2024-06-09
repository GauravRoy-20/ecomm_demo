import "bootstrap/dist/css/bootstrap.min.css";
import "rc-pagination/assets/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CustomNavbar from "./Components/CustomNavbar";
import Login from "./Module/AuthModule/Components/Login/Login";
import Register from "./Module/AuthModule/Components/Register/Register";
import Home from "./Module/HomeModule/Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProductDetails from "./Module/HomeModule/Components/ProductDetails/ProductDetails";
import { useSelector } from "react-redux";
import { selectAuth } from "./Slice/authSlice";
import { ErrorPage } from "./Components/ErrorPage";

function App() {
  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <Router>
      <CustomNavbar />
      <Container>
        <Routes>
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/error" : "/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/error"
            element={
              <ProtectedRoute>
                <ErrorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
