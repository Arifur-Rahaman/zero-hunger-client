import MuiAppBar from '@mui/material/AppBar';
import { Button, Typography, Box, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';
import { signout } from '../features/auth/authSlice';
import { useLocation } from 'react-router-dom';


export default function AppBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const location = useLocation()
    const handleSignin = () => {
        navigate('/signin')
    }
    console.log(location)
    const userItems = [
        {
            item: 'Profile',
            onclick: () => navigate('/profile')
        },
        {
            item: 'Donations',
            onclick: () => navigate('/donations')

        },
        {
            item: 'Requests',
            onclick: () => navigate('/requests')

        },
        {
            item: 'Sign out',
            onclick: () => {
                dispatch(signout())
            }
        }
    ]
    return (
        <Box sx={{ mb: `${location.pathname === '/' ? null : '32px'}` }}>
            <MuiAppBar position="fixed" color='secondary'>
                <Toolbar>
                    <IconButton
                        size="32"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{display: {sm:'none', margin:'0 8px 0 0', padding:'0'}}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={()=>navigate('/')}
                        sx={{
                            flex: 1,
                            fontWeight: '600',
                            display:{xs:'none',sm:'block'}
                        }}
                    >
                        FOOD DONATION
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={()=>navigate('/')}
                        sx={{
                            flex: 1,
                            fontWeight: '600',
                            display:{sm:'none'}
                        }}
                    >
                        FD
                    </Typography>

                    <Box component='div' sx={{ ml: 'auto', display:{xs:'none', sm:'block'}}}>
                        {
                            user
                                ? (
                                    <Menu name={user?.name} menuItems={userItems} />
                                ) : (
                                    <Button onClick={handleSignin} sx={{ color: 'black' }}>Sign In</Button>
                                )
                        }
                    </Box>

                    <Button
                        color="primary"
                        variant='contained'
                        onClick={() => navigate('/foods')}
                    >
                        Find Food
                    </Button>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}