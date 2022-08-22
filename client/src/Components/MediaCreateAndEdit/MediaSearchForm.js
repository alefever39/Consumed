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
  const [checkbox, setCheckbox] = useState({
    consumed: true,
    imdb: false,
  });
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  //////////////////// Handle Input Change
  function handleInputChange(e) {
    setMediaSearch(e.target.value);
  }

  function handleCheckboxChange(e) {
    setCheckbox((checkbox) => {
      return {
        ...checkbox,
        [e.target.name]: e.target.checked,
      };
    });
  }

  //////////////////// Handle submit
  function handleSearchSubmit(e) {
    e.preventDefault();
    const checkedOptions = JSON.stringify(checkbox);
    fetch(`/media?search=${mediaSearch}&options=${checkedOptions}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setResults(data);
        }
      });
  }

  function removeMediaFromResults(media_id) {
    setResults((results) => results.filter((result) => result.id !== media_id));
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

        {/* search options */}
        <FormControl id="search_options">
          <FormLabel>Where would you like to search?</FormLabel>
          {/* consumed */}
          <Checkbox
            id="consumed"
            name="consumed"
            isChecked={checkbox.consumed}
            onChange={handleCheckboxChange}
          >
            Consumed
          </Checkbox>
          {/* imdb */}
          <Checkbox
            id="imdb"
            name="imdb"
            isChecked={checkbox.imdb}
            onChange={handleCheckboxChange}
            pl="10px"
          >
            imdb
          </Checkbox>
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
            return (
              <SimplifiedMediaCard
                removeMediaFromResults={removeMediaFromResults}
                key={medium.id}
                media={medium}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </Flex>
    </Flex>
  );
}

export default MediaSearchForm;
