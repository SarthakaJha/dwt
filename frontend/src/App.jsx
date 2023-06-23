
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Dashboard from "./page/Dashboard"

function App() {


  return (
    <>
    <Header></Header>
    <Container className='my-2'>
    <Outlet/>
    </Container>
   
    </>
  )
}

export default App
