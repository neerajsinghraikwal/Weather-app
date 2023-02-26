import React, { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import Card from "../components/Card";
import "../styles/Home.css"
import { Heading, Switch } from "@chakra-ui/react";

const Home = () => {
  const [city, setCity] = useState("");
  const [data,setData] = useState(null);
  const [scale,setScale] = useState(false)

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const handleSwitch = () => {
    setScale(!scale)
  }

  const API_key = "3c6bf3af9d5c7b2cfa4b0f6f3ba0e819";
  async function getData() {
    try {
      let details = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
      );
      console.log(details.data);
      setData(details.data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home">
      <Form handleChange={handleChange} handleSubmit={handleSubmit}></Form>
      <Heading><Switch colorScheme='teal' size='lg' mt={"20px"} isChecked={scale} onChange={handleSwitch} >&#8457;</Switch></Heading>
      {data ? <Card data={data} scale= {scale}></Card> : null}
    </div>
  );
};

export default Home;
