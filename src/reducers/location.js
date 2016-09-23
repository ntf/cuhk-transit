import {routes, buildings, Building, BusStop} from "../data";
import {LOCATION_CHANGE} from 'react-router-redux'
import ga from 'react-ga';
import {BASE_PATH} from '../constants';

export const GET_DIRECTIONS = 'GET_DIRECTIONS';
export const SELECT_FROM = 'SELECT_FROM';
export const SELECT_TO = 'SELECT_TO';

export function selectFrom(value) {
    return {
        type: SELECT_FROM,
        payload: value
    }
}

export function selectTo(value) {
    return {
        type: SELECT_TO,
        payload: value
    }
}

export function getDirections(from, to) {
    return {
        type: GET_DIRECTIONS,
        from: from,
        to: to
    }
}
export const encodeName = function (name: string) {
    return name ? encodeURIComponent(name).replace(/%20/g, '+') : '';
};

export const decodeName = function (name: string) {
    return name ? decodeURIComponent(name.replace(/\+/g, '%20')) : '';
};
/**
 * @param from {Building}
 * @param to {Building}
 */
function search(from, to) {
    if (!(from instanceof Building) || !(to instanceof Building) || from === to) {
        return [];
    }
    let routes = [];
    ga.pageview(`${BASE_PATH}/dir/${encodeName(from.name)}/${encodeName(to.name)}/`);
    //console.log(`${BASE_PATH}/dir/${encodeName(from.name)}/${encodeName(to.name)}/`);
    let from_ = [];
    from_.push.apply(from_, from.nearest);
    from.nearest.forEach(function (stop: BusStop) {
        from_.push.apply(from_, stop.nearest);
    });

    let to_ = [];
    to_.push.apply(to_, to.nearest);
    to.nearest.forEach(function (stop: BusStop) {
        to_.push.apply(to_, stop.nearest);
    });

    let searched = {};
    for (let i = 0; i < from_.length; i++) {
        for (let j = 0; j < to_.length; j++) {
            if (from_[i] === to_[j]) {
                return [getWalkingRoute(from, to)];
            }

            if (searched[from_[i].name + "|" + to_[j].name] !== undefined) {
                continue;
            }

            searched[from_[i].name + "|" + to_[j].name] = true;
            routes.push.apply(routes, searchRoute(
                from, to, from_[i], to_[j]
            ));
        }
    }

    if (routes.length === 0 && from != to) {
        return [getWalkingRoute(from, to)];
    }

    let seen = {};
    return routes.sort(function (a, b) {
        return a.distance - b.distance;
    }).filter(function (route) {
        if (!seen.hasOwnProperty(route.name)) {
            seen[route.name] = true;
            return true;
        }
        return false;
    });
}

function getWalkingRoute(from, to) {
    return {
        type: 'walking',
        name: `Walking`,
        distance: 0,
        detail: [from, to]
    };
}

function searchRoute(from, to, stop1, stop2) {
    let result = [];

    for (var bus in stop1.schedules) {
        if (stop1.schedules.hasOwnProperty(bus) && stop2.schedules.hasOwnProperty(bus)) {
            let schedule1 = Array.isArray(stop1.schedules[bus]) ? stop1.schedules[bus] : [stop1.schedules[bus]];
            let schedule2 = Array.isArray(stop2.schedules[bus]) ? stop2.schedules[bus] : [stop2.schedules[bus]];
            for (var i in schedule1) {
                for (var j in schedule2) {
                    if (schedule1[i] < schedule2[j]) {
                        let steps = [];
                        if (from.name !== stop1.name) {
                            steps.push(from);
                        }
                        steps = routes[bus].slice(schedule1[i] - 1, schedule2[j]);
                        if (to.name !== stop2.name) {
                            steps.push(to);
                        }
                        result.push({
                            type: 'transit',
                            name: `School Bus ${bus}`,
                            distance: schedule2[j] - schedule1[i],
                            detail: steps
                        });
                    }
                }
            }
        }
    }
    return result;
}

export default function reducer(state = {from: null, to: null, routes: []}, action) {
    let from, to;
    switch (action.type) {
        case GET_DIRECTIONS:
            from = buildings.hasOwnProperty(action.from) ? buildings[action.from] : null;
            to = buildings.hasOwnProperty(action.to) ? buildings[action.to] : null;
            return Object.assign({}, state, {
                from: action.from,
                to: action.to,
                routes: search(from, to)
            });
        case SELECT_FROM:
            from = buildings.hasOwnProperty(action.payload) ? buildings[action.payload] : null;
            to = buildings.hasOwnProperty(state.to) ? buildings[state.to] : null;
            return Object.assign({}, state, {
                from: action.payload,
                routes: search(from, to)
            });
        case SELECT_TO:
            from = buildings.hasOwnProperty(state.from) ? buildings[state.from] : null;
            to = buildings.hasOwnProperty(action.payload) ? buildings[action.payload] : null;
            return Object.assign({}, state, {
                to: action.payload,
                routes: search(from, to)
            });
        default:
            return state;
    }
}