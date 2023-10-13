import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { Typography, Container, Button, TextField, Box } from "@mui/material";
import styles from '../styles/styles.module.css';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const ContactForm: React.FC = () => {
  const { language } = useLanguage()
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    message: '',
  });
  const [showMessage, setShowMessage] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      name: user ? user.name : '',
      email: user ? user.email : '',
      message: '',
    });

    setShowMessage(true)

  };

  return (
    <Container className={styles.cfmContainer}>
      <form 
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <TextField
          label={getTranslation(language, 'Name')}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Email')}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          type="email"
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Message')}
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          multiline
          rows={4}
          className={styles.textField}
        />
        <Button 
          type="submit"
          className={styles.primaryButton}
        >
          {getTranslation(language, 'Submit')}
        </Button>
      </form>
      {
        showMessage && 
        <Box className={styles.messageBox}>
            <Typography className={styles.messageHeader} variant='h6'>
                {getTranslation(language, 'Your message could not be sent')}
            </Typography>
            <Typography className={styles.messageBody} variant='body1'>
                {getTranslation(language, 'This is because the API does not currently support this feature')}
            </Typography>
            <Button className={styles.secondaryButton} onClick={() => setShowMessage(false)}>{getTranslation(language, 'Close message')}</Button>
        </ Box>
      }
    </Container>
  );
};

export default ContactForm;
