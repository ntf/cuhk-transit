import {connect} from 'react-redux';
import App from './../components/App/App';
import {selectFrom, selectTo, getDirections, decodeName, encodeName} from '../reducers/location';
import {push} from 'react-router-redux';
import {BASE_PATH} from '../constants';

const mapStateToProps = (state, ownProps) => {
    return {
        location: state.location,
        from: decodeName(ownProps.params.from),
        to: decodeName(ownProps.params.to),
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectFrom: (event, index, value) => {
            dispatch(push(`${BASE_PATH}/dir/${encodeName(value)}/${ownProps.params.to ? ownProps.params.to : ''}/`));
            dispatch(selectFrom(value));
        },
        onSelectTo: (event, index, value) => {
            dispatch(push(`${BASE_PATH}/dir/${ownProps.params.from ? ownProps.params.from : ''}/${encodeName(value)}/`));
            dispatch(selectTo(value));
        },
        getDirections: (from, to) => {
            dispatch(getDirections(from, to));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);