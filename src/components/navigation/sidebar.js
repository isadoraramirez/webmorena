  
import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu';
import UserPanel from './userPanel';
import {Link} from 'react-router-dom';
import "./sidebar.css"

class sidebar extends Component {

  render(){

  
  return (
   
    <Menu   isOpen={ true }  disableCloseOnEsc noOverlay >
      
       
       <div  className="topSideBar">
       <hr className="solid"/>
         <UserPanel/>
         <hr className="solid"/>
      </div>

      <br/>

      <Link className="menu-item" to="/">
      <i
          class="fa fa-home fa-lg text-white"
          aria-hidden="true"
        />
        &nbsp;
        Inicio
      </Link>

      <Link className="menu-item" to="/notificaciones">
        <i
          class="fa fa-plus fa-lg text-white"
          aria-hidden="true"
        />
         &nbsp;
        Notificaciones
      </Link>

    </Menu>
  );
 }
}


export default sidebar;