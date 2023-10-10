import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { Typography, Container, Button, TextField, Box } from "@mui/material";
import styles from '../styles/ContactForm.module.css'

const ContactForm: React.FC = () => {
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
    <Container
      className={styles.formContainer}
    >
      <Typography variant="h4" className={styles.formHeader}>
        Contact Us
      </Typography>
      <form 
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={styles.textField}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          type="email"
          className={styles.textField}
        />
        <TextField
          label="Message"
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
          Submit
        </Button>
      </form>
      {
        showMessage && 
        <Box className={styles.messageBox}>
            <Typography className={styles.messageHeader} variant='h6'>
                { user ? `User ${user?.name}'s message not sent` : 'Your message could not be sent'}
            </Typography>
            <Typography className={styles.messageBody} variant='body1'>
                Your form has been submitted successfully. However, your message will not be sent because the API doesn't have the capability and this form is just for show.
            </Typography>
            <Button className={styles.secondaryButton} onClick={() => setShowMessage(false)}>Close message</Button>
        </ Box>
      }
    </Container>
  );
};

export default ContactForm;
