import ProtectedRoute from "hoc/protected-route/protected-route";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { auth, selectAuth } from "services/slices/auth-slice";
import { authStatus } from "utils/constants";

import { SmallCentered, WithSidebar } from "layouts";
import { ForgotPassword, Home, Ingredient, Login, NotFound, Profile, Register, ResetPassword } from "pages";

import AppHeader from "components/app-header/app-header";

const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectAuth);

  useEffect(() => {
    if (status === authStatus.pending) {
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/ingredients/:id" element={<Ingredient />} />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <WithSidebar />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
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
