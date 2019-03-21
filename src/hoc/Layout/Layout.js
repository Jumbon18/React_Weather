import React,{Component} from 'react';
import './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';


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
             <footer className="Footer">
        <ul>
            <li>
                <h1>AWC</h1>
            </li>
            <li>
                <h1>Created by Alex Pyvovarov and Irina Telesheva</h1>
            </li>
        </ul>
             </footer>
         </div>
     );
 }
}
export default Layout;