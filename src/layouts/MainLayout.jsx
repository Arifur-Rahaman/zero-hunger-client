import AppBar from '../components/AppBar';

const MainLayout = ({children}) => {
    return (
        <>
            <AppBar/>
            {children}
        </>
    );
};

export default MainLayout;