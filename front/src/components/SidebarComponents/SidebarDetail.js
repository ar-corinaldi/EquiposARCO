import React from "react";
import "./SidebarDetail.css"
import { Link } from "react-router-dom";

function SidebarDetail(props) {
    const menu = props.menu;
    const url = props.baseUrl;
    console.log(props.menu);
    
    return(
        <ul className="components">
            {menu.map((item) =>{
                if(item.type == "Header"){
                    return Header(item);
                }
                else if (item.type == "Title"){
                    return Title(item);
                }
                else if (item.type == "Link"){
                    return Url(item, url);
                }
                else if (item.type == "Menu"){
                    return Menu(item);
                }
            })}

        </ul>
    )
}

//TODO: Estilizarlo más
function Header(params) {
    const header = params.name;
    return <div className="sidebar-header" ><h5>{header}</h5></div>;
    
}

function Title(params) {
    const title = params.name;
    return <li><p>{title}</p></li>;
    
}

function Url(item, url) {
return <li><Link to={url+item.ref}>{item.name}</Link></li>;

    
}
//TODO: Todo. Ojo que esto es menu dropdown. 
function Menu(params) {
    
}

export default SidebarDetail;