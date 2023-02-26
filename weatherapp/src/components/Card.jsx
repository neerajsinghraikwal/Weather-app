import {
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import "../styles/Card.css";
import humimg from "../assets/humidity.png";
import press from "../assets/press.png";
import wind from "../assets/wind.png";
import sunrise from "../assets/sunrise.png";
import { AiFillHeart } from "react-icons/ai";
const Card = ({ data, scale ,handleFavourite,flag,favourites}) => {

  // Sunrise Time
  let timestamp = data.sys.sunrise;
  let time = new Date(timestamp * 1000);
  let sunrisetime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Temperature Conversion  
  let tempcel = (data.main.temp - 273.15).toFixed(2);
  let tempfar = ((data.main.temp - 273.15) * (9 / 15) + 32).toFixed(2);
  let feelscel = (data.main.feels_like - 273.15).toFixed(2);
  let feelsfar = ((data.main.feels_like - 273.15) * (9 / 15) + 32).toFixed(2);

  // Factors Value
  let factors = ["Humidity", "Pressure", "Wind", "Sunrise"];
  let factorvalue = [
    `${data.main.humidity}%`,
    data.main.pressure,
    `${data.wind.speed}km/hr`,
    sunrisetime,
  ];
  let factorimg = [humimg, press, wind, sunrise];

  return (
    <>
      <Stack
        className="outercard"
        p="20px"
        w={["90%", "70%", "60%", "50%", "30%"]}
        bgColor=""
      >
        <HStack m={"auto"}>
          <Heading mt={"10px"}>{data.name} </Heading>
          <AiFillHeart size="30px" color={favourites.includes(data.name) ? "red" : "white"} onClick={handleFavourite}/>
        </HStack>
        <HStack className="innercard">
          <img
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt=""
          />
          <Heading>
            {scale ? tempfar : tempcel}{" "}
            {scale ? `${"\u00b0"}F` : `${"\u00b0"}C`}
          </Heading>
        </HStack>
        <h4
          style={{ marginTop: "-20px", fontSize: "20px", fontWeight: "bold" }}
        >
          {data.weather[0].main}
        </h4>
        <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Feels like {scale ? feelsfar : feelscel}{" "}
          {scale ? `${"\u00b0"}F` : `${"\u00b0"}C`}
        </h4>
        <Grid
          w={"100%"}
          templateRows="repeat(2, 80px)"
          templateColumns="repeat(2, 1fr)"
          gap={"5"}
        >
          {factors.map((el, index) => {
            return (
              <GridItem bgColor={"#0d96a0"} borderRadius="20px">
                <HStack w="100%" h="100%">
                  <Image
                    src={factorimg[index]}
                    alt=""
                    borderRadius={"10px"}
                    w={["30px", "40px", "50px"]}
                    h={["30px", "40px", "50px"]}
                    ml={"10px"}
                    mr="10px"
                  />
                  <VStack>
                    <Text fontSize={["15px", "18px", "20px"]} fontWeight="bold">
                      {el}
                    </Text>
                    <Text fontSize={["15px", "18px", "20px"]} fontWeight="bold">
                      {factorvalue[index]}
                    </Text>
                  </VStack>
                </HStack>
              </GridItem>
            );
          })}
        </Grid>
      </Stack>
    </>
  );
};

export default Card;
