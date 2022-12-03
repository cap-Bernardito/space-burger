import { useCallback, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "hooks";
import { auth, selectAuth } from "services/slices/auth-slice";
import { getBurgerIngredients } from "services/slices/burger-ingredients-slice";
import { EAuthStatus, ROUTES } from "utils/constants";

import { SmallCentered, WithSidebar } from "layouts";
import {
  Feed,
  FeedOrder,
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

import ProtectedRoute from "hoc/protected-route/protected-route";

import AppHeader from "components/app-header/app-header";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import Modal from "components/modal/modal";
import OrderDetailsFull from "components/order-details-full/order-details-full";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useAppSelector(selectAuth);

  const background: Location | undefined = location?.state?.background;

  useEffect(() => {
    if (status === EAuthStatus.pending) {
      dispatch(auth());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const handleCloseModalIngredient = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <div className="text text_type_main-default">
        <AppHeader />

        <Routes location={background || location}>
          <Route element={<SmallCentered />}>
            <Route path={ROUTES.login.path} element={<Login pageTitle={ROUTES.login.title} />} />
            <Route path={ROUTES.register.path} element={<Register pageTitle={ROUTES.register.title} />} />
            <Route
              path={ROUTES.forgotPassword.path}
              element={<ForgotPassword pageTitle={ROUTES.forgotPassword.title} />}
            />
            <Route
              path={ROUTES.resetPassword.path}
              element={<ResetPassword pageTitle={ROUTES.resetPassword.title} />}
            />
            <Route path={ROUTES.ingredient.path} element={<Ingredient pageTitle={ROUTES.ingredient.title} />} />
          </Route>

          <Route
            path={ROUTES.profile.path}
            element={
              <ProtectedRoute>
                <WithSidebar />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile pageTitle={ROUTES.profile.title} />} />
            <Route
              path={ROUTES.profileOrders.path}
              element={<ProfileOrders pageTitle={ROUTES.profileOrders.title} />}
            />
          </Route>

          <Route
            path={ROUTES.profileOrder.path}
            element={
              <ProtectedRoute>
                <ProfileOrder pageTitle={ROUTES.profileOrder.title} />
              </ProtectedRoute>
            }
          ></Route>

          <Route path={ROUTES.feed.path} element={<Feed pageTitle={ROUTES.feed.title} />} />

          <Route path={ROUTES.feedOrder.path} element={<FeedOrder pageTitle={ROUTES.feedOrder.title} />} />

          <Route path={ROUTES.home.path} element={<Home pageTitle={ROUTES.home.title} />} />

          <Route element={<SmallCentered />}>
            <Route path={ROUTES.notFound.path} element={<NotFound pageTitle={ROUTES.notFound.title} />} />
          </Route>
        </Routes>

        {background && (
          <Routes>
            <Route
              path={ROUTES.ingredient.path}
              element={
                <Modal onClose={handleCloseModalIngredient} title="Детали ингридиента">
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={ROUTES.profileOrder.path}
              element={
                <Modal onClose={handleCloseModalIngredient} title="&nbsp;" type="order">
                  <OrderDetailsFull />
                </Modal>
              }
            />
            <Route
              path={ROUTES.feedOrder.path}
              element={
                <Modal onClose={handleCloseModalIngredient} title="&nbsp;" type="order">
                  <OrderDetailsFull />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
      {<ToastContainer />}
    </>
  );
};

export default App;
