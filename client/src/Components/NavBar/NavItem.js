import { Flex, Icon } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { mediaFilter } from "../Slices/mediaSlice";

function NavItem({ children, name, icon, ...rest }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.media.filter);

  function handleFilterChange() {
    dispatch(mediaFilter(name));
  }

  let bgColor;
  switch (name) {
    case filter === "all" && "all":
      bgColor = "gray.400";
      break;
    case filter === "book" && "book":
      bgColor = "red.300";
      break;
    case filter === "movie" && "movie":
      bgColor = "blue.300";
      break;
    case filter === "tv show" && "tv show":
      bgColor = "orange.300";
      break;
  }

  return (
    // <Link
    //   href="#"
    //   style={{ textDecoration: "none" }}
    //   _focus={{ boxShadow: "none" }}
    // >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      bgColor={bgColor}
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      onClick={handleFilterChange}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="25"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
    // </Link>
  );
}

export default NavItem;
