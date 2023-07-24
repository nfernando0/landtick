import { useContext, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import HeroComp from './components/HeroComp'
import NavbarComp from './components/NavbarComp'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import TiketSaya from './pages/TiketSaya'
import Payment from './pages/Payment'
import TransaksiList from './pages/TransaksiList'
import TiketSayaSuccess from './pages/TiketSaya'
import TiketSuccess from './pages/TiketSuccess'
import { PrivateRoute, PrivateRouteAdmin } from './components/PrivateRoute'
import AdminHome from './pages/AdminHome'
import { UserContext } from './Context/UserContext'
import AddTicket from './pages/AddTicket'
import { API, setAuthToken } from './config/API'
import FooterComp from './components/FooterComp'
import { useMutation } from 'react-query'
import AddStation from './pages/AddStation'




function App() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(null)
  const [state, dispatch] = useContext(UserContext)

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("login failed")
      dispatch({
        type: "LOGOUT",
      });
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (state.isLogin === false) {
      navigate("/")
    }
  }, [isLoading])

  return (
    <div>
      {isLoading ? null : (
        <>
          <NavbarComp />
          <Routes>
            <Route exact path="/" element={<HeroComp />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route exact path="/addTicket" element={<AddTicket />} />
              <Route exact path='/dashboard' element={<AdminHome />} />
              <Route exact path='/station' element={<AddStation />} />
              <Route exact path="/admin" element={<AdminHome />} />
              <Route exact path="/transaksi" element={<TransaksiList />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/tiket/:id" element={<TiketSaya />} />
              <Route exact path="/tiket" element={<TiketSaya />} />
              <Route exact path="/payment/:id" element={<Payment />} />
              <Route exact path="/tiketSuccess" element={<TiketSuccess />} />
            </Route>
          </Routes>
          <FooterComp />
        </>
      )}
    </div>
  )
}

export default App
