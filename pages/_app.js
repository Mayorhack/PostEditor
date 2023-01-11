import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer limit={1} />
    </Layout>
  );
}

export default MyApp;
