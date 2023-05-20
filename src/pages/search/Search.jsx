import React from "react";
import GlobalWrapper from "../../UI/GlobalWrapper";
import NavBar from "../../UI/navbar/NavBar";
import SearchForm from "../../components/searchform/SearchForm";
import ResultList from "../../components/resultlist/ResultList";
import { SearchProvider } from "../../context/SearchContext";

const Search = () => {
  return (
    <GlobalWrapper className="app">
      <NavBar />
      <SearchProvider>
        <SearchForm />
        <ResultList />
      </SearchProvider>
    </GlobalWrapper>
  );
};

export default Search;
