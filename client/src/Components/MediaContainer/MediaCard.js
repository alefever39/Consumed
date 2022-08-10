import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

const IMAGE =
  "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png";

function MediaCard({ media }) {
  let textcolor;
  if (media.consumed == "not consumed") {
    textcolor = "red.500";
  } else if (media.consumed == "consumed") {
    textcolor = "green.500";
  } else {
    textcolor = "yellow.500";
  }

  return (
    <Center py={12}>
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
            color={textcolor}
            fontSize={"l"}
            textTransform={"uppercase"}
          >
            {media.consumed}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}

export default MediaCard;
