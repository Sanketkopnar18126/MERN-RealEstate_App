import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { About } from "./Pages/About/About";
import { Header } from "./Components/Header/Header";
import {Provider} from 'react-redux'
import { persistStor, store } from "./Store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { UpdateProfile } from "./Pages/UpdateProfile/UpdateProfile.jsx";
import { CreateListing } from "./Pages/CreateListing/CreateListing.jsx";
import { UpdateListing } from "./Pages/UpdateListing/UpdateListing.jsx";
import { ListingPage } from "./Pages/ListingPage/ListingPage.jsx";
function App() {
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStor} >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/updateprofile" element={<UpdateProfile/>}/>
          <Route path="/listing/create" element={<CreateListing/>}/>
          <Route path="/update-listing/:id" element={<UpdateListing/>}/>
          <Route path="/listing-page/:id" element={<ListingPage/>}/>
        </Routes>
      </BrowserRouter>
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
