import React from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import CodeAsset from 'material-ui/svg-icons/action/code';
import FeedbackAsset from 'material-ui/svg-icons/action/feedback';
import ga from 'react-ga';
import './Layout.css';


export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleToggle = () => this.setState({open: !this.state.open});
        this.handleClose = () => this.setState({open: false});
        this.handleCodeClick = (function () {
            ga.outboundLink({label: 'code'});
            this.setState({open: false});
            window.location.href = 'https://github.com/ntf/cuhk-transit';
        }).bind(this);

        this.handleFeedbackClick = (function () {
            ga.outboundLink({label: 'feedback'});
            this.setState({open: false});
            window.location.href = 'https://www.facebook.com/CUHKSecrets/posts/970323663071749';
        }).bind(this);

    }

    render() {
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'row wrap',
                width: '100%',
                paddingTop: 64
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
            <MenuItem key='feedback' onClick={this.handleFeedbackClick} leftIcon={<FeedbackAsset />}>Feedback</MenuItem>,
            <MenuItem key='github' onClick={this.handleCodeClick} leftIcon={<CodeAsset />}>Find us on Github</MenuItem>
        ];
        return (
            <div>
                <AppBar title="CUHK Transit" onLeftIconButtonTouchTap={this.handleToggle} style={{position: 'fixed'}}/>
                <div className="body" style={styles.container}>
                    <div className='desktop' style={styles.nav}>
                        <Menu>
                            <Subheader>CUHK Transit</Subheader>
                            {drawerMenu}
                        </Menu>
                    </div>
                    <div style={styles.paperRight}>{this.props.children}</div>
                </div>
                <Drawer docked={false} width={300} open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                    <div style={{position:'relative', height:128, marginBottom:8,backgroundColor:'#673ab7',color:'#ffffff'}}>
                        <h1 key='title' style={{position:'absolute',bottom:0,margin:16,fontSize:18,fontWeight:'normal'}}>CUHK Transit</h1>
                    </div>
                    {drawerMenu}
                </Drawer>
            </div>
        );
    }
}