import { Button, Input, Stack } from "@chakra-ui/react";
import React from "react";

const Form = ({ handleChange, handleSubmit }) => {
  return (
    <Stack pt="30px">
      <form onSubmit={handleSubmit}>
        <Input w={"300px"} onChange={handleChange} bgColor="white"></Input>
        <Button type="submit" colorScheme="blue" ml="20px">Get Weather</Button>
      </form>
    </Stack>
  );
};

export default Form;
