import axios from "axios";
import React, {useEffect} from "react";
import {useInfiniteQuery} from "react-query";
import User from "./User";
import Container from "@mui/material/Container";

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
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery("fetchedData", ({pageParam = 1}) => fetchAPI(pageParam), {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.info.page + 1
        },
    });

    useEffect(() => {
        let fetching = false;

        async function onScroll(event) {
            const {scrollHeight, scrollTop, clientHeight} = event.target.scrollingElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
                fetching = true;
                if (hasNextPage) await fetchNextPage();
                fetching = false;
            }
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [])

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    console.log(data);

    return (
        <Container>
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
    );
}

export default App;
