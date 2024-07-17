import { useState } from 'react'
import Header from './Pages/Header';
import Sidebar from './Pages/Sidebar';
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import ListOrder from './Components/Orders/ListOrder';
import Setup from './Components/ProcessConfiguration/Setup';
import AssignmentComponent from './Components/Assignment/AssignmentComponent';
import Productionplan from './Components/ProductionPlan/ProductionPlan';
import MaterialStatus from './Components/Material/MaterialStatus';
import MaterialInventory from './Components/Material/MaterialInventory';
import Inventory from './Components/Inventory/Inventory';
import MaterialMovements from './Components/Material/MaterialMovements';
import ManageDepartments from './Components/ProcessConfiguration/ManageDepartments';
import ManageActivity from './Components/ProcessConfiguration/ManageActivity';
import UserManagement from './Components/ProcessConfiguration/UserManagement';
import ManageProducts from './Components/ProcessConfiguration/ManageProducts';
import TeamsManagement from './Components/ProcessConfiguration/TeamsManagement';
import ProductionLineManagement from './Components/ProcessConfiguration/ProductionLineManagement';
import DashboardPage from './Components/Dashboard/DashboardComponent'
import WorkstationStates from './Components/Workstation/WorkstationStates';
import ProcessViolation from './Components/ProcessViolation/ProcessViolation';
import Rejections from './Components/Material/Rejections';
import Issues from './Components/Material/Issues';
import Reports from './Components/Report/Reports';
import TeamRoster from './Components/Roaster/TeamRoster';
import ProcessExecution from './Components/ProcessViolation/ProcessExecution';
import ProductionPlan from './Components/Orders/ProductionPlan';
import ManageWorkstation from './Components/ProcessConfiguration/ManageWorkstation';

 function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path="/listOrder" element={<ListOrder/>}/>
    <Route path="/productionplan" element={<ProductionPlan/>}/>
    <Route path='/setup' element={<Setup />} />
    <Route path='/assignment' element={<AssignmentComponent />} />
    <Route path='/production-plan' element={<Productionplan />} />
    <Route path='/material-status' element={<MaterialStatus />} />
    <Route path='/material-inventory' element={<MaterialInventory />} />
    <Route path='/inventory' element={<Inventory />} />
    <Route path='/material-movements' element={<MaterialMovements />} />
    <Route path='/activity' element={<ManageActivity />} />
    <Route path='/user' element={<UserManagement />} />
    <Route path='/product' element={<ManageProducts />} />
    <Route path='/manage-team' element={<TeamsManagement />} />
    <Route path='/production-line' element={<ProductionLineManagement />} />
    <Route path='/dashboard-page' element={<DashboardPage />} />
    <Route path='/workstation' element={<WorkstationStates />} />
    <Route path='/process-violation' element={<ProcessViolation />} />
    <Route path='/process-execution' element={<ProcessExecution />} />
    <Route path='/rejection' element={<Rejections />} />
    <Route path='/issues' element={<Issues />} />
    <Route path='/reports' element={<Reports />} />
    <Route path='/roaster' element={<TeamRoster />} />
    <Route path='/manage-workstation' element={<ManageWorkstation />} />


    <Route path='/departments' element={<ManageDepartments />} />
     </Routes>
  </BrowserRouter>
  );
}


export default App