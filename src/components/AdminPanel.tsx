import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container, Box, ButtonGroup, Button, } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import { RootState } from '../redux/slices/rootSlice';
import Users from './Users';
import UserCard from './UserCard';
import AddProduct from './AddProduct';
import ProductSearch from './ProductSearch';

const AdminPanel: React.FC = () => {
  const [chooseProducts, setChooseProducts] = useState(false)
  const [chooseAddProduct, setChooseAddProduct] = useState(false)
  const [chooseUpdateProduct, setChooseUpdateProduct] = useState(false)

  const [chooseCurrentUser, setChooseCurrentUser] = useState(false)
  const [viewCurrentUser, setViewCurrentUser] = useState(false)
  const [chooseUsers, setChooseUsers] = useState(false)
  const [viewUsers, setViewUsers] = useState(false)

  const user = useSelector((state: RootState) => state.auth.user);

  const closeUsers = () => {
    setViewUsers(false)
    setChooseUsers(false)
    setViewCurrentUser(false)
    setChooseCurrentUser(false)
  }

  const closeProducts = () => {
    setChooseProducts(false)
    setChooseAddProduct(false)
    setChooseUpdateProduct(false)
  }
  

  const openMyInfo = () => {
    closeAll()
    setChooseCurrentUser(true)
  }

  const openUsers = () => {
    closeAll()
    setChooseUsers(true)
  }

  const openProducts = () => {
    closeAll()
    setChooseProducts(true)
  }

  const closeAll = () => {
    closeProducts()
    closeUsers()
  }

  return (
    <>
      <Typography variant='h3' sx={{ textAlign: 'center', my: '2.5em' }}>
        Admin Panel for {user?.name}
      </Typography>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '3em'
        }}
      >
        <Box>
          <PersonIcon onClick={openMyInfo} sx={{
            fontSize: '10em',
            color: 'rgb(0, 209, 255)',
            "&:hover": {
              cursor: "pointer" 
            }
          }}/>
          <Typography variant='subtitle1' sx={{ textAlign: 'center', fontWeight: '700'}}>My Info</Typography>
        </Box>
        <Box>
          <GroupIcon onClick={openUsers} sx={{
            fontSize: '10em',
            color: 'rgb(0, 209, 255)',
            "&:hover": {
              cursor: "pointer" 
            }
          }}/>
          <Typography variant='subtitle1' sx={{ textAlign: 'center', fontWeight: '700'}}>Users</Typography>
        </Box>
        <Box>
          <Inventory2Icon onClick={openProducts} sx={{
            fontSize: '10em',
            color: 'rgb(0, 209, 255)',
            "&:hover": {
              cursor: "pointer" 
            }
          }}/>
          <Typography variant='subtitle1' sx={{ textAlign: 'center', fontWeight: '700'}}>Products</Typography>
        </Box>
      </Container>
      
      { chooseProducts && (
          <Container 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '70%',
              margin: 'auto',
              marginBottom: '2em',
              border: '.5em solid rgb(0, 209, 255)',
              borderRadius: '25px',
              padding: '3.5em'
            
            }}
          >
            <Typography variant='h5' sx={{ textAlign: 'center'}}>What do you want to do?</Typography>
          
            <ButtonGroup
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button onClick={() => setChooseAddProduct(true)} sx={{margin: '1em'}}>Add Product</Button>
              <Button onClick={() => setChooseUpdateProduct(true)} sx={{margin: '1em'}}>Update Product</Button>
              <Button onClick={() => setChooseProducts(false)} sx={{margin: '1em'}}>Done</Button>
            </ButtonGroup>
            
            { chooseAddProduct && ([<AddProduct />, <Button onClick={() => setChooseAddProduct(false)} sx={{margin: '1em'}}>Done</Button>]) }
            { chooseUpdateProduct && ([<ProductSearch />, <Button onClick={() => setChooseUpdateProduct(false)} sx={{margin: '1em'}}>Done</Button>]) }
          </Container>
        ) 
      }

      { chooseUsers && (
          <Container 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '70%',
              margin: 'auto',
              marginBottom: '2em',
              border: '.5em solid rgb(0, 209, 255)',
              borderRadius: '25px',
              padding: '3.5em'
            
            }}
          >
            <Typography variant='h5' sx={{ textAlign: 'center'}}>What do you want to do?</Typography>
          
            <ButtonGroup
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button onClick={() => setViewUsers(true)} sx={{margin: '1em'}}>View Users</Button>
              <Button onClick={() => setChooseUsers(false)} sx={{margin: '1em'}}>Done</Button>
            </ButtonGroup>
            
            { viewUsers && ([<Button onClick={() => setViewUsers(false)} sx={{margin: '1em'}}>Close Users</Button>, <Users />]) }
          </Container>
        ) 
      }

      { chooseCurrentUser && (
          <Container 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '70%',
              margin: 'auto',
              marginBottom: '2em',
              border: '.5em solid rgb(0, 209, 255)',
              borderRadius: '25px',
              padding: '3.5em'
            
            }}
          >
            <Typography variant='h5' sx={{ textAlign: 'center'}}>What do you want to do?</Typography>
          
            <ButtonGroup
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button onClick={() => setViewCurrentUser(true)} sx={{margin: '1em'}}>View My Info</Button>
              <Button sx={{margin: '1em'}}>Update My Info</Button>
              <Button onClick={() => setChooseCurrentUser(false)} sx={{margin: '1em'}}>Done</Button>
            </ButtonGroup>
            
            { viewCurrentUser && (
              [
              <Button onClick={() => setViewCurrentUser(false)} sx={{margin: '1em'}}>Close Info</Button>, 
              <UserCard id={user?.id} name={user?.name} email={user?.email} role={user?.role} avatar={user?.avatar} />
              ]
              ) }
          </Container>
        ) 
      }
    </>
  );
};

export default AdminPanel;