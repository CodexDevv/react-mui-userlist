import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import User from "./User";
import Container from "@mui/material/Container";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function App() {
  const { isLoading, data, error } = useQuery("fetchedData", fetchAPI, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <Container>
      {data?.results.map((_, index) => {
        const result = data?.results[index];
        const props = {
          firstName: result.name.first,
          lastName: result.name.last,
          gender: capitalize(result.gender),
          age: result.dob.age,
          location: result.location,
          imgUrl: result.picture.large,
          email: result.email,
          username: result.login.username,
          password: result.login.password,
          phone: result.cell,
          registered: result.registered,
        };
        return <User key={index} {...props} />;
      })}
    </Container>
  );
}

async function fetchAPI() {
  const { data } = await axios.get("https://randomuser.me/api/?results=20");
  console.log(data);
  return data;
}

export default App;
