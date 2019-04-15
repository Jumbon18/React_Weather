import React,{Component} from 'react';
import './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import facebook from '../../images/facebook.png';
import github from '../../images/github.png';
import skype from '../../images/skype.png';
import instagram from '../../images/instagram.png';
import {connect} from "react-redux";
class Layout extends Component{
    state = {
        menu: false
    };
    menuCloserHandler = () =>{
      this.setState({
          menu:!this.state.menu
      })
    };

 render() {
     return(
         <div className="Layout">
             <Drawer
                 onClose={this.menuCloserHandler}
                 isOpen={this.state.menu}
                 isAuthenticated = {this.props.isAuthenticated}

             />
             <MenuToggle
                 isOpen={this.state.menu}
                 onToggle={this.menuCloserHandler}
             />
<main>
    {this.props.children}
</main>
             {<div className="footer" id="animate-area">
            <div className="wrapper">
                <div>
                <h2>Awesome Weather Cast</h2>
                <p>Created by Alex Pyvovarov and Irina Telesheva</p>
                </div>
                <div className="footer-text">
                <p>Get our contacts:</p>
                <img src={facebook} className="footer-img"/>
                <img src={instagram} className="footer-img"/>
                <img src={skype} className="footer-img"/>
                <img src={github} className="footer-img"/>
            </div>
            </div>
    </div>}
             </div>
     );
 }
}
function mapStateToProps(state) {
    return{
        isAuthenticated:!!state.auth.token
    }
}
export default connect(mapStateToProps)(Layout);