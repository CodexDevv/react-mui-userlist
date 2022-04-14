import axios from "axios";
import React, {useEffect, useState} from "react";
import {useInfiniteQuery} from "react-query";
import User from "./User";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {createTheme, CssBaseline, FormControl, FormControlLabel, FormGroup, Switch, ThemeProvider} from "@mui/material";

//TODO: Get System Theme (dark mode or light mode) and set it as default.

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function fetchAPI(page) {
    const {data} = await axios.get(`https://randomuser.me/api/?page=${page}&results=20&seed=codexdevv`);
    console.log(data);
    return data;
}

function App() {
    const {
        isLoading,
        data,
        error,
        fetchNextPage,
    } = useInfiniteQuery("fetchedData", ({pageParam = 1}) => fetchAPI(pageParam), {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
            return lastPage.info.page + 1;

        },
    });

    const [isDark, setIsDark] = useState(false);
    const changeTheme = () => setIsDark(!isDark);

    const light = {
        palette: {
            mode: "light",
        },
    };

    const dark = {
        palette: {
            mode: "dark",
        },
    };

    useEffect(() => {
        let fetching = false;

        async function onScroll(event) {
            const {scrollHeight, scrollTop, clientHeight} = event.target.scrollingElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 5) {
                fetching = true;
                await fetchNextPage();
                fetching = false;
            }
        }

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [fetchNextPage])

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    console.log(data);

    return (
        <ThemeProvider theme={isDark ? createTheme(dark) : createTheme(light)}>
            <CssBaseline/>
            <Box>
                <AppBar position="sticky">
                    <ToolBar sx={{flexGrow: 1}}>
                        <Typography variant={'h5'} component={"div"} sx={{flexGrow: 1, fontWeight: 500}}>User
                            Gen</Typography>
                        <FormControl>
                            <FormGroup>
                                <FormControlLabel control={<Switch onChange={changeTheme}/>}
                                                  label={isDark ? "Dark" : "Light"}/>
                            </FormGroup>
                        </FormControl>

                    </ToolBar>
                </AppBar>
                <Container sx={{marginTop: 3}}>
                    {data.pages.map((page) =>
                        page?.results.map((_, index) => {
                            const result = page?.results[index];
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
                        })
                    )}
                </Container>
            </Box>
        </ThemeProvider>

    );
}

export default App;
