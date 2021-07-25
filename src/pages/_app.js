import { Provider } from 'react-redux'
import { Provider as NextAuthProvider } from "next-auth/client"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';
import store from "../slices/store"
import '../styles/globals.css'

let persistor = persistStore(store)

const MyApp = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </NextAuthProvider>
  );
}

export default MyApp
