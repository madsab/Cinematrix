import React from "react";

const ActorPage = ({ params }: { params: { actorId: string } }) => {
  return <div>Actorpage for {params.actorId}</div>;
};

export default ActorPage;
