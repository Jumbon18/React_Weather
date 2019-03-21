import React from 'react';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
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
    <a href="dadasd">asdsdas</a>
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