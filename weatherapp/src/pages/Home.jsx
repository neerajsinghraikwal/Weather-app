import React, { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import Card from "../components/Card";
import "../styles/Home.css";
import { Box, Heading, Switch, useToast } from "@chakra-ui/react";
import Favourite from "../components/Favourite";

const Home = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [scale, setScale] = useState(false);
  const [flag, setFlag] = useState(false);
  const toast = useToast()
  const API_key = "3c6bf3af9d5c7b2cfa4b0f6f3ba0e819";
  
  // set the city
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  // submit the city
  const handleSubmit = (e) => {
    e.preventDefault();
    getData(city,API_key);
  };

  // switch to Farenheit
  const handleSwitch = () => {
    setScale(!scale);
  };

  let favourites = JSON.parse(localStorage.getItem("favourite")) || [];
  const handleFavourite = () => {
    if (favourites.includes(data.name)) {
      let newfav = favourites.filter((el) => el !== data.name);
      console.log("newfav", newfav);
      localStorage.setItem("favourite", JSON.stringify(newfav));
      toast({
        title: 'Removed',
        description: "Removed from Favourites",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position:'top'
      })
      setFlag(!flag);
    } else {
      favourites.push(data.name);
      localStorage.setItem("favourite", JSON.stringify(favourites));
      toast({
        title: 'Added',
        description: "Added to Favourites",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position:'top'
      })
      setFlag(!flag);
    }
  };


  async function getData(city,API_key) {
    try {
      let details = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
      );
      setData(details.data);
      toast({
        title: 'Success',
        description: "City found",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position:'top'
      })
    } catch (err) {
      toast({
        title: 'Try Again',
        description: "City not found",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position:'top'
      })
      console.log(err);
    }
  }

  return (
    <div className="home">
      <Form handleChange={handleChange} handleSubmit={handleSubmit}></Form>
      <Heading>
        <Switch
          colorScheme="teal"
          size="lg"
          mt={"20px"}
          isChecked={scale}
          onChange={handleSwitch}
        >
          &#8457;
        </Switch>
      </Heading>
      {data ? (
        <Card
          data={data}
          scale={scale}
          handleFavourite={handleFavourite}
          flag={flag}
          favourites={favourites}
        ></Card>
      ) : null}
      <h1 className="heading">Favourite</h1>
      <Favourite favourites={favourites} getData={getData}></Favourite>
      <Box w="100%" h="400px"></Box>
    </div>
  );
};

export default Home;
