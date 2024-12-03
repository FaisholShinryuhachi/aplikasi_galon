import "../js/bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "core-js";

import App from "./App";
import store from "./store";
import { ApolloProvider } from "@apollo/client";
import client from "./libs/Client";

createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
);
