import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WhatsNew from './components/Pages/Menu/WhatsNew';
import Menu from './components/Pages/Menu/Menu';
import SideOrders from './components/Pages/Menu/SideOrders';
import Beverages from './components/Pages/Menu/Beverages';
import DeliveryMap from './components/Pages/DeliveryMap/DeliveryMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BYOPizza from './components/Pages/BYOPizza/BYOPizza';
import Classics from './components/Pages/Menu/Classics'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import ShoppingCart from './components/Cart/ShoppingCart';
import ComboCustomization from './components/Pages/BYOPizza/Combos';
import Specialties from './components/Pages/Menu/Specialties';
import SuperSpecialties from './components/Pages/Menu/SuperSpecialties';
import Subs from './components/Pages/Menu/Subs';
import Salads from './components/Pages/Menu/Salads';
import RegistrationForm from './components/Pages/Account/RegistrationForm';
import LoginPage from './components/Pages/Account/LoginPage';
import DashBoard from './components/Pages/Account/DashBoard';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<WhatsNew />} />
          <Route path="/WhatsNew" element={<WhatsNew />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/BYOPizza" element={<BYOPizza />} />
          <Route path="/ClassicPizzas" element={<Classics />} />
          <Route path="/Specialties" element={<Specialties />} />
          <Route path="/SuperSpecialties" element={<SuperSpecialties />} />
          <Route path="/Subs" element={<Subs />} />
          <Route path="/Salads" element={<Salads />} />
          <Route path="/Sides" element={<SideOrders />} />
          <Route path="/Beverages" element={<Beverages />} />
          <Route path="/DeliveryMap" element={<DeliveryMap />} />
          <Route path="/checkout" element={<ShoppingCart />} />
          <Route path="/combo/:id" element={<ComboCustomization />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Dashboard" element={<DashBoard />} />
          <Route path="/Registration" element={<RegistrationForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;