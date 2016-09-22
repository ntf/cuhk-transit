import React, {  PropTypes  } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Layout from '../Layout/Layout';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import WalkAsset from 'material-ui/svg-icons/maps/directions-walk';
import BusAsset from 'material-ui/svg-icons/maps/directions-bus';
import PlaceAsset from 'material-ui/svg-icons/maps/place';
import './App.css';
import { routes, stops, buildings, Building, BusStop} from '../../data';
const App = ({ location, onSelectFrom, onSelectTo}) => (
    <MuiThemeProvider>
        <Layout>
            <div className="App">
                <div className="App-intro" style={{ textAlign: 'left' }}>
                    <SelectField value={location.from} onChange={onSelectFrom} fullWidth={true}
                                 floatingLabelText='From building'>
                        {Object.keys(buildings).map(function (name){
                            return <MenuItem key={name} value={buildings[name]} primaryText={name}/>
                        }) }
                    </SelectField>
                    <SelectField value={location.to} onChange={onSelectTo} fullWidth={true}
                                 floatingLabelText='To building'>
                        {Object.keys(buildings).map(function (name){
                            return <MenuItem key={name} value={buildings[name]} primaryText={name}/>
                        }) }
                    </SelectField>
                    {location.routes.length == 0 && location.from != null && location.to != null
                        ? <p>{`Sorry, we could not calculate directions from "${location.from.name}" to "${location.to.name}"`}</p> : null}
                </div>
            </div>
            <List>
                {location.routes.length > 0 ? <Subheader>Directions</Subheader>: null}
                {location.routes.map(function (route, index){
                    return <div>
                        <ListItem key={index} leftIcon={route.type === 'transit' ? <BusAsset /> : <WalkAsset />}
                                  primaryText={route.name}
                                  secondaryText={route.type === 'transit' ? <span>{route.distance} stops</span> : null}
                                  initiallyOpen={false} primaryTogglesNestedList={true}
                                  nestedItems={route.detail.map(function(step,index){
                        return <ListItem key={index} primaryText={step.name} leftIcon={
                        step instanceof BusStop ? <PlaceAsset /> : <WalkAsset />
                        } style={ (index == 0 || index == route.detail.length - 1) ? {fontWeight:'bold'} : {}}/>;
                    })}/>
                        <Divider/>
                    </div>;
                }) }
            </List>
        </Layout>
    </MuiThemeProvider>
);

App.propTypes = {
    location: React.PropTypes.shape({
        from: PropTypes.object,
        to: PropTypes.object
    })
};

export default App;


