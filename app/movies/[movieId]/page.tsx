import React from "react";

const MoviePage = ({ params }: { params: { movieId: string } }) => {
  return <div>MoviePage {params.movieId}</div>;
};

export default MoviePage;
