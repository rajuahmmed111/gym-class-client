import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { router } from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <div className="max-w-screen-xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
