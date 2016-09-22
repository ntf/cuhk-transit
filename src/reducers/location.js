import { routes, Building } from "../data";
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

/**
 * @param from {Building}
 * @param to {Building}
 */
function search(from, to) {
    if (!(from instanceof Building) || !(to instanceof Building)) {
        return [];
    }
    let routes = [];
    for (var i in from.nearest) {
        for (var j in to.nearest) {
            routes.push.apply(routes, searchRoute(
                from,
                to,
                from.nearest[i],
                to.nearest[j]
            ));
        }
    }

    return routes.sort(function(a,b) {
        return a.distance - b.distance;
    });
}

function searchRoute( from, to, stop1, stop2) {
    let result = [];

    for (var bus in stop1.schedules) {
        if (stop1.schedules.hasOwnProperty(bus) && stop2.schedules.hasOwnProperty(bus)) {
            let schedule1 = Array.isArray(stop1.schedules[bus]) ? stop1.schedules[bus] : [stop1.schedules[bus]];
            let schedule2 = Array.isArray(stop2.schedules[bus]) ? stop2.schedules[bus] : [stop2.schedules[bus]];
            for (var i in schedule1) {
                for (var j in schedule2) {
                    if (schedule1[i] < schedule2[j]) {
                        let steps = routes[bus].slice(schedule1[i] - 1, schedule2[j]);
                         if(to.name !== stop2.name) {
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

export default function reducer(state = { from: null, to: null, routes: [] }, action) {
    switch (action.type) {
        case SELECT_FROM:
            return Object.assign({}, state, {
                from: action.payload,
                routes: search(action.payload, state.to)
            });
        case SELECT_TO:
            return Object.assign({}, state, {
                to: action.payload,
                routes: search(state.from, action.payload)
            });
        default:
            return state;
    }
}