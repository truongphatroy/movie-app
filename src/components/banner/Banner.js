import React, { useMemo, useState } from "react";
import { requests, BannerImageUrl } from "../../data/APIaddress";
import useHttp from "../../hooks/useHttp";
import classes from "./Banner.module.scss";

function Banner() {
  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    image: "",
  });
  // set url for take photo banner
  const url = `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`;

  // use the useHttp hook to call AJAX
  const { data, isLoading, error } = useHttp(url);

  // use useMemo to avoid re-render many times
  useMemo(() => {
    if (data?.results) {
      let selectedMovie = 0;
      if (
        data?.results[selectedMovie]?.backdrop_path !== undefined &&
        data?.results[selectedMovie]?.backdrop_path.length > 0
      ) {
        selectedMovie = Math.floor(Math.random() * data?.results.length - 1);
      }
      setMovie((preMovie) => ({
        ...preMovie,
        title: data?.results[selectedMovie]?.original_name,
        overview: data?.results[selectedMovie]?.overview,
        image: BannerImageUrl + data?.results[selectedMovie]?.backdrop_path,
      }));
    }
  }, [data]);

  // Loading
  if (isLoading) {
    return <p></p>;
  }

  // Show error
  if (error) {
    return (
      <div>
        <p>Error fetch data: {error.message}</p>;
      </div>
    );
  }

  // Data handl Logic
  // console.log(movie.image);

  return (
    <div
      className={classes.BannerWrapper}
      style={{ backgroundImage: `url(${movie.image})` }}
    >
      <div className={classes.BannerInfor}>
        <h1 className={classes.BannerTitle}>{movie.title ?? ""}</h1>
        <button type="button">Play</button>
        <button>My List</button>
        <p className={classes.BannerOverview}>{movie.overview ?? ""}</p>
      </div>
    </div>
  );
}

export default Banner;
