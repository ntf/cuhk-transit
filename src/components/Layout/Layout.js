import React, {PropTypes} from 'react';

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
            <Subheader key='title'>CUHK Transit</Subheader>,
            <MenuItem key='feedback' onClick={this.handleFeedbackClick} leftIcon={<FeedbackAsset />}>Feedback</MenuItem>,
            <MenuItem key='github' onClick={this.handleCodeClick} leftIcon={<CodeAsset />}>Find us on Github</MenuItem>
        ];
        return (
            <div>
                <AppBar title="CUHK Transit" onLeftIconButtonTouchTap={this.handleToggle} style={{position: 'fixed'}}/>
                <div className="body" style={styles.container}>
                    <div className='desktop' style={styles.nav}>
                        <Menu>{drawerMenu}</Menu>
                    </div>
                    <div style={styles.paperRight}>{this.props.children}</div>
                </div>
                <Drawer docked={false} width={300} open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                    {drawerMenu}
                </Drawer>
            </div>
        );
    }
}