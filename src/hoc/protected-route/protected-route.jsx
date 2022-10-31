import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectAuth } from "services/slices/auth-slice";
import { AUTH_STATUS, ROUTES } from "utils/constants";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { status } = useSelector(selectAuth);

  if (status === AUTH_STATUS.pending) {
    return <AuthPlaceholder />;
  }

  return status === AUTH_STATUS.ok ? children : <Navigate to={ROUTES.login.path} state={{ from: location }} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
