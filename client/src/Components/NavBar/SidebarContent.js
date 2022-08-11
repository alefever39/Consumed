import {
  Button,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoIosBook } from "react-icons/io";
import { CgCamera, CgTv } from "react-icons/cg";
import { FaGlobeAmericas } from "react-icons/fa";
import NavItem from "./NavItem";

export default function SidebarContent({ onClose, ...rest }) {
  const linkItems = [
    {
      name: "All",
      icon: FaGlobeAmericas,
    },
    {
      name: "Books",
      icon: IoIosBook,
    },
    {
      name: "Movies",
      icon: CgCamera,
    },
    {
      name: "TV shows",
      icon: CgTv,
    },
  ];

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
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Consumed
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} fontSize="18">
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
