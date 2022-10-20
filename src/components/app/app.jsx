import { Home, Register } from "../../pages/";
import AppHeader from "../app-header/app-header";

const App = () => {
  const currentPage = "register";
  let page = <Home />;

  switch (currentPage) {
    case "register":
      page = <Register />;
      break;
  }

  return (
    <div className="text text_type_main-default">
      <AppHeader />
      {page}
    </div>
  );
};

export default App;
