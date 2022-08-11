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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import MediaDetails from "./MediaDetails";
import { consumedTextColor } from "../HelperFunctions/formattingFunctions";

const IMAGE =
  "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png";

function MediaCard({ media }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleCancelClick() {
    onClose();
  }

  return (
    <>
      <Center py={12} onClick={onOpen}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("purple.100", "gray")}
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
              backgroundColor: `gray.600`,
              // backgroundImage: `url(${IMAGE})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(25px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={IMAGE}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={800}>
              {media.medium.title}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              {/* <Text fontWeight={500} fontSize={"xl"}>
                {media.medium.genre}
              </Text> */}
              {/* <Text textDecoration={"line-through"} color={"gray.600"}>
                $199
              </Text> */}
            </Stack>
            <Text
              fontWeight={600}
              color={consumedTextColor(media.consumed)}
              fontSize={"l"}
              textTransform={"uppercase"}
            >
              {media.consumed}
            </Text>
          </Stack>
        </Box>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent margin="5">
          <ModalBody padding="0">
            <MediaDetails media={media} handleCancelClick={handleCancelClick} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MediaCard;
