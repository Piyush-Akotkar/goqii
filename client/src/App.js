import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";
import Navigation from "./components/Navigation";
import UserView from "./components/UserView";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center">Goqii App</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/editUser/:id" element={<UpdateUser />} />
          <Route path="/viewUser/:id" element={<UserView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
