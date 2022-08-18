import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import SimplifiedMediaDetails from "./SimplifiedMediaDetails";
import { consumedTextColor } from "../HelperFunctions/formattingFunctions";
import { useSelector } from "react-redux";

function SimplifiedMediaCard({ media, removeMediaFromResults }) {
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();

  const defaultImageUrl = useSelector((state) => {
    return state.media.defaultImageUrl;
  });

  console.log(!!media.image);

  function handleCancelClick() {
    onDetailsClose();
  }

  let bgColor;
  switch (media.media_type.media_type) {
    case "all":
      bgColor = "gray.400";
      break;
    case "book":
      bgColor = "red.300";
      break;
    case "movie":
      bgColor = "blue.300";
      break;
    case "tv show":
      bgColor = "orange.300";
      break;
  }

  return (
    <>
      <Center py={12} onClick={onDetailsOpen} _hover={{ cursor: "pointer" }}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue(bgColor, "gray")}
          boxShadow={"xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: `""`,
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundColor: `gray.500`,
              opacity: 0.3,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(25px)",
                opacity: 0.7,
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"contain"}
              src={media.image !== "" ? media.image : defaultImageUrl}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={800}>
              {media.title}
            </Heading>
          </Stack>
        </Box>
      </Center>

      <Modal
        isCentered
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent margin="5" h="65vh" overflow={"hidden"}>
          <ModalBody padding="0">
            <SimplifiedMediaDetails
              removeMediaFromResults={removeMediaFromResults}
              media={media}
              handleCancelClick={handleCancelClick}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SimplifiedMediaCard;
