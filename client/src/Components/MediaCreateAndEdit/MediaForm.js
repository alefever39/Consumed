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
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Slices/userSlice";
import CustomNumberInput from "./CustomNumberInput";
import { setSelectedPage } from "../Slices/pageSlice";
import { buildDateOptionsSelector } from "../HelperFunctions/mediaFormFunctions";

function MediaForm({ origin }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const date = new Date();
  const editInfo = useSelector((state) => {
    return state.media.editInfo;
  });
  const user = useSelector((state) => {
    return state.user.user;
  });

  if (!user) {
    history.push("/login");
  }

  let initialFormData;
  let initialExistState = {
    series: false,
    season: false,
  };
  if (origin === "edit") {
    if (!editInfo.media) {
      history.push("/login");
    }
    const release_date_array = editInfo.media.medium.release_date.split("-");
    const creator = editInfo.media.creators
      .map((creator) => creator.name)
      .join(", ");

    initialFormData = {
      title: editInfo.media.medium.title,
      media_type: editInfo.media.media_type.media_type,
      image: editInfo.media.medium.image,
      creator: creator,
      year: release_date_array[0],
      month: release_date_array[1],
      date: release_date_array[2],
      description: editInfo.media.medium.description,
      rating: editInfo.media.rating,
      review: editInfo.media.review,
      notes: editInfo.media.notes,
      site_consumed: editInfo.media.site_consumed,
      consumed: editInfo.media.consumed,
    };

    if (!!editInfo.mediaSeries && editInfo.mediaSeries.series.title) {
      initialExistState.series = true;
      initialFormData.series_title = editInfo.mediaSeries.series.title;
      initialFormData.media_number = editInfo.mediaSeries.number;
      initialFormData.season_number = editInfo.mediaSeries.season.number;

      if (editInfo.mediaSeries.season.season_exists) {
        initialExistState.season = true;
      }
    } else {
      initialExistState.series = false;
      initialExistState.season = false;
      initialFormData.media_number = 1;
      initialFormData.season_number = 1;
    }
  } else {
    initialExistState = {
      series: false,
      season: false,
    };
    initialFormData = {
      title: "",
      media_type: "",
      image: "",
      creator: "",
      year: date.getFullYear(),
      month: 0,
      date: 0,
      description: "",
      rating: 0,
      review: "",
      series_title: "",
      season_number: 1,
      media_number: 1,
      notes: "",
      site_consumed: "",
      consumed: "not consumed",
    };
  }

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const [seriesExists, setSeriesExists] = useState(initialExistState.series);
  const [seasonExists, setSeasonExists] = useState(initialExistState.season);

  //////////////////// Handle Input Change
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //////////////////// Date helper functions
  function handleNumberChange(num, label, min) {
    const testNumber = parseInt(formData[label]) + parseInt(num);
    let number;
    if (testNumber === "") {
      number = 0;
    } else if (min === "none") {
      number = testNumber;
    } else if (testNumber <= parseInt(min)) {
      number = parseInt(min);
    } else {
      number = testNumber;
    }
    setFormData({
      ...formData,
      [label]: number,
    });
  }

  function handleNumberInputChange(num, label, min) {
    let number;
    if (num === "") {
      number = 0;
    } else if (min === "none") {
      number = num;
    } else if (num <= parseInt(min)) {
      number = parseInt(min);
    } else {
      number = num;
    }
    setFormData({ ...formData, [label]: parseInt(number) });
  }

  //////////////////// Handle submit
  function handleAddMediaSubmit(e) {
    e.preventDefault();
    const sendForm = {
      ...formData,
      series_exists: seriesExists,
      season_exists: seasonExists,
      description: formData.description.split(/\r?\n/).join("\n"),
    };
    fetch("/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(sendForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors([]);
          dispatch(setSelectedPage("my_media"));
          history.push("/my_media");
        }
      });
  }

  //////////////////// Handle edit save
  function handleEditMediaSubmit(e) {
    e.preventDefault();

    const creator_ids = editInfo.media.creators
      .map((creator) => creator.id)
      .join(", ");

    const sendForm = {
      ...formData,
      series_exists: seriesExists,
      season_exists: seasonExists,
      media_user_id: editInfo.media.id,
      creator_ids: creator_ids,
      media_type_id: editInfo.media.media_type.id,
      media_series_id: "none",
      series_id: "none",
      season_id: "none",
      description: formData.description.split(/\r?\n/).join("\n"),
    };

    if (editInfo.mediaSeries) {
      sendForm.media_series_id = editInfo.mediaSeries.id;
      sendForm.series_id = editInfo.mediaSeries.series.id;
      sendForm.season_id = editInfo.mediaSeries.season.id;
    }

    fetch(`/media/${editInfo.media.medium.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(sendForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors([]);
          dispatch(setSelectedPage("my_media"));
          history.push("/my_media");
        }
      });
  }

  function handleAddMediaEditCancel(e) {
    e.preventDefault();
    history.goBack();
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
        {origin === "edit" ? (
          <Heading fontSize={"4xl"}>
            Edit "{editInfo.media.medium.title}"
          </Heading>
        ) : (
          <Heading fontSize={"4xl"}>Add a new piece of media!</Heading>
        )}
      </Stack>
      <Stack spacing={4}>
        {/* Title */}
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="input"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Media Type */}
        <FormControl id="media_type" isRequired>
          <FormLabel>Media Type</FormLabel>
          <Select
            placeholder="Select option"
            value={formData.media_type}
            onChange={handleInputChange}
            name="media_type"
          >
            <option value="book">Book</option>
            <option value="movie">Movie</option>
            <option value="tv show">TV Show</option>
          </Select>
        </FormControl>

        {/* Image */}
        <FormControl id="image">
          <FormLabel>Image</FormLabel>
          <Input
            type="input"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* site consumed */}
        <FormControl id="site_consumed">
          <FormLabel>Where to consume</FormLabel>
          <Input
            type="input"
            id="site_consumed"
            name="site_consumed"
            value={formData.site_consumed}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Consumed */}
        <FormControl id="consumed">
          <FormLabel>Consumed Status</FormLabel>
          <Select
            value={formData.consumed}
            onChange={handleInputChange}
            name="consumed"
          >
            <option value="not consumed">Not Consumed</option>
            <option value="consuming">Consuming</option>
            <option value="consumed">Consumed</option>
          </Select>
        </FormControl>

        {/* Creators */}
        <FormControl id="creator">
          <FormLabel>Creator(s)</FormLabel>
          <FormHelperText>
            Please separate each name with a comma.
          </FormHelperText>
          <Input
            type="input"
            id="creator"
            name="creator"
            value={formData.creator}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Release Date */}
        <FormControl id="release_date">
          <FormLabel>Release Date</FormLabel>
          <Flex direction={"column"} w={{ base: "full", md: "40%" }}>
            {/* Year */}
            <Flex align="center" justify={"space-between"}>
              <FormLabel fontSize="sm">Year</FormLabel>
              <CustomNumberInput
                onChange={handleNumberChange}
                onType={handleNumberInputChange}
                value={parseInt(formData.year)}
                name="year"
                defaultValue={parseInt(formData.year)}
                min={"none"}
              ></CustomNumberInput>
            </Flex>

            {/* Month */}
            <Flex align="center" justify={"space-between"} pt="10px">
              <FormLabel fontSize="sm">Month</FormLabel>
              <Select
                value={parseInt(formData.month)}
                onChange={(e) => handleInputChange(e)}
                name="month"
                placeholder="Not Applicable"
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </Select>
            </Flex>

            {/* Date */}
            <Flex align="center" justify={"space-between"} pt="10px">
              <FormLabel fontSize="sm">Date</FormLabel>
              <Select
                value={parseInt(formData.date)}
                onChange={(e) => handleInputChange(e)}
                name="date"
              >
                {buildDateOptionsSelector(formData.month)}
              </Select>
            </Flex>
          </Flex>
        </FormControl>

        {/* Description */}
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Rating */}
        <FormControl id="rating">
          <FormLabel>Rating</FormLabel>
          <Select
            placeholder="Select option"
            value={formData.rating}
            onChange={handleInputChange}
            name="rating"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </FormControl>

        {/* Review */}
        <FormControl id="review">
          <FormLabel>Review</FormLabel>
          <Textarea
            type="text"
            id="review"
            name="review"
            value={formData.review}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Series Information */}
        <Checkbox
          isChecked={seriesExists}
          onChange={() => setSeriesExists(!seriesExists)}
        >
          Part of a series
        </Checkbox>

        {seriesExists ? (
          <>
            {/* Series Title */}
            <FormControl id="series_title" isRequired>
              <FormLabel>Series Title</FormLabel>
              <Input
                type="input"
                id="series_title"
                name="series_title"
                value={formData.series_title}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* Season Information */}
            <Checkbox
              isChecked={seasonExists}
              onChange={() => setSeasonExists(!seasonExists)}
            >
              Series has seasons
            </Checkbox>
            {seasonExists ? (
              <>
                {/* Season Number */}
                <FormControl id="season_number" isRequired>
                  <FormLabel>Season Number</FormLabel>
                  <Flex align="center" justify={"space-between"}>
                    <CustomNumberInput
                      onChange={handleNumberChange}
                      onType={handleNumberInputChange}
                      value={formData.season_number}
                      name="season_number"
                      defaultValue={formData.season_number}
                      min={1}
                    ></CustomNumberInput>
                  </Flex>
                </FormControl>

                {/* Episode Number */}
                <FormControl id="episode_number" isRequired>
                  <FormLabel>Episode Number</FormLabel>
                  <Flex align="center" justify={"space-between"}>
                    <CustomNumberInput
                      onChange={handleNumberChange}
                      onType={handleNumberInputChange}
                      value={formData.media_number}
                      name="media_number"
                      defaultValue={formData.media_number}
                      min={1}
                    ></CustomNumberInput>
                  </Flex>
                </FormControl>
              </>
            ) : (
              <FormControl id="number" isRequired>
                <FormLabel>Number In Series</FormLabel>
                <Flex align="center" justify={"space-between"}>
                  <CustomNumberInput
                    onChange={handleNumberChange}
                    onType={handleNumberInputChange}
                    value={formData.media_number}
                    name="media_number"
                    defaultValue={formData.media_number}
                    min={1}
                  ></CustomNumberInput>
                </Flex>
              </FormControl>
            )}
          </>
        ) : null}

        {/* Notes */}
        <FormControl id="notes">
          <FormLabel>Notes</FormLabel>
          <Textarea
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
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

        {/* Buttons */}
        <Flex justify={"space-around"}>
          {origin === "edit" ? (
            <>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={handleEditMediaSubmit}
              >
                Save
              </Button>
              <Button
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={handleAddMediaEditCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              onClick={handleAddMediaSubmit}
            >
              Add New Media
            </Button>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
}

export default MediaForm;
