import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CookieConsent from "./components/common/CookieConsent";

function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <CookieConsent />
    </>
  );
}

export default App;
