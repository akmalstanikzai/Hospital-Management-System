import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Articles from './pages/Articles'
import Doctor from './pages/Doctors'
import Appointments from './pages/AppointmentBooking'
import Requests from './pages/Requests'
import Meetings from './pages/Meetings'
import { ArticlesContextProvider } from './context/ArticlesContext';
import { DoctorsContextProvider } from './context/DoctorsContext'
import { AppointmentsContextProvider } from './context/AppointmentContext'


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            
          </Routes>
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route        
              path="/articles" 
              element={
                user ?
                  <ArticlesContextProvider>
                    <Articles />
                  </ArticlesContextProvider>
                : <Navigate to="/login" />
              } 
            />
            <Route
              path="/doctor" 
              element={user ?
                <DoctorsContextProvider>
                  <Doctor />
                </DoctorsContextProvider>
                : <Navigate to="/login" />
              }
            />
            <Route
              path="/appointmentbooking"
              element = {user ?
                <AppointmentsContextProvider>
                  <Appointments />
                </AppointmentsContextProvider> 
                : <Navigate to="/login" />
              }
            />
            <Route
              path="/requests"
              element = {user ?
                <AppointmentsContextProvider>
                  <Requests />
                </AppointmentsContextProvider> 
                : <Navigate to="/login" />
              }
            />
            <Route
              path="/meetings"
              element = {user ?
                <AppointmentsContextProvider>
                  <Meetings />
                </AppointmentsContextProvider> 
                : <Navigate to="/login" />
              }
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />}  
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;