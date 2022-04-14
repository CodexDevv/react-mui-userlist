import React, {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./User.css";

function User({
                  firstName,
                  lastName,
                  gender,
                  age,
                  location,
                  imgUrl,
                  email,
                  username,
                  password,
                  phone,
                  registered,
              }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <Card variant="outlined" sx={{marginTop: 1}}>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{marginBottom: 2, paddingLeft: 0.5, fontWeight: 600}}
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip variant="outlined" label={gender}/>
                        <Chip variant="outlined" label={age}/>
                        <Chip variant="outlined" label={location.country}/>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button
                        size="normal"
                        variant="contained"
                        sx={{marginLeft: 1, marginBottom: 2}}
                        onClick={handleOpen}
                    >
                        Learn More
                    </Button>
                </CardActions>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth={"md"}
                >
                    <DialogTitle sx={{fontWeight: 600, marginLeft: {xs: 0, md: 3}}}>
                        {firstName} {lastName}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{display: {xs: "block", md: "flex"}, padding: {xs: 0, md: 2}}}>
                            <img src={imgUrl} className="img-dialog" alt="profile-pic"/>
                            <Stack spacing={2} sx={{paddingLeft: {xs: 0, md: 4}, paddingBottom: {xs: 2, md: 0}}}>
                                <TextField
                                    size="small"
                                    label="Gender"
                                    defaultValue={gender}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    size="small"
                                    label="Age"
                                    defaultValue={age}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    size="small"
                                    label="Country"
                                    defaultValue={location.country}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    size="small"
                                    label="Email"
                                    defaultValue={email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                            </Stack>

                            <Stack spacing={2} sx={{paddingLeft: {xs: 0, md: 4}}}>
                                <TextField
                                    size="small"
                                    label="Username"
                                    defaultValue={username}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    size="small"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    defaultValue={password}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityIcon/>
                                                    ) : (
                                                        <VisibilityOffIcon/>
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    size="small"
                                    label="Phone"
                                    defaultValue={phone}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    size="small"
                                    label="Registered Date"
                                    defaultValue={registered.date.slice(0, 10)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                            </Stack>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="link" onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </>
    );
}

export default User;
