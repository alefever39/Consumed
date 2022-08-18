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
import { useEffect, useRef } from "react";
import RatingContainer from "./RatingContainer";
import { useHistory } from "react-router-dom";

function MediaDetails({ media, handleCancelClick, initialRef }) {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const history = useHistory();
  const dispatch = useDispatch();
  const deleteRef = useRef();

  const mediaSeries = useSelector((state) => {
    return state.media.series;
  });
  const defaultImageUrl = useSelector((state) => {
    return state.media.defaultImageUrl;
  });

  function handleEditClick() {
    dispatch(editInfo({ media, mediaSeries }));
    history.push("/edit");
  }

  function handleDeleteButtonClick() {
    onDeleteOpen();
  }

  function handleCancelDeleteClick() {
    onDeleteClose();
  }

  function handleConfirmDeleteClick() {
    fetch(`/media_users/${media.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      dispatch(deleteMedia(media.id));
    });
  }

  useEffect(() => {
    fetch(`/media/${media.medium.id}/media_series`)
      .then((response) => response.json())
      .then((data) => {
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
          src={
            media.medium.image && media.image !== null
              ? media.medium.image
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

        {/* Global and User Ratings */}
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
              rating={media.medium.global_rating}
            />
          </Flex>
          <Flex direction={{ base: "column", md: "row" }}>
            <Text
              color={"black"}
              fontWeight={300}
              fontSize={formatSizeMed()}
              textAlign="center"
              textTransform={"uppercase"}
            >
              Your Rating:
            </Text>
            <RatingContainer size={formatSizeMed()} rating={media.rating} />
          </Flex>
        </Flex>

        <Divider pt="10px" />

        {/* User Review */}
        <Flex pt="10px" direction={"column"} overflow="auto">
          <Text
            color={"black"}
            fontWeight={500}
            fontSize={formatSizeMed()}
            textAlign="center"
          >
            Your Review
          </Text>
          <Text
            color={"black"}
            fontWeight={300}
            fontSize={formatSizeMed()}
            textAlign="center"
          >
            {media.review}
          </Text>
        </Flex>
      </Flex>

      {/*//////////////// Right Colum ////////////////*/}
      <Flex w="65%" h={"100%"} direction="column" align="space-around">
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

            {/* Consumed Status */}
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
          <Flex justify={"center"} as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={formatSize5xl()}
              textAlign="center"
              pb="5px"
            >
              {media.medium.title}
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
                  fontSize={formatSizeLg()}
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
                  fontSize={formatSizeLg()}
                >
                  {media.medium.description}
                </Text>
              </Flex>
            </Flex>

            {/* Creators */}
            <Flex pt="5px" direction={{ base: "column", md: "row" }}>
              <Flex w={{ base: "100%", md: "25%" }}>
                <Text
                  color={"black"}
                  fontWeight={300}
                  fontSize={formatSizeLg()}
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
                  fontSize={formatSizeLg()}
                >
                  {creators}
                </Text>
              </Flex>
            </Flex>

            {/* Publisher */}
            {media.medium.publisher !== "none" &&
            media.medium.publisher !== null ? (
              <Flex pt="5px" direction={{ base: "column", md: "row" }}>
                <Flex w={{ base: "100%", md: "25%" }}>
                  <Text
                    color={"black"}
                    fontWeight={300}
                    fontSize={formatSizeLg()}
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
                    fontSize={formatSizeLg()}
                  >
                    {media.medium.publisher}
                  </Text>
                </Flex>
              </Flex>
            ) : null}

            {/* Release Date */}
            <Flex pt="5px" direction={{ base: "column", md: "row" }}>
              {media.medium.release_date.slice(4) !== "-00-00" ? (
                <>
                  <Flex w={{ base: "100%", md: "25%" }}>
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeLg()}
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
                      fontSize={formatSizeLg()}
                    >
                      {media.medium.release_date}
                    </Text>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex w={{ base: "100%", md: "25%" }}>
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeLg()}
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
                      fontSize={formatSizeLg()}
                    >
                      {media.medium.release_date.slice(0, 4)}
                    </Text>
                  </Flex>
                </>
              )}
            </Flex>

            {/* Site Consumed */}
            <Flex direction={{ base: "column", md: "row" }}>
              {media.site_consumed ? (
                <>
                  <Flex w={{ base: "100%", md: "25%" }}>
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeLg()}
                      textDecoration="underline"
                      pr="5px"
                    >
                      Located:
                    </Text>
                  </Flex>
                  <Flex w={{ base: "100%", md: "75%" }}>
                    <Text
                      color={"black"}
                      fontWeight={300}
                      fontSize={formatSizeLg()}
                    >
                      {media.site_consumed}
                    </Text>
                  </Flex>
                </>
              ) : null}
            </Flex>
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
              onClick={handleDeleteButtonClick}
              mt={4}
              size={formatSizeLg()}
              bg={"red.800"}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Delete
            </Button>
          </Flex>
          <Flex pl="10px">
            <Button
              rounded={"md"}
              onClick={handleEditClick}
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
              Edit
            </Button>
          </Flex>
          <Flex pl="10px">
            <Button
              ref={initialRef}
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

        {/* confirm delete modal */}
        <Modal
          isCentered
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          size="sm"
          initialFocusRef={deleteRef}
        >
          <ModalOverlay />
          <ModalContent margin="5">
            <ModalBody padding="0">
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={formatSize3xl()}
                textAlign="center"
                pb="20px"
                pt="5px"
              >
                Are you sure?
              </Heading>
              <Flex justify={"space-around"} pb="10px">
                <Flex>
                  <Button
                    rounded={"md"}
                    onClick={handleConfirmDeleteClick}
                    mt={4}
                    size={formatSizeLg()}
                    bg={"red.800"}
                    color={useColorModeValue("white", "gray.900")}
                    textTransform={"uppercase"}
                    _hover={{
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                    }}
                  >
                    Delete
                  </Button>
                </Flex>
                <Flex pl="10px">
                  <Button
                    ref={deleteRef}
                    rounded={"md"}
                    onClick={handleCancelDeleteClick}
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
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
}

export default MediaDetails;
