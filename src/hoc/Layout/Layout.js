import React,{Component} from 'react';
import './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import facebook from '../../images/facebook.png';
import github from '../../images/github.png';
import skype from '../../images/skype.png';
import instagram from '../../images/instagram.png';
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
                <img src={facebook} className="footer-img" alt="facebook"/>
                <img src={instagram} className="footer-img" alt="instagram"/>
                <img src={skype} className="footer-img" alt="skype"/>
                <img src={github} className="footer-img" alt="github"/>
            </div>
            </div>
    </div>}
             </div>
     );
 }
}
export default Layout;