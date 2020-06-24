import React from "react";
import "./SidebarDetail.css"
import { Link } from "react-router-dom";

function SidebarDetail(props) {
    const menu = props.menu;
    const url = props.baseUrl;
    console.log(props.menu);
    
    return(
        <div>
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

        </div>
    )
}

function Header(params) {
    const header = params.name;
    return <h5>{header}</h5>;
    
}

function Title(params) {
    const title = params.name;
    return <p>{title}</p>;
    
}

function Url(item, url) {
return <Link to={url+item.ref}>{item.name}</Link>;

    
}

function Menu(params) {
    
}

export default SidebarDetail;