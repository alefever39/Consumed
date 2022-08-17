import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Flex, Icon } from "@chakra-ui/react";

function RatingContainer({ size, rating }) {
  let ratingIcons = [];

  if (rating === 0) {
    for (let i = 1; i <= 5; i++) {
      ratingIcons.push(
        <Icon
          mr="1"
          fontSize={size}
          _groupHover={{
            color: "white",
          }}
          as={AiOutlineStar}
          key={i}
        />
      );
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        ratingIcons.push(
          <Icon
            mr="1"
            fontSize={size}
            _groupHover={{
              color: "white",
            }}
            as={AiFillStar}
            key={i}
          />
        );
      } else {
        ratingIcons.push(
          <Icon
            mr="1"
            fontSize={size}
            _groupHover={{
              color: "white",
            }}
            as={AiOutlineStar}
            key={i}
          />
        );
      }
    }
  }

  return (
    <Flex pl={{ base: "0", md: "2px" }} align={"center"}>
      {ratingIcons}
    </Flex>
  );
}

export default RatingContainer;
