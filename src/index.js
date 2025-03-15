import React from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";
import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";

const language = navigator.language.startsWith("es") ? "es-ES" : "en-US";
const messages = language === "es-ES" ? localeEsMessages : localeEnMessages;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <IntlProvider locale={language} messages={messages}>
    <App />
  </IntlProvider>
);



