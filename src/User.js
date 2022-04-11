import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

//TODO: Add Modal for more info(with profile picture, location, email, username, password etc.)
//TODO: Add some shadow to the card
//todo: add paginate function in react query

function User({ firstName, lastName, gender, age, location }) {
  return (
    <Card variant="outlined" sx={{ marginTop: 1 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {firstName} {lastName}
        </Typography>
        <Stack direction="row" spacing={4} alignItems="center">
          <p>{gender}</p>
          <p>{age}</p>
          <p>{location.country}</p>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained">View More Info</Button>
      </CardActions>
    </Card>
  );
}

export default User;
