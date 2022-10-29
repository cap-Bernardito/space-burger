import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectAuth } from "services/slices/auth-slice";
import { authStatus, routes } from "utils/constants";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { status } = useSelector(selectAuth);

  if (status === authStatus.pending) {
    return <div className="container text-center pt-20">Аутентификация...</div>;
  }

  return status === authStatus.ok ? children : <Navigate to={routes.login} state={{ from: location }} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
