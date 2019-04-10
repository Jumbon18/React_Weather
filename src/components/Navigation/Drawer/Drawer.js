import React from 'react';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from "react-router-dom";
class Drawer extends React.Component{
    clickHandler = () =>{
      this.props.onClose();
    };
    render() {
        const cls = [
            'Drawer'
        ];
        if(!this.props.isOpen){
            cls.push('close');
        }
        return(
        <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
<li>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/favorites">Favorites</NavLink>
</li>
                </ul>
            </nav>
            {this.props.isOpen ? <Backdrop onClose={this.props.onClose}/>
            :
            null}
        </React.Fragment>
        );
    }
}

export default Drawer;