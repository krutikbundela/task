import { useEffect } from 'react'
import './App.css'
import TableComponent from './Components/TableComponent'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from './Redux/productSlice';

function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch])
  

  return (
    <>
      <TableComponent/>
    </>
  )
}

export default App
