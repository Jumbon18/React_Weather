import React from 'react';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from "react-router-dom";
class Drawer extends React.Component{
    clickHandler = () =>{
      this.props.onClose();
    };
    renderLink = (links) => {
        return links.map((item,index)=>(
            <li
            key={index}
            >
                <NavLink to={item.url}
                         activeClassName={'active'} onClick={this.clickHandler}
                >{item.text}</NavLink>
            </li>
        )


)
};
    render() {
        const cls = [
            'Drawer'
        ];
        const links = [
            {url:'/',text:'Main page',exact:true},
        ];
        if (this.props.isAuthenticated) {
            links.push({url: '/favorites', text: 'My favorites', exact: false});
            links.push({url: '/logout', text: 'Log out', exact: false}
            )

        } else {
            links.push({url: '/auth', text: 'Login', exact: false},
            )
        }
        if(!this.props.isOpen){
            cls.push('close');
        }
        return(
        <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
{this.renderLink(links)}
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