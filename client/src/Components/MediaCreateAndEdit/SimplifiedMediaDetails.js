import {
  Box,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  useColorModeValue,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import {
  consumedTextColor,
  formatSize3xl,
  formatSize2xl,
  formatSize5xl,
  formatSizeXl,
  formatSizeLg,
  formatSizeMed,
} from "../HelperFunctions/formattingFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getSeriesInfo, editInfo, deleteMedia } from "../Slices/mediaSlice";
import { setSelectedPage } from "../Slices/pageSlice";
import { useEffect, useState } from "react";
import RatingContainer from "../MediaContainer/RatingContainer";
import { useHistory } from "react-router-dom";

function SimplifiedMediaDetails({
  media,
  handleCancelClick,
  removeMediaFromResults,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const mediaSeries = useSelector((state) => {
    return state.media.series;
  });
  const defaultImageUrl = useSelector((state) => {
    return state.media.defaultImageUrl;
  });
  const [mediaFull, setMediaFull] = useState({});
  const [searching, setSearching] = useState(false);
  const buttonColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.500", "gray.600");
  let creators = [];

  function handleAddMediaClick() {
    fetch(`/media_users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: mediaFull.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        removeMediaFromResults(mediaFull.id);
        handleCancelClick();
      });
  }

  useEffect(() => {
    setSearching(true);
    if (media.source === "consumed") {
      console.log(media.source, "in the consumed fetch");
      fetch(`/media/${media.id}`)
        .then((response) => response.json())
        .then((data) => {
          setMediaFull(data);

          fetch(`/media/${data.id}/media_series`)
            .then((response) => response.json())
            .then((series_data) => {
              setSearching(false);
              dispatch(getSeriesInfo(series_data));
            });
        });
    } else if (media.source === "imdb") {
      fetch(`/imdb_by_id?title_id=${media.id}`)
        .then((response) => response.json())
        .then((data) => {
          setMediaFull(data);

          fetch(`/media/${data.id}/media_series`)
            .then((response) => response.json())
            .then((series_data) => {
              setSearching(false);
              dispatch(getSeriesInfo(series_data));
            });
        });
    } else if (media.source === "google_books") {
      fetch(`/google_books_by_id?title_id=${media.id}`)
        .then((response) => response.json())
        .then((data) => {
          setMediaFull(data);

          fetch(`/media/${data.id}/media_series`)
            .then((response) => response.json())
            .then((series_data) => {
              setSearching(false);
              dispatch(getSeriesInfo(series_data));
            });
        });
    }

    // fetch(`/media/${media.id}/media_series`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     dispatch(getSeriesInfo(data));
    //   });
  }, [media]);

  useEffect(() => {
    if (mediaFull.creators) {
      creators = mediaFull.creators.map((creator) => creator.name).join(", ");
    }
  }, [mediaSeries]);

  return (
    <>
      {searching ? (
        <Flex align="center" justify="center" w={"100%"} h={"100%"}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex maxW={"100%"} h={"90vh"} direction="row" wrap="wrap" margin="8px">
          {/*//////////////// Left Colum ////////////////*/}
          {searching ? null : (
            <Flex w="35%" h="100%" direction="column" align="center">
              {/* Media Image */}
              <Image
                rounded={"md"}
                alt={"media image"}
                src={
                  mediaFull.image !== "" && mediaFull.image !== null
                    ? mediaFull.image
                    : defaultImageUrl
                }
                fit={"contain"}
                align={"center"}
                w={"full"}
                //   h={{ base: "50%", sm: "400px", lg: "500px" }}
                h={{ base: "200px", sm: "400px", lg: "400px" }}
                marginTop="5px"
                pb="10px"
              />
            </Flex>
          )}

          {/*//////////////// Right Colum ////////////////*/}
          <Flex
            w="65%"
            h={"100%"}
            direction="column"
            align="space-around"
            pl="3vw"
          >
            {/* Top Div */}
            <Flex direction="column" h="55%" align="space-around">
              {/* Top Right Div */}
              <Flex alignSelf="flex-end">
                {/* Media Type */}
                <Text
                  color={"black"}
                  fontWeight={300}
                  fontSize={formatSizeLg()}
                  textAlign="center"
                  textTransform={"Capitalize"}
                  pr="5px"
                >
                  (
                  {mediaFull.media_type
                    ? mediaFull.media_type.media_type
                    : null}
                  )
                </Text>
              </Flex>

              {/* Header */}
              <Flex justify={"center"} as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={formatSize5xl()}
                  textAlign="center"
                  pb="5px"
                >
                  {mediaFull.title}
                </Heading>
              </Flex>

              {/* Series Information */}
              {mediaSeries && mediaSeries.number ? (
                <Flex justify={"center"}>
                  {mediaSeries.season.season_exists ? (
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeLg()}
                    >
                      {mediaSeries.series.title}, Season{" "}
                      {mediaSeries.season.number}, Episode {mediaSeries.number}
                    </Text>
                  ) : (
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeLg()}
                    >
                      {mediaSeries.series.title},{" "}
                      {mediaFull.media_type.media_type} {mediaSeries.number}
                    </Text>
                  )}
                </Flex>
              ) : null}

              <Divider />

              {/* Details Section */}
              <Flex
                border="3px"
                borderColor="gray.200"
                w="80%"
                alignSelf={"center"}
                direction="column"
                overflow={"auto"}
                pt="5px"
              >
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={formatSize2xl()}
                    textAlign="center"
                    pb="10px"
                  >
                    Details
                  </Heading>
                </Box>

                {/* description */}
                <Flex direction={{ base: "column", md: "row" }}>
                  <Flex w={{ base: "100%", md: "25%" }}>
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeMed()}
                      textDecoration="underline"
                      pr="5px"
                    >
                      Description:
                    </Text>
                  </Flex>
                  <Flex w={{ base: "100%", md: "75%" }}>
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeMed()}
                      whiteSpace={"pre-wrap"}
                    >
                      {mediaFull.description}
                    </Text>
                  </Flex>
                </Flex>

                {/* Creators */}
                {creators && creators[0] ? (
                  <Flex pt="5px" direction={{ base: "column", md: "row" }}>
                    <Flex w={{ base: "100%", md: "25%" }}>
                      <Text
                        color={"black"}
                        fontWeight={300}
                        fontSize={formatSizeMed()}
                        textDecoration="underline"
                        pr="5px"
                      >
                        Creator(s):
                      </Text>
                    </Flex>
                    <Flex w={{ base: "100%", md: "75%" }}>
                      <Text
                        color={"black"}
                        fontWeight={300}
                        fontSize={formatSizeMed()}
                      >
                        {creators}
                      </Text>
                    </Flex>
                  </Flex>
                ) : null}

                {/* Publisher */}
                {mediaFull.publisher !== "none" &&
                mediaFull.publisher !== null ? (
                  <Flex pt="5px" direction={{ base: "column", md: "row" }}>
                    <Flex w={{ base: "100%", md: "25%" }}>
                      <Text
                        color={"black"}
                        fontWeight={300}
                        fontSize={formatSizeMed()}
                        textDecoration="underline"
                        pr="5px"
                      >
                        Publisher:
                      </Text>
                    </Flex>
                    <Flex w={{ base: "100%", md: "75%" }}>
                      <Text
                        color={"black"}
                        fontWeight={300}
                        fontSize={formatSizeMed()}
                      >
                        {mediaFull.publisher}
                      </Text>
                    </Flex>
                  </Flex>
                ) : null}

                {/* Release Date */}
                <Flex pt="5px" direction={{ base: "column", md: "row" }}>
                  {mediaFull.release_date ? (
                    mediaFull.release_date.slice(4) !== "-00-00" ? (
                      <>
                        <Flex w={{ base: "100%", md: "25%" }}>
                          <Text
                            color={"black"}
                            fontWeight={300}
                            fontSize={formatSizeMed()}
                            textDecoration="underline"
                            pr="5px"
                          >
                            Release Date:
                          </Text>
                        </Flex>
                        <Flex w={{ base: "100%", md: "75%" }}>
                          <Text
                            color={"black"}
                            fontWeight={300}
                            fontSize={formatSizeMed()}
                          >
                            {mediaFull.release_date}
                          </Text>
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Flex w={{ base: "100%", md: "25%" }}>
                          <Text
                            color={"black"}
                            fontWeight={300}
                            fontSize={formatSizeMed()}
                            textDecoration="underline"
                            pr="5px"
                          >
                            Release Year:
                          </Text>
                        </Flex>
                        <Flex w={{ base: "100%", md: "75%" }}>
                          <Text
                            color={"black"}
                            fontWeight={300}
                            fontSize={formatSizeMed()}
                          >
                            {mediaFull.release_date.slice(0, 4)}
                          </Text>
                        </Flex>
                      </>
                    )
                  ) : null}
                </Flex>
              </Flex>
            </Flex>

            {/* Buttons */}
            <Flex alignSelf={"flex-end"}>
              <Flex pl="10px">
                <Button
                  rounded={"md"}
                  onClick={handleAddMediaClick}
                  mt={4}
                  size={formatSizeLg()}
                  bg={"cyan.400"}
                  color={buttonColor}
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                >
                  Add Media
                </Button>
              </Flex>
              <Flex pl="10px">
                <Button
                  rounded={"md"}
                  onClick={handleCancelClick}
                  mt={4}
                  size={formatSizeLg()}
                  bg={"red.400"}
                  color={buttonColor}
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                >
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default SimplifiedMediaDetails;
