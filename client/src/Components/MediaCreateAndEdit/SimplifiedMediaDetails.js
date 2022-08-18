import {
  Box,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  useColorModeValue,
  Divider,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
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
import { useEffect } from "react";
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

  function handleAddMediaClick() {
    fetch(`/media_users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: media.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        removeMediaFromResults(media.id);
        handleCancelClick();
      });
  }

  useEffect(() => {
    fetch(`/media/${media.id}/media_series`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(getSeriesInfo(data));
      })
      .catch((error) => window.alert(error));
  }, [media]);

  const creators = media.creators.map((creator) => creator.name).join(", ");
  const textColor = useColorModeValue("gray.500", "gray.600");

  return (
    <Flex maxW={"100%"} h={"90vh"} direction="row" wrap="wrap" margin="8px">
      {/*//////////////// Left Colum ////////////////*/}
      <Flex w="35%" h="100%" direction="column" align="center">
        {/* Media Image */}
        <Image
          rounded={"md"}
          alt={"media image"}
          src={media.image !== "" ? media.image : defaultImageUrl}
          fit={"contain"}
          align={"center"}
          w={"full"}
          //   h={{ base: "50%", sm: "400px", lg: "500px" }}
          h={{ base: "200px", sm: "400px", lg: "400px" }}
          marginTop="5px"
          pb="10px"
        />

        {/* Global Ratings */}
        <Flex direction={"column"} align="flex-end">
          <Flex direction={{ base: "column", md: "row" }}>
            <Text
              color={"black"}
              fontWeight={300}
              fontSize={formatSizeMed()}
              textAlign="center"
              textTransform={"uppercase"}
            >
              Global Rating:
            </Text>
            <RatingContainer
              size={formatSizeMed()}
              rating={media.global_rating}
            />
          </Flex>
        </Flex>
      </Flex>

      {/*//////////////// Right Colum ////////////////*/}
      <Flex w="65%" h={"100%"} direction="column" align="space-around" pl="3vw">
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
              ({media.media_type.media_type})
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
              {media.title}
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
                  {mediaSeries.series.title}, Season {mediaSeries.season.number}
                  , Episode {mediaSeries.number}
                </Text>
              ) : (
                <Text
                  color={"black"}
                  fontWeight={300}
                  fontSize={formatSizeLg()}
                >
                  {mediaSeries.series.title}, {media.media_type.media_type}{" "}
                  {mediaSeries.number}
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
                >
                  {media.description}
                </Text>
              </Flex>
            </Flex>

            {/* Creators */}
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

            {/* Publisher */}
            {media.publisher !== "none" && media.publisher !== null ? (
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
                    {media.publisher}
                  </Text>
                </Flex>
              </Flex>
            ) : null}

            {/* Release Date */}
            <Flex pt="5px" direction={{ base: "column", md: "row" }}>
              {media.release_date.slice(4) !== "-00-00" ? (
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
                      {media.release_date}
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
                      {media.release_date.slice(0, 4)}
                    </Text>
                  </Flex>
                </>
              )}
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
              color={useColorModeValue("white", "gray.900")}
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
              color={useColorModeValue("white", "gray.900")}
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
  );
}

export default SimplifiedMediaDetails;
