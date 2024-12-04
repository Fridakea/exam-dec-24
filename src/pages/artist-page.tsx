import { useParams } from "react-router-dom";

export const ArtistPage = () => {
  const { slug } = useParams();
  return <h1>Artist single view - {slug}</h1>;
};
