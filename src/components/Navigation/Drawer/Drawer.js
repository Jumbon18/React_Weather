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
            {url:'/',text:'Главная страница',exact:true},
        ];
        if (this.props.isAuthenticated) {
            links.push({url: '/favorites', text: ' Избранные', exact: false});
            links.push({url: '/logout', text: 'Выйти', exact: false}
            )

        } else {
            links.push({url: '/auth', text: 'Авторизация', exact: false},
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