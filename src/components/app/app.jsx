import { Route, Routes } from "react-router-dom";

import { SmallCentered } from "../../layouts/";
import { ForgotPassword, Home, Ingredient, Login, NotFound, Register, ResetPassword } from "../../pages/";

import AppHeader from "../app-header/app-header";

const App = () => {
  return (
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

        <Route path="/" element={<Home />} />

        <Route element={<SmallCentered />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
