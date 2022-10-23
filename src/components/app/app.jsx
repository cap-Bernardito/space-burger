import { Route, Routes } from "react-router-dom";

import { ForgotPassword, Home, Login, NotFound, Register, ResetPassword } from "../../pages/";

import AppHeader from "../app-header/app-header";

const App = () => {
  return (
    <div className="text text_type_main-default">
      <AppHeader />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
