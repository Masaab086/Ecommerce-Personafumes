import "../styles/globals.css";
import type { AppProps } from "next/app";
import store, { persistor } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Array<any>>([]);
  // const [latestArivals, setLatestArrivals] = useState<Array<any>>([]);
  // const [reviews, setReviews] = useState<Array<any>>([]);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle/1673075255724`)
      .then(({ data }) => {
        setProducts(data.bottles);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/page/theme`)
      .then(({ data }) => {
        setIsLightTheme(data.theme.lightTheme);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle/latest`)
  //     .then(({ data }) => {
  //       // console.log("data latest : ", data.bottles);
  //       setLatestArrivals(data.bottles);
  //     })
  //     .catch((err) => {
  //       console.log(handleAxiosResponseError(err));
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/review`)
  //     .then(({ data }) => {
  //       // console.log("Review : ", data);
  //       setReviews(data.reviews);
  //     })
  //     .catch((err) => {
  //       console.log(handleAxiosResponseError(err));
  //     });
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <LoaderProvider> */}
        {loading ? (
          <div
            className={`flex h-screen ${
              isLightTheme ? "bg-[#FDF3EB]" : "bg-black"
            }`}>
            <div className="m-auto">
              <Spinner
                className={`h-12 w-12 ${
                  isLightTheme ? "text-[#865D4C]" : "text-white"
                }`}
              />
            </div>
          </div>
        ) : (
          <>
            <Script
              strategy="lazyOnload"
              id="my-script"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script id="my-script" strategy="lazyOnload">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
            </Script>
            <Head>
              <title>Personafumes</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <Component
              {...pageProps}
              products={products}
              // latestArrivals={latestArivals}
              // reviews={reviews}
              isLightTheme={isLightTheme}
            />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              draggable={false}
              closeOnClick
              pauseOnHover
            />
          </>
        )}
        {/* </LoaderProvider> */}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
