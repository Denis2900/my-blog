import Posts from './pages/posts';
import Error from './pages/error'
import CreatePost  from './pages/createPosts'
import SignIn from './pages/signIn'
import Home from './pages/home'
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
const App = ()=> {
  const RedirectRoute = ({children})=>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(user && user.id){
      return children
    }
    return <Navigate to="/error"></Navigate>
  }
  return(
    <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route path="/create-post" element={<RedirectRoute><CreatePost></CreatePost></RedirectRoute>}></Route>
        <Route path="/posts" element={<RedirectRoute><Posts></Posts></RedirectRoute>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
    </Routes>
  )
}
export default App;
