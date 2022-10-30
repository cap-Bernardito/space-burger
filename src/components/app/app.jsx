import ProtectedRoute from "hoc/protected-route/protected-route";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { auth, selectAuth } from "services/slices/auth-slice";
import { AUTH_STATUS, ROUTES } from "utils/constants";

import { SmallCentered, WithSidebar } from "layouts";
import {
  ForgotPassword,
  Home,
  Ingredient,
  Login,
  NotFound,
  Profile,
  ProfileOrder,
  ProfileOrders,
  Register,
  ResetPassword,
} from "pages";

import AppHeader from "components/app-header/app-header";

const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectAuth);

  useEffect(() => {
    if (status === AUTH_STATUS.pending) {
      dispatch(auth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="text text_type_main-default">
        <AppHeader />
        <Routes>
          <Route element={<SmallCentered />}>
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.register} element={<Register />} />
            <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
            <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
            <Route path={ROUTES.ingredient} element={<Ingredient />} />
          </Route>

          <Route
            path={ROUTES.profile}
            element={
              <ProtectedRoute>
                <WithSidebar />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path={ROUTES.profileOrders} element={<ProfileOrders />} />
            <Route path={ROUTES.profileOrder} element={<ProfileOrder />} />
          </Route>

          <Route path="/" element={<Home />} />

          <Route element={<SmallCentered />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
      {<ToastContainer />}
    </>
  );
};

export default App;
