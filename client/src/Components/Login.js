import {
  Button,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Heading,
  Text,
  Link,
  Box,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../Slices/userSlice";

function Login() {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          dispatch(getUser(data));
          history.push("/home");
        }
      });
  }

  function handleSignupClick() {
    history.push("/signup");
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start tracking!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            {errors
              ? errors.map((error, i) => {
                  return (
                    <div key={i + "login errors"}>
                      <p>{error}</p>
                      <br />
                    </div>
                  );
                })
              : null}
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"center"}
              >
                <Text>Don't have an account?</Text>
                <Link color={"blue.400"} onClick={handleSignupClick}>
                  Signup!
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={handleLoginSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );

  // return (
  //   <form onSubmit={handleLoginSubmit}>
  //     <FormControl isRequired>
  //       <FormLabel htmlFor="email">Email</FormLabel>
  //       <Input
  //         id="email"
  //         type="email"
  //         name="email"
  //         placeholder="example@example.com"
  //         value={formData.email}
  //         onChange={handleInputChange}
  //       />
  //       <FormHelperText>We'll never share your email.</FormHelperText>
  //     </FormControl>
  //     <br />
  //     <FormControl isRequired>
  //       <FormLabel htmlFor="password">Password</FormLabel>
  //       <Input
  //         id="password"
  //         type="password"
  //         name="password"
  //         placeholder=""
  //         value={formData.password}
  //         onChange={handleInputChange}
  //       />
  //     </FormControl>
  //     <br />
  //     {errors
  //       ? errors.map((error) => {
  //           return (
  //             <>
  //               <p key={error}>{error}</p>
  //               <br />
  //             </>
  //           );
  //         })
  //       : null}
  //     <Flex>
  //       <Spacer />
  //       <Button colorScheme="teal" type="submit">
  //         Login
  //       </Button>
  //       <Spacer />
  //     </Flex>
  //   </form>
  // );
}

export default Login;
