import React, { useState, useCallback } from "react";
import classes from "./ResultList.module.scss";
import { API_KEY } from "../../data/APIaddress";
import MovieItem from "../content/MovieItem";
import MovieDetail from "../content/MovieDetail";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
function ResultList() {
  // const [showDetail, setShowDetail] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState("");
  const [selectedMovie, setSelectedMovie] = useState();
  const inputText = useContext(SearchContext);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputText.searchText}&page=2&include_adult=false`;

  // handling show detail when click to image of film
  const handlerShowDetail = useCallback(
    (result) => {
      // if click is first time or click into other film
      if (currentMovieId === "" || currentMovieId !== result.id) {
        inputText.setShowDetail(true);
        setSelectedMovie(result);
        setCurrentMovieId(result.id);
        // if click to same image then close modal
      } else {
        inputText.setShowDetail(false);
        setCurrentMovieId("");
      }
    },
    [currentMovieId, inputText.setShowDetail, setCurrentMovieId]
  );

  // handling close detail modal when click to padding place
  const handlerHideDetail = () => {
    inputText.setShowDetail(false);
    setCurrentMovieId("");
  };

  return (
    <div className={classes.SearchResult}>
      <p className={classes.title}>Search Result</p>
      <MovieItem
        url={url}
        isOriginal="true"
        searchStyle="searchStyle"
        onShow={handlerShowDetail}
        onClose={handlerHideDetail}
      />
      {inputText.showDetail && (
        <MovieDetail
          selectedMovie={selectedMovie}
          onClose={handlerHideDetail}
        />
      )}
    </div>
  );
}

export default ResultList;
