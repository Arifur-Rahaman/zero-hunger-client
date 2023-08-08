import { Box, Toolbar } from '@mui/material';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';

const MainLayout = ({children}) => {
    return (
        <Box>
            <AppBar/>
            <Toolbar/>
            {children}
            {/* <Footer/> */}
        </Box>
    );
};

export default MainLayout;