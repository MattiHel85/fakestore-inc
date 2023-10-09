import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { User } from "../types/User";
import { RootState } from "../redux/slices/rootSlice";
import UpdateUser from "./UpdateUser";
import { Button, Container, Box } from "@mui/material";
import UserCard from "./UserCard";

const SingleUser: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const [openUserUpdateForm, setOpenUserUpdateForm] = useState(false)


    const signedInUser = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`);
                const data = await res.json();
                setUser(data); 
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        
        fetchData(); 
    
    }, [id]);


    const toggleUpdateUserForm = () => {
        openUserUpdateForm && setOpenUserUpdateForm(false)
        !openUserUpdateForm && setOpenUserUpdateForm(true)
    }

    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <>
            <Container
                sx={{display:'flex', flexDirection: 'column', justifyContent: 'center'}}
            >
                <UserCard user={user} />
                <Box
                    sx={{
                        display:'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button sx={{marginTop: '2em'}} onClick={handleGoBack}>Go Back</Button>
                    { 
                        signedInUser?.role === 'admin' || user?.id === signedInUser?.id ?
                            <Button sx={{marginTop: '2em'}} onClick={toggleUpdateUserForm}>{openUserUpdateForm ? 'Done' : 'Update User'}</Button> : 
                            <></> 
                    }
                </Box>
            </Container>
            { 
                openUserUpdateForm ?  <UpdateUser user={user} /> : <></>            
            }  
        </>
    );
};

export default SingleUser;