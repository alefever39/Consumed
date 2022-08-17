import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
  Select,
  Checkbox,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Slices/userSlice";
import CustomNumberInput from "./CustomNumberInput";
import { buildDateOptionsSelector } from "../HelperFunctions/mediaFormFunctions";
import SimplifiedMediaCard from "./SimplifiedMediaCard";

function MediaSearchForm({ origin }) {
  const [mediaSearch, setMediaSearch] = useState("");
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  //////////////////// Handle Input Change
  function handleInputChange(e) {
    setMediaSearch(e.target.value);
  }

  //////////////////// Handle submit
  function handleSearchSubmit(e) {
    e.preventDefault();
    fetch(`/media?search=${mediaSearch}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          console.log(data);
          setResults(data);
        }
      });
  }

  return (
    <Flex
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
      w="full"
      h={"83vh"}
      direction="column"
      overflow={"auto"}
    >
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Search for new media!</Heading>
      </Stack>
      <Stack spacing={4}>
        {/* search */}
        <FormControl id="search" isRequired>
          <FormLabel>Search: </FormLabel>
          <Input
            type="input"
            id="search"
            name="search"
            value={mediaSearch}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Error Handling */}
        {errors
          ? errors.map((error, i) => {
              return (
                <div key={i + "media errors"}>
                  <p>{error}</p>
                  <br />
                </div>
              );
            })
          : null}

        {/* submit buttons */}
        <Flex justify={"space-around"}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </Flex>
      </Stack>
      <Flex gap={6} padding={6} wrap="wrap" justify="space-around">
        {results ? (
          results.map((medium) => {
            return <SimplifiedMediaCard key={medium.id} media={medium} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </Flex>
    </Flex>
  );
}

export default MediaSearchForm;
