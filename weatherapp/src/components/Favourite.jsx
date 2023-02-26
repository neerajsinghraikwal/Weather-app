import { Grid, GridItem, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import "../styles/Favourite.css";
const Favourite = ({ favourites, getData }) => {
  const [details, setDetails] = useState([]);
  const API_key = "3c6bf3af9d5c7b2cfa4b0f6f3ba0e819";

  function fetchWeatherData(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return {
          city: data.name,
          temp: (data.main.temp - 273.15).toFixed(2),
          image: data.weather[0].icon,
          weather: data.weather[0].main
        };
      })
      .catch((error) => {
        console.error(
          `Error fetching weather data for ${city}: ${error.message}`
        );
        return null;
      });
  }

  Promise.all(
    favourites.map((city) => {
      return fetchWeatherData(city);
    })
  ).then((results) => {
    setDetails(results)
  });

  return (
    <Grid
      w={"90%"}
      templateColumns={[
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(5, 1fr)",
      ]}
      gap={"5"}
      m="auto"
      mt={"40px"}
    >
      {details.map((el) => {
        return (
          <GridItem className="favbox" >
            <Heading fontSize={["20px","25px","30px"]}>{el.city}</Heading>
            <HStack>
              <Image src={`http://openweathermap.org/img/w/${el.image}.png`} w="50px" h="50px"></Image>
              <Heading fontSize={["18px","22px","26px"]}>
                {el.temp}
                {"\u00b0"}C
              </Heading>
            </HStack>
            <Text fontSize={["15px","18px","22px"]} fontWeight="bold">{el.weather}</Text>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default Favourite;
