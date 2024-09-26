import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import InstallTool from './pages/Dashboard/InstallTool';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/Authentication/ResetPassword';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
 
 return loading ? (
   <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/"
          element={
            <Navigate to="/tool" replace />
          }
        />
        <Route
          path="/tool"
          element={
            <>
              <PageTitle title="インスタツール" />
              <InstallTool />
            </>
          }
        />
        <Route
          path="/auth/resetpassword"
          element={
            <>
              <PageTitle title="ResetPssword" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <PageTitle title="ResetPssword" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
