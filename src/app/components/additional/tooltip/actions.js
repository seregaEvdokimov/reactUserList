/**
 * Created by s.evdokimov on 12.12.2016.
 */

import Request from '../../../lib/Request';

export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';
export const SHOW_TOOLTIP_REQUEST = 'SHOW_TOOLTIP_REQUEST';
export const SHOW_TOOLTIP_SUCCESS = 'SHOW_TOOLTIP_SUCCESS';
export const SHOW_TOOLTIP_FAILURE = 'SHOW_TOOLTIP_FAILURE';

export const MOVE_TOOLTIP = 'MOVE_TOOLTIP';

export const HIDE_TOOLTIP = 'HIDE_TOOLTIP';

export function showTooltip(dispatch, data, coords) {
    loadTooltip(dispatch, data);
    return {type: SHOW_TOOLTIP, payload: coords};
}

export function loadTooltipSuccess(data) {
    return {type: SHOW_TOOLTIP_SUCCESS, payload: data};
}

export function loadTooltipFailure(error) {
    return {type: SHOW_TOOLTIP_FAILURE, error};
}

export function moveTooltip(data) {
    return {type: MOVE_TOOLTIP, payload: data};
}

export function hideTooltip() {
    return {type: HIDE_TOOLTIP};
}


function loadTooltip(dispatch, data) {
    dispatch({type: SHOW_TOOLTIP_REQUEST});
    Request.load('tooltip', {id: data.id, type: data.type}, {dispatch, success: loadTooltipSuccess, failure: loadTooltipFailure});
}