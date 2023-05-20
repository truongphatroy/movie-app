import React from "react";
import GlobalWrapper from "../../UI/GlobalWrapper";
import NavBar from "../../UI/navbar/NavBar";
import Banner from "../../components/banner/Banner";
import MovieList from "../../components/content/MovieList";

function Browse() {
  return (
    <GlobalWrapper styleName={GlobalWrapper}>
      <NavBar />
      <Banner />
      <MovieList />
    </GlobalWrapper>
  );
}

export default Browse;
