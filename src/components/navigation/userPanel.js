import React, { Fragment } from 'react';
import "./sidebar.css"
const UserPanel = () => {
   const url = "https://i.stack.imgur.com/frlIf.png";
    return (
        <Fragment>
            <div className="divUserPanel">
                 <img className="mt-1 userImg" src={url} alt="#" />
                 <br/>
         <h3 className="text-center ml-3">Admin</h3>
            </div>
        </Fragment>
    );
};

export default UserPanel;