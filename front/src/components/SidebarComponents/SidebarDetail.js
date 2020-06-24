import React from "react";
import "./SidebarDetail.css"

function SidebarDetail(props) {
    const menu = props.menu;
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
                    return Link(item);
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
    return <h5>header</h5>;
    
}

function Title(params) {
    const title = params.name;
    return <p>title</p>;
    
}

function Link(params) {
    
}

function Menu(params) {
    
}

export default SidebarDetail;