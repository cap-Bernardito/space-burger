import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { SmallCentered, WithSidebar } from "../../layouts/";
import { ForgotPassword, Home, Ingredient, Login, NotFound, Profile, Register, ResetPassword } from "../../pages/";

import AppHeader from "../app-header/app-header";

const App = () => {
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

          <Route element={<WithSidebar />}>
            <Route path="/profile" element={<Profile />} />
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
