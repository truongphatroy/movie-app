import React, { useEffect, useState } from "react";
import classes from "./MovieDetail.module.scss";
import { videoUrl, API_KEY } from "../../data/APIaddress";
import YouTube from "react-youtube";
import Modal from "../../UI/modal/Modal";
import useHttp from "../../hooks/useHttp";

const MovieDetail = (props) => {
  const [dataMovie, setDataMovie] = useState(null);
  // call API
  const { data, isLoading, error } = useHttp(
    `${videoUrl}${props?.selectedMovie?.id}/videos?api_key=${API_KEY}&language=en-US`
  );

  // check the film has trailer video or not
  useEffect(() => {
    if (props.selectedMovie) {
      if (data?.results?.length > 0) {
        let dataVideo = data?.results?.filter(
          (elementVideo) =>
            elementVideo.site === "YouTube" &&
            (elementVideo.type === "Teaser" || elementVideo.type === "Trailer")
        );
        setDataMovie(dataVideo?.[0]?.key);
      } else {
        setDataMovie(null);
      }
    }
  }, [data, props.selectedMovie]);

  // set config of video
  const opts = {
    height: window.innerHeight * 0.44,
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // while loading
  if (isLoading) {
    return <p>wait...</p>;
  }
  // check error
  if (error) {
    return (
      <Modal onClose={props.onClose}>
        <div className={classes.modal}>
          <div className={classes.container}>
            <div className={classes.content}>
              {props?.selectedMovie?.title ? (
                <h1 className={classes.title}>{props?.selectedMovie?.title}</h1>
              ) : (
                <h1 className={classes.title}>{props?.selectedMovie?.name}</h1>
              )}
              <h5 className={classes.date}>
                Release Date:{" "}
                {props?.selectedMovie?.first_air_date ||
                  props?.selectedMovie?.release_date}
              </h5>
              <h5 className={classes.vote}>
                Vote: {props?.selectedMovie?.vote_average} / 10
              </h5>
              <p className={classes.overview}>
                {props?.selectedMovie?.overview}
              </p>
            </div>

            <div className={classes.video}>
              <p className={classes.error}>{error} Please see other films.</p>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  // if has no error
  if (props?.selectedMovie) {
    console.log(props?.selectedMovie);

    // film was selected by click
    return (
      <Modal onClose={props.onClose}>
        <div className={classes.modal}>
          <div className={classes.container}>
            <div className={classes.content}>
              {props?.selectedMovie?.title ? (
                <h1 className={classes.title}>{props?.selectedMovie?.title}</h1>
              ) : (
                <h1 className={classes.title}>{props?.selectedMovie?.name}</h1>
              )}

              <h5 className={classes.date}>
                Release Date:{" "}
                {props?.selectedMovie?.first_air_date ||
                  props?.selectedMovie?.release_date}
              </h5>
              <h5 className={classes.vote}>
                Vote: {props?.selectedMovie?.vote_average} / 10
              </h5>
              <p className={classes.overview}>
                {props?.selectedMovie?.overview}
              </p>
            </div>
            {/* Have trailer video */}
            {dataMovie ? (
              <div className={classes.video}>
                <YouTube videoId={dataMovie} opts={opts} />
              </div>
            ) : (
              /* No has video */
              <div className={classes.video}>
                <p className={classes.error}>
                  Sorry! No video found for this Movie.
                </p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }
};

export default MovieDetail;
