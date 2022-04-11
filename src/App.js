import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import User from "./User";
import Container from "@mui/material/Container";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function App() {
  const { isLoading, data, error } = useQuery("fetchedData", fetchAPI);

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
        };
        return <User {...props} />;
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
