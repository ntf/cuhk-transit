import { connect } from 'react-redux';
import App from './../components/App/App';
import { selectFrom, selectTo } from '../reducers/location';

const mapStateToProps = (state) => {
    return {
        location: state.location
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectFrom: (event, index, value) => {
            dispatch(selectFrom(value));
        },
        onSelectTo: (event, index, value) => {
            dispatch(selectTo(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);