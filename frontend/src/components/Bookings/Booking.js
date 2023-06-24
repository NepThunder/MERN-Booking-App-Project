import { Button, FormLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMoviedetails, newBooking } from '../../api-helper/api-helpers';
const Booking = () => {
    const [movie, setMovie] = useState()
    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
    const id = useParams().id;
    console.log(id);


    useEffect(() => {
        getMoviedetails(id).then((res) => {
            setMovie(res.movie);
        })
    }, [id]);

    console.log(movie);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, movie: movie._id }).then((res) => {
            console.log(res);
            window.alert('Movie Booked'); 
            window.location.reload();
        }).catch((err) => console.log(err));
        

    }
    const getCurrentDate = () => {
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        const year = today.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }

        if (month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${day}`;
    };




    return (
        <>
            {movie &&
                <Fragment>

                    <Typography padding={3}
                        fontFamily="fantasy"
                        variant='h4'
                        textAlign={'center'}
                    >Book Tickets of movie:
                        {movie.title}
                    </Typography>


                    <Box display={'flex'} justifyContent={"center"} >
                        <Box display={'flex'} justifyContent={"column"}
                            flexDirection="column"
                            paddingTop={3}
                            width="50%"
                            marginRight={"auto"}
                        >
                            <img width="80%"
                                height={"300px"}
                                src={movie.posterUrl}
                                alt={movie.title}
                            />

                            <Box width={"80%"}
                                marginTop={3}
                                padding={2} >
                                <Typography paddingTop={2}>
                                    <Typography sx={{ fontWeight: 'bold' }}>Description:</Typography> {movie.description}
                                </Typography>
                                <Typography fontWeight={'bold'} marginTop={1}>
                                    Starrer:</Typography>
                                <Typography>
                                    {movie.actors.map((actor) => " " + actor + "")}
                                </Typography>

                                <Typography fontWeight={'bold'} marginTop={1} >
                                    Release Date: </Typography>
                                <Typography>
                                    {new Date(movie.releaseDate).toDateString()}
                                </Typography>



                            </Box>
                        </Box>
                        <Box width={"50%"} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box
                                    padding={5} // 1st  
                                    margin={'auto'}
                                    display="flex"
                                    flexDirection={'column'}
                                >
                                    <FormLabel>
                                        seat Number
                                    </FormLabel>
                                    <TextField
                                        value={inputs.seatNumber}
                                        onChange={handleChange}
                                        name='seatNumber'
                                        type={'number'}
                                        margin="normal"
                                        variant='standard'
                                        inputProps={{
                                            min: 1,
                                            max: 200,
                                            step: 1
                                        }}
                                    />
                                    <FormLabel>
                                        Booking Date
                                    </FormLabel>
                                    <TextField
                                        value={inputs.date}
                                        onChange={handleChange}
                                        name='date'
                                        type='date'
                                        margin='normal'
                                        variant='standard'
                                        inputProps={{
                                            min: getCurrentDate()
                                        }}
                                    />
                                    <Button type='submit' sx={{ fontSize: "18px", color: 'black', backgroundColor: "#1F995C", marginLeft: '200px', width: '200px', border: '1.5px solid black', mt: 3 }}>
                                        Book Now
                                    </Button>
                                </Box>
                            </form>

                        </Box>
                    </Box>
                </Fragment>
            }
        </>
    )
}

export default Booking
