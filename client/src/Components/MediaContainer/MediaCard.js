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
import MediaDetails from "./MediaDetails";
import { consumedTextColor } from "../HelperFunctions/formattingFunctions";
import { useSelector } from "react-redux";
import { useRef } from "react";

function MediaCard({ media }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const defaultImageUrl = useSelector((state) => {
    return state.media.defaultImageUrl;
  });

  function handleCancelClick() {
    onClose();
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
      <Center py={12} onClick={onOpen} _hover={{ cursor: "pointer" }}>
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
              src={
                media.medium.image && media.image !== null
                  ? media.medium.image
                  : defaultImageUrl
              }
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={800}>
              {media.medium.title}
            </Heading>
            <Flex
              bgGradient={`radial(white 10%, transparent)`}
              borderRadius="50%"
              w="55%"
              justify={"center"}
            >
              <Text
                fontWeight={600}
                color={consumedTextColor(media.consumed)}
                fontSize={"l"}
                textTransform={"uppercase"}
              >
                {media.consumed}
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Center>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent margin="5">
          <ModalBody padding="0">
            <MediaDetails
              initialRef={initialRef}
              media={media}
              handleCancelClick={handleCancelClick}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MediaCard;
