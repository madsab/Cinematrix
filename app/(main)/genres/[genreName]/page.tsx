import React from "react";

const GenrePage = ({ params }: { params: { genreName: string } }) => {
  return <div>Genre page for {params.genreName}</div>;
};

export default GenrePage;
