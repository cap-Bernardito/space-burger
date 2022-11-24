import { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectAuth } from "services/slices/auth-slice";
import { EAuthStatus, ROUTES } from "utils/constants";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const { status } = useSelector(selectAuth);
  const refAuth = useRef<EAuthStatus>();

  if (status === EAuthStatus.pending) {
    return <AuthPlaceholder />;
  }

  let isReplaceHistory = true;

  // NOTE: только что разлогинились
  if (status === EAuthStatus.no && refAuth.current === EAuthStatus.ok) {
    isReplaceHistory = false;
  }

  refAuth.current = status;

  if (status === EAuthStatus.ok) {
    return children;
  }

  return <Navigate to={ROUTES.login.path} replace={isReplaceHistory} state={{ from: location }} />;
};

export default ProtectedRoute;
