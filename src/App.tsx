import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import AppLayout from './components/Layouts/AppLayout/AppLayout';
import AuthLayout from './components/Layouts/AuthLayout/AuthLayout';
import Loading from './components/Loading/Loading';
import ApiErrorModal from './components/Modals/ApiErrorModal/ApiErrorModal';
import { checkToken } from './core/services/app/checkToken/checkToken.slice';
import { setAppMounted } from './core/services/app/setAppMounted/setAppMounted.slice';
import { setPathname } from './core/services/app/setPathname/setPathname.slice';
import { setResponseInterceptor } from './core/services/axios';
import { setRemoteConfig } from './core/services/firebase/setRemoteConfig/setRemoteConfig.slice';
import { useAppDispatch, useAppSelector } from './core/services/hooks';
import { router } from './core/utilities/router';

function App() {
  const checkTokenState = useAppSelector((state) => state.app.checkToken);
  const isAppMounted = useAppSelector(
    (state) => state.app.setAppMounted.isMounted
  );
  const remoteConfigState = useAppSelector(
    (state) => state.firebase.setRemoteConfig
  );
  const me = useAppSelector((state) => state.app.setMe.me);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    setResponseInterceptor(dispatch);
    dispatch(setRemoteConfig());
    dispatch(checkToken());
    dispatch(setAppMounted(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPathname(location.pathname));
  }, [dispatch, location]);

  const isAppLoading = (): boolean => {
    return (
      !isAppMounted || remoteConfigState.loading || checkTokenState.loading
    );
  };

  const isAuthenticated = (): boolean => {
    return !!me;
  };

  const renderSuspense = (component: JSX.Element) => {
    return <React.Suspense fallback="">{component}</React.Suspense>;
  };

  const renderLoading = () => {
    return <Loading className="app-loading" fontSize={64} />;
  };

  const renderLayout = () => {
    return isAuthenticated() ? (
      <AppLayout>
        <Routes>
          <Route
            path={router.HOME}
            element={renderSuspense(<LazyHomePage />)}
          />
          <Route path="*" element={<Navigate to={router.HOME} />} />
        </Routes>
      </AppLayout>
    ) : (
      <AuthLayout>
        <Routes>
          <Route
            path={router.LOGIN}
            element={renderSuspense(<LazyLoginPage />)}
          />
          <Route path="*" element={<Navigate to={router.LOGIN} />} />
        </Routes>
      </AuthLayout>
    );
  };

  return (
    <div id="app">
      {isAppLoading() ? renderLoading() : renderLayout()}
      <ApiErrorModal />
    </div>
  );
}

export default App;

const LazyHomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const LazyLoginPage = React.lazy(
  () => import('./pages/Auth/LoginPage/LoginPage')
);
