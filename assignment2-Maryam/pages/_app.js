import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Layout from "./Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
