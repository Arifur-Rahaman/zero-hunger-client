import MuiAppBar from '@mui/material/AppBar';
import { Button, Typography, Box, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link } from 'react-router-dom'
export default function AppBar() {
    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position="static" color='secondary'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flex: 1, fontWeight: '600' }}>
                        <Link style={{textDecoration: 'none'}} to={'/'}>
                            WASTE FOOD DONATION
                        </Link>
                    </Typography>
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