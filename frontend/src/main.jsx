import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './Pages/HomeScreen';
import LoginScreen from './Pages/LoginScreen.jsx';
import RegisterScreen from './Pages/RegisterScreen.jsx';
import ProfileScreen from './Pages/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProductForm from './components/productForm.jsx';


const Page1 = () => {
  return (
    <div>Page1</div>
  )
}
const Page2 = () => {
  return (
    <div>Page1</div>
  )
}
const Page3 = () => {
  return (
    <div>Page1</div>
  )
}


const router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<Page1/>}>

</Route>))

// const router = createBrowserRouter(
//   createRoutesFromElements(<Route path="/" element={<App/>}>
//      <Route path='/login' element={<LoginScreen />} />
//      {/* <Route index={true} path='/' element={<HomeScreen/>} />
//      <Route path='/register' element={<RegisterScreen />} /> */}
//   </Route>)
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
