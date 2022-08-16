import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Image,
  Text,
} from "@chakra-ui/react";
import { IoIosBook } from "react-icons/io";
import { CgCamera, CgTv } from "react-icons/cg";
import { FaGlobeAmericas } from "react-icons/fa";
import { GoPencil, GoSearch } from "react-icons/go";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";

export default function SidebarContent({ onClose, ...rest }) {
  const selectedPage = useSelector((state) => state.page.selectedPage);

  let linkItems;
  if (selectedPage === "create") {
    linkItems = [
      {
        name: "create",
        displayAs: "Create",
        icon: GoPencil,
      },
      // {
      //   name: "search",
      //   displayAs: "Search",
      //   icon: GoSearch,
      // },
    ];
  } else {
    linkItems = [
      {
        name: "all",
        displayAs: "All",
        icon: FaGlobeAmericas,
      },
      {
        name: "book",
        displayAs: "Books",
        icon: IoIosBook,
      },
      {
        name: "movie",
        displayAs: "Movies",
        icon: CgCamera,
      },
      {
        name: "tv show",
        displayAs: "TV Shows",
        icon: CgTv,
      },
    ];
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          textAlign={"justify"}
        >
          <Image
            h="24px"
            w="auto"
            src="/ConsumedLogo_tight_background.png"
            padding={"none"}
            margin="none"
            display={"inline"}
            position="relative"
            top="3px"
          />
          onsumed
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem
          key={link.name}
          name={link.name}
          icon={link.icon}
          fontSize="18"
        >
          {link.displayAs}
        </NavItem>
      ))}
    </Box>
  );
}
