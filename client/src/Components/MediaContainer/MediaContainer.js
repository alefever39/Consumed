import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import { getMedia } from "../Slices/mediaSlice";
import { useHistory } from "react-router-dom";
import { formatSize5xl } from "../HelperFunctions/formattingFunctions";

function MediaContainer({ origin }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  if (!user || (user && user.errors)) {
    history.push("/login");
  }

  const media = useSelector((state) => state.media.media);
  const filter = useSelector((state) => state.media.filter);
  const [search, setSearch] = useState("");

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

  if (search) {
    displayMedia = displayMedia.filter((medium) => {
      console.log(medium);
      return (
        medium.medium.title.toLowerCase().includes(search.toLowerCase()) ||
        medium.consumed.toLowerCase() === search.toLowerCase()
      );
    });
  }

  function handleInputChange(e) {
    setSearch(e.target.value);
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
      <Heading
        lineHeight={1.1}
        fontWeight={600}
        fontSize={formatSize5xl()}
        textAlign="center"
        pb="5px"
      >
        {origin === "home"
          ? "Here's what your currently consuming"
          : "All Your Media"}
      </Heading>
      <FormControl id="seach">
        <Flex justify="center" align={"center"}>
          <FormLabel>Search</FormLabel>
          <Input
            type="input"
            id="title"
            name="title"
            value={search}
            onChange={handleInputChange}
            w="50%"
          />
        </Flex>
      </FormControl>
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
