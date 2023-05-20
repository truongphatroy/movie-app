import React, { useState, useCallback } from "react";
import { requests } from "../../data/APIaddress";
import MovieItem from "./MovieItem";
import MovieDetail from "./MovieDetail";

const MovieList = () => {
  let urlOriginal = `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`;
  let urlTrend = `https://api.themoviedb.org/3${requests.fetchTrending}`;
  let urlRate = `https://api.themoviedb.org/3${requests.fetchTopRated}`;
  let urlAction = `https://api.themoviedb.org/3${requests.fetchActionMovies}`;
  let urlComedy = `https://api.themoviedb.org/3${requests.fetchComedyMovies}`;
  let urlHorror = `https://api.themoviedb.org/3${requests.fetchHorrorMovies}`;
  let urlRomance = `https://api.themoviedb.org/3${requests.fetchRomanceMovies}`;
  let urlDocument = `https://api.themoviedb.org/3${requests.fetchDocumentaries}`;

  const [isClick, setIsClick] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState("");
  const [selectedMovie, setSelectedMovie] = useState();

  // prevent event click due to drag
  const handerSwipe = (event) => {
    setIsClick(false);
  };

  // handling show detail when click to image of film
  const handlerShowDetail = useCallback(
    (result) => {
      setIsClick(true);
      if (isClick) {
        // if click is first time or click into other film
        if (currentMovieId === "" || currentMovieId !== result.id) {
          setShowDetail(true);
          setSelectedMovie(result);
          setCurrentMovieId(result.id);
          // if click to same image then close modal
        } else {
          setShowDetail(false);
          setCurrentMovieId("");
        }
      }
    },
    [isClick, currentMovieId, setShowDetail, setCurrentMovieId, setIsClick]
  );

  // handling close detail modal when click to padding place
  const handlerHideDetail = () => {
    setShowDetail(false);
    setCurrentMovieId("");
  };

  return (
    <div>
      <MovieItem
        url={urlOriginal}
        // movieTitle=""
        isOriginal="true"
        movieTitle="Netflix Originals"
        onShow={handlerShowDetail}
        onSwipe={handerSwipe}
        onClose={handlerHideDetail}
      />
      <MovieItem
        url={urlTrend}
        movieTitle="Xu hướng"
        onShow={handlerShowDetail}
        onSwipe={handerSwipe}
        onClose={handlerHideDetail}
      />
      <MovieItem
        url={urlRate}
        movieTitle="Xếp hạng cao"
        onShow={handlerShowDetail}
        onSwipe={handerSwipe}
        onClose={handlerHideDetail}
      />
      <MovieItem
        url={urlAction}
        movieTitle="Hành động"
        onShow={handlerShowDetail}
        onSwipe={handerSwipe}
        onClose={handlerHideDetail}
      />
      <MovieItem url={urlComedy} movieTitle="Hài" onShow={handlerShowDetail} />
      <MovieItem
        url={urlHorror}
        movieTitle="Kinh dị"
        onShow={handlerShowDetail}
        onSwipe={handerSwipe}
        onClose={handlerHideDetail}
      />
      <MovieItem
        url={urlRomance}
        movieTitle="Lãng mạn"
        onShow={handlerShowDetail}
        onSwipe={handerSwipe}
        onClose={handlerHideDetail}
      />
      <MovieItem
        url={urlDocument}
        movieTitle="Tài liệu"
        onShow={handlerShowDetail}
        onSwipe={handerSwipe}
        onClose={handlerHideDetail}
      />
      {/* check state of showDetail before render */}
      {showDetail && (
        <MovieDetail
          selectedMovie={selectedMovie}
          onClose={handlerHideDetail}
        />
      )}
    </div>
  );
};
export default MovieList;
