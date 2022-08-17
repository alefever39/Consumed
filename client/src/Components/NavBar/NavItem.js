import { Flex, Icon } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { mediaFilter } from "../Slices/mediaSlice";
import { setAddType } from "../Slices/pageSlice";
import { useHistory } from "react-router-dom";

function NavItem({ children, name, icon, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const filter = useSelector((state) => state.media.filter);
  const selectedPage = useSelector((state) => state.page.selectedPage);
  const addType = useSelector((state) => state.page.addType);

  function handleNavItemClick() {
    if (selectedPage === "create") {
      dispatch(setAddType(name));
      history.push(`/${name}`);
    } else {
      dispatch(mediaFilter(name));
    }
  }

  let mediaColor;
  let bgColor;
  let iconColor;
  switch (name) {
    case "all":
      mediaColor = "gray.400";
      break;
    case "book":
      mediaColor = "red.300";
      break;
    case "movie":
      mediaColor = "blue.300";
      break;
    case "tv show":
      mediaColor = "orange.300";
      break;
    case "create":
      mediaColor = "cyan.400";
      break;
    case "search":
      mediaColor = "cyan.400";
      break;
  }

  if (filter === name || addType === name) {
    bgColor = mediaColor;
    iconColor = "black";
  } else if (selectedPage !== "create") {
    iconColor = mediaColor;
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
      onClick={handleNavItemClick}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="25"
          color={iconColor}
          borderRadius={"50%"}
          _groupHover={{
            color: "white",
            bg: "cyan.400",
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
