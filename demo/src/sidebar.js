function Sidebar() {
  var dom = document.getElementById("root");
  var sidebar = document.createElement("p");
  sidebar.innerText = "sidebar";
  dom.append(sidebar);
}

export default Sidebar;
