import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// this import bring the functions inside the component
import { FavoritesContextProvider } from "./store/favorites-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";

ReactDOM.render(
  // Wrap aorund the Favorites context so all components can interact accordingly
  // We wrap our App component inside the router component so it watches our URLs
  <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextProvider>,
  document.getElementById("root")
);
