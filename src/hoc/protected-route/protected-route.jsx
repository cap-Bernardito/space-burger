import PropTypes from "prop-types";

import { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectAuth } from "services/slices/auth-slice";
import { AUTH_STATUS, ROUTES } from "utils/constants";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { status } = useSelector(selectAuth);
  const refAuth = useRef();

  if (status === AUTH_STATUS.pending) {
    return <AuthPlaceholder />;
  }

  let isReplaceHistory = true;

  // NOTE: только что разлогинились
  if (status === AUTH_STATUS.no && refAuth.current === AUTH_STATUS.ok) {
    isReplaceHistory = false;
  }

  refAuth.current = status;

  if (status === AUTH_STATUS.ok) {
    return children;
  }

  return <Navigate to={ROUTES.login.path} replace={isReplaceHistory} state={{ from: location }} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
