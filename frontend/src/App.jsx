import AuthPage from "./pages/authPage"
import { Route,Routes } from "react-router-dom"
import Home from "./pages/HomePage"
import ListingDetails from "./pages/listingDetails"
import MyListings from "./pages/mylistings"
import CreateListing from "./pages/createListing"
import UpdateListing from "./pages/updatethelist"
import Wishlist from "./pages/wishlist"
import ProtectedRoute from "./components/protectedRoutes"
import Profile from "./pages/profile"
export const App=()=>{
return(
<>
  <Routes>
    <Route path="/" element={<AuthPage/>}/>
    <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
    <Route path="/listing-view/:id"  element={<ProtectedRoute><ListingDetails/></ProtectedRoute>}    />
    <Route path="/my-listing" element={<ProtectedRoute><MyListings/></ProtectedRoute>}  />
    <Route path="/add-item" element={<ProtectedRoute><CreateListing/></ProtectedRoute>}  />
    <Route path="/edit-item/:id"  element={<ProtectedRoute><UpdateListing/></ProtectedRoute>}   />
    <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
    <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}    />
  </Routes>
</>
)
}