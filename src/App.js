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

const App = () => {
  return (
    <Routes> 
      <Route path="/">
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route element={<Topbar />}>
            <Route path="" element={ <Dashboard />} />
            <Route path="data" element={ <Data /> }/>
            <Route path="ahp" element={ <AHP /> }/>
            <Route path="saw" element={ <SAW /> }/>
            <Route path="tutorial" element={ <Tutorial /> }/>
            <Route path="data/form" element={ <DataForm /> }/>
            <Route path="saw/form" element={ <SAWForm /> }/>
            <Route path="ahp/form" element={ <AHPForm /> }/>
            <Route path='data/:id' element={ <DataDetails /> }/>
            <Route path='data/:id/edit' element={ <EditData /> }/>
            <Route path='saw/:id' element={ <SAWDetails /> }/>
            <Route path='saw/:id/edit' element={ <EditSAW /> }/>
            <Route path='saw/:id/criterias/form' element={ <SAWCriteriasForm /> }/>
            <Route path='saw/:id/criterias/edit' element={ <EditSAWCriterias /> }/>
            <Route path='saw/:id/criterias/:c_id/crisps/form' element={ <SAWCrispsForm /> }/>
            <Route path='saw/:id/criterias/:c_id/crisps/edit' element={ <EditSAWCrisps /> }/>
            <Route path='ahp/:id' element={ <AHPDetails /> }/>
            <Route path='ahp/:id/edit' element={ <EditAHP /> }/>
            <Route path='ahp/:id/criterias/form' element={ <AHPCriteriasForm /> }/>
            <Route path='ahp/:id/criterias/edit' element={ <EditAHPCriterias /> }/>
            <Route path='ahp/:id/criterias/:c_id/crisps/form' element={ <AHPCrispsForm /> }/>
            <Route path='ahp/:id/criterias/:c_id/crisps/edit' element={ <EditAHPCrisps /> }/>
            <Route path='ahp/:id/criterias/importance/form' element={ <AHPCriteriasImportanceForm /> }/>
            <Route path='ahp/:id/criterias/importance/edit' element={ <EditAHPCriteriasImportance /> }/>
            <Route path='ahp/:id/criterias/:c_id/crisps/importance/form' element={ <AHPCrispsImportanceForm /> }/>
            <Route path='ahp/:id/criterias/:c_id/crisps/importance/edit' element={ <EditAHPCrispsImportance /> }/>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
