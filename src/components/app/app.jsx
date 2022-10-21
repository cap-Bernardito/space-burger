import { Home, NotFound, Register } from "../../pages/";
import { Route, Routes } from "react-router-dom";
import AppHeader from "../app-header/app-header";

const App = () => {
  return (
    <div className="text text_type_main-default">
      <AppHeader />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
