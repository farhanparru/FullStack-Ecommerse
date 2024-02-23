// Sidebar.js


import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";


const SideBar = () => {
  

  
  return (
    <div
    style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
    <CDBSidebar textColor="	#FFFFFF" backgroundColor="#000000">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <NavLink
          to="/adminpage"
          className="text-decoration-none"
          style={{ color: "inherit" }}>
          <h3>Admin</h3>
        </NavLink>
      </CDBSidebarHeader>
      <CDBSidebarContent textColor="#FFFFFF" className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink to="/addminhome" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="th-large">
              Admin Home
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/user" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/Order" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="store">Orders</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/ProductList" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="list">Product List</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/Addproduct" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="plus">Add Product</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>
      <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
    </CDBSidebar>
  </div>
);
};

export default SideBar;
