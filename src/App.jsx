import './App.css'
import Dashboard from "./feature/Dashboard/DashBoard.jsx";
import cubeApi from "../src/feature/Dashboard/cubeClient.js";
import {CubeProvider} from "@cubejs-client/react";
import SideBar from "./feature/Components/SideBar.jsx";

function App() {

    return (
        <CubeProvider cubeApi={cubeApi}>
            <div style={{display: "flex", width: "100%", height: "100%", overflow: "auto"}}>
                <SideBar/>
                <Dashboard/>
            </div>
        </CubeProvider>
    )
}

export default App
