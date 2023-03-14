import { Container, Button, Stack } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import {API_URL} from '../helper'
import axios from "axios";

const Verification = () => {
  const location = useLocation();
  console.log("from verify page : ", location);

    const onBtnVerified = async() =>{
        try{
            let token = location.search.split('=')[1]
            let res = await axios.patch(API_URL + `/users/verify`,{},{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (err)
        {
            console.log(err)
        }
    }

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <h2>Verify Your Account</h2>
      <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" size="md" 
        onClick={onBtnVerified}
        >
          Verify
        </Button>
      </Stack>
    </Container>
  );
};

export default Verification;
