import {
  Box,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  useColorModeValue,
  Divider,
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
import { getSeriesInfo, editInfo } from "../Slices/mediaSlice";
import { useEffect } from "react";
import RatingContainer from "./RatingContainer";
import { useHistory } from "react-router-dom";

function MediaDetails({ media, handleCancelClick }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const mediaSeries = useSelector((state) => {
    return state.media.series;
  });

  function handleEditClick() {
    dispatch(editInfo({ media, mediaSeries }));
    history.push("/edit");
  }

  useEffect(() => {
    fetch(`/media/${media.medium.id}/media_series`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(getSeriesInfo(data));
      })
      .catch((error) => window.alert(error));
  }, [media]);

  console.log(media);
  console.log(mediaSeries);

  const creators = media.creators.map((creator) => creator.name).join(", ");
  const textColor = useColorModeValue("gray.500", "gray.600");

  return (
    <Flex maxW={"100%"} h={"100%"} direction="row" wrap="wrap" margin="8px">
      {/*//////////////// Left Colum ////////////////*/}
      <Flex w="35%" h="100%" direction="column" align="center">
        {/* Media Image */}
        <Image
          rounded={"md"}
          alt={"media image"}
          src={media.medium.image}
          fit={"contain"}
          align={"center"}
          w={"full"}
          //   h={{ base: "50%", sm: "400px", lg: "500px" }}
          h={{ base: "200px", sm: "400px", lg: "400px" }}
          marginTop="5px"
          pb="10px"
        />

        {/* Global and User Ratings */}
        <Flex direction={"column"} align="flex-end">
          <Flex>
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
              size={formatSizeLg()}
              rating={media.medium.global_rating}
            />
          </Flex>
          <Flex>
            <Text
              color={"black"}
              fontWeight={300}
              fontSize={formatSizeMed()}
              textAlign="center"
              textTransform={"uppercase"}
            >
              Your Rating:
            </Text>
            <RatingContainer size={formatSizeLg()} rating={media.rating} />
          </Flex>
        </Flex>

        <br />
        <Divider />
        <br />

        {/* User Review */}
        <Flex direction={"column"} overflow="auto">
          <Text
            color={"black"}
            fontWeight={500}
            fontSize={formatSizeMed()}
            textAlign="center"
            textTransform={"uppercase"}
          >
            Your Review:
          </Text>
          <Text
            color={"black"}
            fontWeight={300}
            fontSize={formatSizeMed()}
            textAlign="center"
            textTransform={"uppercase"}
          >
            {media.review}
          </Text>
        </Flex>
      </Flex>

      {/*//////////////// Right Colum ////////////////*/}
      <Flex w="65%" h={"660"} direction="column" align="space-around">
        {/* Top Div */}
        <Flex direction="column" h="65%" align="space-around">
          {/* Consumed Status */}
          <Flex alignSelf="flex-end">
            <Text
              color={consumedTextColor(media.consumed)}
              fontWeight={500}
              fontSize={formatSizeLg()}
              textAlign="center"
              textTransform={"uppercase"}
            >
              {media.consumed}
            </Text>
          </Flex>

          {/* Header */}
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={formatSize5xl()}
              textAlign="center"
              pb="5px"
            >
              {media.medium.title}
            </Heading>
          </Box>

          {/* Creators/publisher/release date */}
          <Flex justify="space-around">
            <Flex direction="column">
              <Text
                color={textColor}
                fontWeight={300}
                fontSize={formatSizeMed()}
                textAlign="center"
              >
                Creators:
              </Text>

              <Text
                color={textColor}
                fontWeight={300}
                fontSize={formatSizeMed()}
                textAlign="center"
              >
                {creators}
              </Text>
            </Flex>
            {media.medium.publisher !== "none" ? (
              <Flex direction={"column"}>
                <Text
                  color={textColor}
                  fontWeight={300}
                  fontSize={formatSizeMed()}
                  textAlign="center"
                >
                  Publisher:
                </Text>
                <Text
                  color={textColor}
                  fontWeight={300}
                  fontSize={formatSizeMed()}
                  textAlign="center"
                >
                  {media.medium.publisher}
                </Text>
              </Flex>
            ) : null}
            <Flex direction="column">
              <Text
                color={textColor}
                fontWeight={300}
                fontSize={formatSizeMed()}
                textAlign="center"
              >
                Release Date:
              </Text>
              <Text
                color={textColor}
                fontWeight={300}
                fontSize={formatSizeMed()}
                textAlign="center"
              >
                {media.medium.release_date}
              </Text>
            </Flex>
          </Flex>

          {/* Media Type */}
          <Text
            color={"black"}
            fontWeight={300}
            fontSize={formatSizeXl()}
            textAlign="center"
            textTransform={"Capitalize"}
          >
            Media Type: {media.media_type.media_type}
          </Text>

          {/* Site Consumed */}
          {media.site_consumed ? (
            <Text
              color={"black"}
              fontWeight={300}
              fontSize={formatSizeMed()}
              textAlign="center"
            >
              Where To Consume: {media.site_consumed}
            </Text>
          ) : null}

          <br />
          <Divider />
          <br />

          {/* Additional Information Section */}
          <Flex
            border="3px"
            borderColor="gray.200"
            w="80%"
            alignSelf={"center"}
            direction="column"
            overflow={"auto"}
          >
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={formatSize2xl()}
                textAlign="center"
                pb="10px"
              >
                Additonal Information
              </Heading>
            </Box>

            <Flex>
              <Text
                color={"black"}
                fontWeight={300}
                fontSize={formatSizeLg()}
                textDecoration="underline"
                pr="5px"
              >
                Description:
              </Text>
              <Text color={"black"} fontWeight={300} fontSize={formatSizeLg()}>
                {media.medium.description}
              </Text>
            </Flex>

            {/* Series Information */}
            {mediaSeries && mediaSeries.number ? (
              <Flex alignSelf="flex-start">
                <Text
                  color={"black"}
                  fontWeight={300}
                  fontSize={formatSizeLg()}
                  textDecoration="underline"
                  pr="5px"
                >
                  Series:
                </Text>
                <Text
                  color={"black"}
                  fontWeight={300}
                  fontSize={formatSizeLg()}
                >
                  {mediaSeries.series.title}, Season {mediaSeries.season.number}
                  , Episode {mediaSeries.number}
                </Text>
              </Flex>
            ) : null}
          </Flex>
        </Flex>

        <br />
        <Divider />
        <br />

        {/* Middle Div */}
        {/* Notes */}
        <Flex h="25%" direction="column">
          <Flex overflow={"auto"} direction={"column"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={formatSize2xl()}
              textAlign="center"
              pb="10px"
            >
              Notes
            </Heading>
            <Text
              color={"black"}
              fontWeight={300}
              fontSize={formatSizeMed()}
              textAlign="center"
            >
              {media.notes}
            </Text>
          </Flex>
        </Flex>

        {/* Buttons */}
        <Flex alignSelf={"flex-end"}>
          <Flex>
            <Button
              rounded={"md"}
              onClick={handleEditClick}
              mt={8}
              size={formatSizeLg()}
              bg={"cyan.400"}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Edit
            </Button>
          </Flex>
          <Flex pl="10px">
            <Button
              rounded={"md"}
              onClick={handleCancelClick}
              mt={8}
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

export default MediaDetails;
