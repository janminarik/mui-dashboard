import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import i18n from "../i18n/i18n";
import SuspenseWrapper from "../shared/components/SuspenseWrapper";
import { AppThemeProvider } from "../theme/AppThemeProvider";
import router from "./routes";
import { persistor, store } from "./store";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppThemeProvider>
            <SuspenseWrapper>
              <RouterProvider router={router} />
            </SuspenseWrapper>
          </AppThemeProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}

export default App;
