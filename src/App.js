
import Navbar from "./component/Navbar";
import Page404 from "./Page404"
import {
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";

import Create from "./page/products/Create";
import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { login, logout, setUser } from "./redux/reducer/auth";
import ProtectedRoute from "./component/ProtectedRoute";
import Show from "./page/products/Show";






function App() {
  const [user_fetch, setUserFetch] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {

    if (localStorage.getItem("access_token")) {

      axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get-user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        
      }).then(res => {
        dispatch(login())
        console.log(res.data);
        
        dispatch(setUser(res.data)) 
         setUserFetch(true)
      }).catch(resp => {
        dispatch(logout())
        setUserFetch(true)
      })
    } else {
      setUserFetch(true)
    }
  },[])
  if (!user_fetch) {
    return (

      <>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </>
    )

  }
  return (
    <>
      <div className="container">

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products">  
          <Route path = "" element={<Home />}/>
          <Route path = ":id" element={<Show />}/>
                    {/*slug concept*/}
          </Route>
          

          <Route path="/seller" element={<ProtectedRoute role = "seller"  /> }>

            <Route path="products/create" element={<Create />} />
          </Route>

          <Route path="*" element={< Page404 />}>
          </Route>
        </Routes>
        {/*<Route path="/orders" element={<order />} />
    <Route index element={<home/>} />
  <Route path="/checkout" element={<checkout />} />*/}


      </div>
    </>
  );
}

export default App;
