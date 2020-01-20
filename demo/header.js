function Header() {
  var dom = document.getElementById("root");
  var header = document.createElement("p");
  header.innerText = "header";
  dom.append(header);
}

export default Header;
