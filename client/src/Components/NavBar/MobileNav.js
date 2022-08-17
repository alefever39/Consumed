import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Image,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../Slices/userSlice";
import { setSelectedPage } from "../Slices/pageSlice";

function MobileNav({ onOpen, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const addType = useSelector((state) => state.page.addType);

  function handleLogout(e) {
    e.preventDefault();
    fetch(`/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(() => {
      dispatch(logout());
      history.push("/login");
    });
  }

  function handleLinkClick(e) {
    dispatch(setSelectedPage(e.target.name));
    if (e.target.name === "create") {
      history.push(`/${addType}`);
    } else {
      history.push(e.target.name);
    }
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="10vh"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
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
          top="4px"
        />
        onsumed
      </Text>

      <HStack spacing={{ base: "0", md: "10" }}>
        <Breadcrumb separator="|" display={{ base: "none", md: "flex" }}>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              onClick={handleLinkClick}
              name="home"
              fontSize="l"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              onClick={handleLinkClick}
              name="create"
              fontSize="l"
            >
              Add Media
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              onClick={handleLinkClick}
              name="my_media"
              fontSize="l"
            >
              My Media
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/" fontSize="l">
              Series
            </BreadcrumbLink>
          </BreadcrumbItem> */}
        </Breadcrumb>

        <Flex display={{ base: "flex", md: "none" }} pr="10px">
          <Menu display={{ base: "flex", md: "none" }}>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "flex", md: "none" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Options</Text>
                  {/* <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text> */}
                </VStack>
                <Box display={{ base: "flex", md: "none" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              zIndex={2}
            >
              <MenuItem onClick={handleLinkClick} name="home">
                Home
              </MenuItem>
              <MenuItem onClick={handleLinkClick} name="create">
                Add Media
              </MenuItem>
              <MenuItem onClick={handleLinkClick} name="my_media">
                My Media
              </MenuItem>
              {/* <MenuItem>Series</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  name={user ? user.first_name + " " + user.last_name : null}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user ? user.first_name + " " + user.last_name : null}
                  </Text>
                  {/* <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text> */}
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              zIndex={2}
            >
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider /> */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}

export default MobileNav;
