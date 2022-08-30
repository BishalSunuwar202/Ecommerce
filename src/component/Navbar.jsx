import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
    let activeStyle = {
        fontSize : "1.5em",
        textDecoration: "none"         
        

    }

return (
    <nav class="navbar navbar-expand-lg bg-light">
    {/*div class="container-fluid">
    <a class="navbar-brand" href="# ">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>*/}
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
    {/*<a class="nav-link active" aria-current="page" href="# ">Home</a>
    <Link to = "product" className="nav-link"> product</Link>*/}
    <NavLink
            to="/home"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Home
          </NavLink>
    </li>

    <li class="nav-item">
    <NavLink
        to="/orders"
        style={({ isActive }) =>
        isActive ? activeStyle : undefined
        }
  >
    Order
    </NavLink>
    </li>
    <li>
    <NavLink
    to="/checkout"
    style={({ isActive }) =>
    isActive ? activeStyle : undefined
}
>
Checkout
</NavLink>
</li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="# " role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown
        </a>
        <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="# ">Action</a></li>
        <li><a class="dropdown-item" href="# ">Another action</a></li>
        {/*<li><hr class="dropdown-divider" /> </li>*/}
        <li><a class="dropdown-item" href="# ">Something else here</a></li>
        </ul>
        </li>
        <li class="nav-item">
          <Link to class="nav-link disabled">Disabled</Link>
        </li>
      </ul>
      <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
    
    
    </nav>
    )
};

