
import { SnackbarProvider } from 'notistack'
import './App.css'
import Routers from './routes/Routers'



function App() {
  

  return (
    <>
    <SnackbarProvider maxSnack={3}>
      <Routers/>
      </SnackbarProvider>
    </>
  )
}

export default App
