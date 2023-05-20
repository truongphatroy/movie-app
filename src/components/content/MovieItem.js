/* The component use react-slick library to render carousel image list */

import React from "react";
import Slider from "react-slick";
import { imageUrl } from "../../data/APIaddress";
import useHttp from "../../hooks/useHttp";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import classes from "./MovieItem.module.scss";

const MovieItem = ({
  url,
  movieTitle,
  isOriginal,
  onShow,
  onSwipe,
  onClose,
  searchStyle,
}) => {
  const { data, isLoading, error } = useHttp(url);

  let movieActionArr = [];
  console.log(data);

  if (data?.results) {
    movieActionArr = data.results;
  }

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

  // setting codition for Slider of carousel
  let settings = {
    infinite: true,
    slidesToShow: 6,
    swipeToSlide: true, // enable for swipe to change slide
    dots: false,
    // setting reponsive
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // set item for Slider
  const items = movieActionArr.map((result) => {
    // render original image
    if (isOriginal === "true") {
      // console.log("render list");
      if (`${result?.poster_path}` !== "null") {
        return (
          <img
            key={result.id}
            // style for search page or browser page
            className={classes[searchStyle] || classes.imageItem}
            src={`${imageUrl}${result?.poster_path}`}
            alt={result.title}
            onClick={() => onShow(result)}
          />
        );
      }
    } else {
      // show other image
      // check the result?.backdrop_path is null or not
      if (`${result?.backdrop_path}` !== "null") {
        return (
          <img
            key={result.id}
            className={classes.imageItem}
            src={`${imageUrl}${result?.backdrop_path}`}
            alt={result.title}
            onClick={() => onShow(result)}
          />
        );
      }
    }
    return null;
  });

  return (
    <div>
      {/* check parent component is ResultList or not */}
      {searchStyle ? (
        <div className={classes.resultStyle}>{items}</div>
      ) : (
        /* parent component is MovieList */
        <div className={classes.MovieItem}>
          <h2 className={classes.MovieTitle} onClick={onClose}>
            {movieTitle}
          </h2>
          <Slider {...settings} onSwipe={onSwipe}>
            {items}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
