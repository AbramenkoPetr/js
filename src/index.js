import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { HomePage, ProfilePage, ChatPage } from "./pages";
import { Header } from "./components";
import { CustomThemeProvider } from "./theme-context";
import { store, persistor } from "./store";
import "./global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <CustomThemeProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat/*" element={<ChatPage />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </CustomThemeProvider>
    </PersistGate>
  </Provider>
);
