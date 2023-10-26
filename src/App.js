import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './features/Auth/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUpPage from './features/Auth/Signup';
import HomePage from './features/Home';
import ResetPasswordPage from './features/Auth/ResetPassword';
import ChangeInforPage from './features/Auth/Update/Information';
import ChangePasswordPage from './features/Auth/Update/Password';
import { ToastContainer, toast } from "react-toastify";
import ProductDetailPage from './features/ProductDetail';
import CartPage from './features/Cart';
import OrderHistory from './features/OrderHistory';
import OrderPage from './features/Checkout';
import ManageProduct from './features/Manage/Product';
import ManageOrder from './features/Manage/Order';
import ManageStatistic from './features/Manage/Statistic';
import ManageUser from './features/Manage/User';
import ManageDiscount from './features/Manage/Discount';
import DiscountAddForm from './features/Manage/Discount/Form/Add';
import DiscountUpdateForm from './features/Manage/Discount/Form/Update';
import ProductAddForm from './features/Manage/Product/Add';
import ImportPage from './features/ImportItem';
import ProductUpdateForm from './features/Manage/Product/Update';
import ManageOrderDetail from './features/Manage/Order/Detail';
import UserOrderDetail from './features/OrderHistory/Detail';
import Contact from './features/Contact';
import Products from './features/Products';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' Component={HomePage} />

        <Route path='/detail_product/:id' Component={ProductDetailPage} />
        <Route path='/cart/:userId' Component={CartPage} />
        <Route path='/order' Component={OrderPage} />
        <Route path='/order/user' Component={OrderHistory} />
        <Route path='/contact' Component={Contact} />
        <Route path='/products' Component={Products} />
        <Route path='/order/user/:orderId' Component={UserOrderDetail} />

        <Route path='/manage/product' Component={ManageProduct} />
        <Route path='/manage/product/addProduct' Component={ProductAddForm} />
        <Route path='/manage/product/import' Component={ImportPage} />
        <Route path='/manage/product/:id' Component={ProductUpdateForm} />
        <Route path='/manage/order' Component={ManageOrder} />
        <Route path='/manage/order/:id' Component={ManageOrderDetail} />
        <Route path='/manage/statistic' Component={ManageStatistic} />
        <Route path='/manage/user' Component={ManageUser} />
        <Route path='/manage/discount' Component={ManageDiscount} />
        <Route path='/manage/discount/addDiscount' Component={DiscountAddForm} />
        <Route path='/manage/discount/:id' Component={DiscountUpdateForm} />

        <Route path='/login' Component={LoginPage} />
        <Route path='/signup' Component={SignUpPage} />
        <Route path='/update/infor' Component={ChangeInforPage} />
        <Route path='/update/password' Component={ChangePasswordPage} />
        <Route path='/resetPassword/reset/:resetToken' Component={ResetPasswordPage} />
        <Route path='/resetPassword/request' Component={ResetPasswordPage} />
      </Routes>
      <Footer></Footer>
      <ToastContainer />

    </div >
  );
}

export default App;
