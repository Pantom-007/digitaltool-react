import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ChatTool from './pages/Dashboard/ChatTool';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/Authentication/ResetPassword';
import BlockArticleTool from './pages/Dashboard/BlockArticle';
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
          path="/auth/login"
          element={
            <>
              <PageTitle title="ログイン" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/registry"
          element={
            <>
              <PageTitle title="新規登録" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/"
          element={
            <Navigate to="/chattool" replace />
          }
        />
        <Route
          path="/chattool"
          element={
            <>
              <PageTitle title="インスタツール" />
              <ChatTool title={'インスタツール'} />
            </>
          }
        />
        <Route
          path="/blockArticle"
          element={
            <>
              <PageTitle title="ブログ記事生成" />
              <BlockArticleTool title={'ブログ記事生成'} />
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