import React, {  PropTypes  } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import './Layout.css';


export default class Layout extends React.Component {

    constructor(props){
        super(props);
        this.state = { open: false};
        this.handleToggle = () => this.setState({ open: !this.state.open });
        this.handleClose = () => this.setState({ open: false });
    }

    render(){
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'row wrap',
                width: '100%'
            },
            nav: {
                flex: "0 0 300px",
                height: '100%'
            },
            paperRight: {
                flex: 4,
                height: '100%'
            }
        };

        const drawerMenu = [
            <Subheader key='title'>CUHK Transit</Subheader>
        ];
        return (
            <div>
                <AppBar
                    title="CUHK Transit"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <div className="body" style={styles.container}>
                    <div className='desktop' style={styles.nav}>
                        <Menu>
                            {drawerMenu}
                        </Menu>
                    </div>
                    <div style={styles.paperRight}>
                        {this.props.children}
                    </div>
                </div>
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    {drawerMenu}
                </Drawer>
            </div>
        );
    }
}