import { useEffect } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TableComponent from './Components/TableComponent'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from './Redux/productSlice';
import ProductDetails from './Components/ProductDetails';

function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch])
  
 const router = createBrowserRouter([
   {
     path: "/",
     element: <TableComponent />,
   },
   {
     path: "/productdetails/:id",
     element: <ProductDetails />,
   },
   
 ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
