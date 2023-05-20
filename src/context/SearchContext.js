import React, { createContext, useState } from "react";

const SearchContext = createContext({});

const SearchProvider = (props) => {
  const [searchText, setSearchText] = useState("");
  const [showDetail, setShowDetail] = useState(false);

  console.log(searchText);

  return (
    <SearchContext.Provider
      value={{ searchText, setSearchText, showDetail, setShowDetail }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
