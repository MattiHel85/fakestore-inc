import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { User } from "../types/User";
import { RootState } from "../redux/slices/rootSlice";
import UpdateUser from "./UpdateUser";
import { Button, Container, Box } from "@mui/material";
import UserCard from "./UserCard";
import styles from '../styles/styles.module.css'

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const SingleUser: React.FC = () => {
    const {language} = useLanguage();
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
            <Container className={styles.userContainer}>
                <UserCard user={user} />
                <Box className={styles.buttonBox}>
                    <Button className={styles.primaryButton} onClick={handleGoBack}>{getTranslation(language, 'Back')}</Button>
                    { 
                        signedInUser?.role === 'admin' || user?.id === signedInUser?.id ?
                            <Button className={styles.updateButton} onClick={toggleUpdateUserForm}>
                                {/* {openUserUpdateForm ? 'Done' : 'Update User'} */}
                                {openUserUpdateForm && getTranslation(language, 'Done') }
                                {!openUserUpdateForm && getTranslation(language, 'Update user')}
                            </Button> : 
                            <></> 
                    }
                </Box>
            </Container>
            { 
                openUserUpdateForm ?  <UpdateUser user={user} setUser={setUser}/> : <></>            
            }  
        </>
    );
};

export default SingleUser;