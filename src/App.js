import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from './pages/HomeScreen';
import AvailableFoodScreen from './pages/AvailableFoodScreen';
import FoodDonationScreen from './pages/FoodDonationScreen';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen/>}/>
      <Route path='/foods' element={<AvailableFoodScreen/>}/>
      <Route path='/donate' element = {<FoodDonationScreen/>}/>
    </Routes>
  );
}

export default App;
