// import { AuthProvider } from './contexts/AuthContext';
// import { RouteProvider } from './contexts/RouteContext';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MapPage from './pages/MapPage';
// import DashboardPage from './pages/DashboardPage';
// import AuthLoginPage from './pages/AuthLoginPage';
// import AuthRegisterPage from './pages/AuthRegisterPage';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <RouteProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Navigate to="/map" />} />
//             {/* <Route path="/map" element={<MapPage />} /> */}
//             <Route path="/dashboard" element={
//               <PrivateRoute>
//                 <DashboardPage />
//               </PrivateRoute>
//             } />
//             <Route path="/login" element={<AuthLoginPage />} />
//             <Route path="/register" element={<AuthRegisterPage />} />
//             <Route path="*" element={<Navigate to="/map" />} />
//           </Routes>
//         </Router>
//       </RouteProvider>
//     </AuthProvider>
//   );
// }


// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage';
import DashboardPage from './pages/DashboardPage';
import AuthLoginPage from './pages/AuthLoginPage';
import AuthRegisterPage from './pages/AuthRegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/map" />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/register" element={<AuthRegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
