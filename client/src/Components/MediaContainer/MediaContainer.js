import { useDispatch, useSelector } from "react-redux";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import MediaCard from "./MediaCard";
import { getMedia } from "../Slices/mediaSlice";
import { useHistory } from "react-router-dom";

function MediaContainer({ origin }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  if (!user || (user && user.errors)) {
    history.push("/login");
  }

  const media = useSelector((state) => state.media.media);
  const filter = useSelector((state) => state.media.filter);
  let displayMedia;

  useEffect(() => {
    fetch(`/users/media`)
      .then((response) => response.json())
      .then((data) => {
        if (filter === "all") {
          dispatch(getMedia(data));
        } else {
          const filteredData = data.filter(
            (mediaUser) => mediaUser.media_type.media_type === filter
          );
          dispatch(getMedia(filteredData));
        }
      })
      .catch((error) => window.alert(error));
  }, [filter]);

  if (media) {
    if (origin === "home") {
      displayMedia = media.filter((medium) => medium.consumed === "consuming");
    } else {
      displayMedia = media;
    }
  }

  return (
    <Flex
      bg={useColorModeValue("white", "gray.900")}
      w="full"
      height="84vh"
      overflow="auto"
      gap={6}
      padding={6}
      wrap="wrap"
      justify="space-around"
    >
      {displayMedia ? (
        displayMedia.map((medium) => {
          return <MediaCard key={medium.id} media={medium} />;
        })
      ) : (
        <p>Loading...</p>
      )}
    </Flex>
  );
}

export default MediaContainer;
