import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen';
import AvailableFoodScreen from './pages/AvailableFoodScreen';
import DonationFormScreen from './pages/DonationFormScreen';
import SigninScreen from './pages/SigninScreen';
import MainLayout from './layouts/MainLayout';
import RegisterScreen from './pages/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DonationListScreen from './pages/DonationListScreen';
import RequestScreen from './pages/RequestScreen';
import RequestForm from './pages/RequestForm';
import RequestListScreen from './pages/RequestListScreen';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/signin' element={<SigninScreen />} />
        <Route path='/signup' element={<RegisterScreen />} />

        {/* ***Private Route*** */}
        <Route path="/foods" element={<PrivateRoute />}>
          <Route path='/foods' element={<AvailableFoodScreen />} />
        </Route>
        <Route path="/donate" element={<PrivateRoute />}>
          <Route path='/donate' element={<DonationFormScreen />} />
        </Route>
        <Route path="/donations" element={<PrivateRoute />}>
          <Route path='/donations' element={<DonationListScreen />} />
        </Route>
        <Route path="/requests" element={<PrivateRoute />}>
          <Route path='/requests' element={<RequestListScreen />} />
        </Route>
        <Route path="/request/:foodId" element={<PrivateRoute />}>
          <Route path='/request/:foodId' element={<RequestScreen />} />
        </Route>
        <Route path="/foods/:foodId" element={<PrivateRoute />}>
          <Route path='/foods/:foodId' element={<RequestForm />} />
        </Route>

      </Routes>
      <ToastContainer/>
    </MainLayout>
  );
}

export default App;
