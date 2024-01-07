import * as React from 'react';
import {Routes, Route} from 'react-router-dom'
import Topbar from './components/Topbar';
import Dashboard from './pages/dashboard';
import Data from './pages/data'
import AHP from './pages/aplikasi/ahp';
import SAW from './pages/aplikasi/saw';
import Tutorial from './pages/tutorial';
import DataForm from './pages/data/form';
import SAWForm from './pages/aplikasi/saw/form';
import AHPForm from './pages/aplikasi/ahp/form';
import DataDetails from './pages/data/details';
import SAWDetails from './pages/aplikasi/saw/details';
import SAWCriteriasForm from './pages/aplikasi/saw/form/criterias';
import SAWCrispsForm from './pages/aplikasi/saw/form/crisps';
import AHPDetails from './pages/aplikasi/ahp/details';
import AHPCriteriasForm from './pages/aplikasi/ahp/form/criterias';
import AHPCrispsForm from './pages/aplikasi/ahp/form/crisps';
import AHPCriteriasImportanceForm from './pages/aplikasi/ahp/form/importance/criterias';
import AHPCrispsImportanceForm from './pages/aplikasi/ahp/form/importance/crisps';
import Login from './pages/login';
import Register from './pages/register';
import RequireAuth from './components/RequireAuth';
import EditData from './pages/data/form/edit';
import EditSAW from './pages/aplikasi/saw/form/edit';
import EditSAWCriterias from './pages/aplikasi/saw/form/criterias/edit';
import EditSAWCrisps from './pages/aplikasi/saw/form/crisps/edit';
import EditAHP from './pages/aplikasi/ahp/form/edit';
import EditAHPCriterias from './pages/aplikasi/ahp/form/criterias/edit';
import EditAHPCrisps from './pages/aplikasi/ahp/form/crisps/edit';
import EditAHPCriteriasImportance from './pages/aplikasi/ahp/form/importance/criterias/edit';
import EditAHPCrispsImportance from './pages/aplikasi/ahp/form/importance/crisps/edit';
import UserProfile from './pages/profile';
import CaraPenggunaanPage from './pages/tutorial/cara-penggunaan';
import HasilMetodePage from './pages/tutorial/hasil-metode';
import PerkenalanPage from './pages/tutorial/perkenalan';
import ChangePassword from './pages/profile/change-password';
import LandingPage from './pages/landing';
import ViewDataTableSAW from './pages/aplikasi/saw/view';
import ViewDataTableAHP from './pages/aplikasi/ahp/view';

const App = () => {
  return (
    <Routes>
      <Route path='' element={<LandingPage />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route element={<RequireAuth />}>
        <Route element={<Topbar />}>

          <Route path="dashboard" element={ <Dashboard />} />

          <Route path='user'>
            <Route path='' element={<UserProfile />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>

          <Route path="data">
            <Route path='' element={ <Data /> } />
            <Route path="form" element={ <DataForm /> }/>
            <Route path=':id'>
              <Route path='' element={ <DataDetails /> } />
              <Route path='edit' element={ <EditData /> }/>
            </Route>
          </Route>

          <Route path="saw">
            <Route path='' element={ <SAW /> } />
            <Route path="form" element={ <SAWForm /> }/>
            <Route path=':id'>
              <Route path='' element={ <SAWDetails /> } />
              <Route path='edit' element={ <EditSAW /> }/>
              <Route path='criterias'>
                <Route path='form' element={ <SAWCriteriasForm /> }/>
                <Route path='edit' element={ <EditSAWCriterias /> }/>
                <Route path=':c_id/crisps'>
                  <Route path='form' element={ <SAWCrispsForm /> }/>
                  <Route path='edit' element={ <EditSAWCrisps /> }/>
                </Route>
              </Route>
              <Route path='file/:file_id/view' element={ <ViewDataTableSAW />}/>
            </Route>
            
          </Route>
          
          <Route path="ahp">
            <Route path="" element={ <AHP /> }/>
            <Route path="form" element={ <AHPForm /> }/>
            <Route path=':id'>
              <Route path='' element={ <AHPDetails /> }/>
              <Route path='edit' element={ <EditAHP /> }/>
              <Route path='criterias'>
                <Route path='form' element={ <AHPCriteriasForm /> }/>
                <Route path='edit' element={ <EditAHPCriterias /> }/>
                <Route path='importance'>
                  <Route path='form' element={ <AHPCriteriasImportanceForm /> }/>
                  <Route path='edit' element={ <EditAHPCriteriasImportance /> }/>
                </Route>
                <Route path=':c_id/crisps'>
                  <Route path='form' element={ <AHPCrispsForm /> }/>
                  <Route path='edit' element={ <EditAHPCrisps /> }/>
                  <Route path='importance'>
                    <Route path='form' element={ <AHPCrispsImportanceForm /> }/>
                    <Route path='edit' element={ <EditAHPCrispsImportance /> }/>
                  </Route>
                </Route>
              </Route>
              <Route path='file/:file_id/view' element={ <ViewDataTableAHP />}/>
            </Route>
          </Route>

          <Route path="tutorial" element={<Tutorial />}>
            <Route path='' element={<PerkenalanPage />}/>
            <Route path='cara-penggunaan' element={<CaraPenggunaanPage />} />
            <Route path='hasil-metode' element={<HasilMetodePage />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}
export default App;
