import React, { createContext, useState } from "react";

// createContext(init_value) is a JS object that will contain a react component
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  // added here as well to help with IDE autocompletion
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

// Provide Context to all the components interested to listen to the values
// Responsible for managing the context values
// FavoritesContextProvider needs to be a wrapped around all the components
// interested on this context
export function FavoritesContextProvider(props) {
  // manage the state
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup) {
    // since we depend on the last snapshot, let's pass a function for the
    // state update function. This will get the latest snapshot
    // update state
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      // filter returns an array where we can filtering, if is equal
      // we drop the item
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  function itemIsFavoriteHAndler(meetupId) {
    // true if the meetupId is saved in our favorites
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  // passed to the provider to pass the latest values to the context
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    // this is a pointer to the handler function
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHAndler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
