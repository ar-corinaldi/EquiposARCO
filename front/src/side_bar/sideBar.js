import React from 'react';
import Button from 'react-bootstrap/Button';
import './sideBar.css';


function SideBar(params) {
    function changeSideBarVisibility(params) {
        console.log('entró');

        let side_bar = document.getElementById('sidebar');
        let bar_button = document.getElementById('side-bar-button');
        if ((side_bar != null) && (bar_button != null)) {
            side_bar.classList.remove('hidden');
            side_bar.classList.add('visible');
            bar_button.classList.remove('visible');
            bar_button.classList.add('hidden');
        }
    }

    return (
        <div className='wraper'>
            <nav>
                <Button id='side-bar-button' variant="primary" className='visible' onClick={changeSideBarVisibility}>
                    boton
            </Button>
            </nav>
            <nav id="sidebar" className='hidden'>
                <div class="sidebar-header">
                    <h3>Bootstrap Sidebar</h3>
                </div>

                <ul class="list-unstyled components">
                    <p>Dummy Heading</p>
                    <li class="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                        <ul class="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <a href="#">Home 1</a>
                            </li>
                            <li>
                                <a href="#">Home 2</a>
                            </li>
                            <li>
                                <a href="#">Home 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <a href="#">Page 1</a>
                            </li>
                            <li>
                                <a href="#">Page 2</a>
                            </li>
                            <li>
                                <a href="#">Page 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Portfolio</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>

            </nav>
        </div>
    );

}

export default SideBar;