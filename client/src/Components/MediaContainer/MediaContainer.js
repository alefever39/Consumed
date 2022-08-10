import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import MediaCard from "./MediaCard";
import { getMedia } from "../Slices/mediaSlice";

function MediaContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const media = useSelector((state) => state.media.media);

  useEffect(() => {
    fetch(`/users/media`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getMedia(data));
      })
      .catch((error) => window.alert(error));
  }, []);

  console.log(media);

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
      {media.map((medium) => {
        return <MediaCard key={medium.id} media={medium} />;
      })}
    </Flex>
  );
}

export default MediaContainer;
