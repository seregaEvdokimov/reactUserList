/**
 * Created by s.evdokimov on 12.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Tooltip extends Component {
    constructor(props) {
        super(props)
    }

    getStructureTooltip(type, data) {
        let html = null;
        switch(type) {
            case 'name':
                html = <div className={"tooltip-" + type}>
                            <img src={data.img} />
                            <p>{data.text}</p>
                        </div>;
                break;
            case 'email':
                html = <div className={"tooltip-" + type}>
                            <p>Количество непрочитанных писем <mark>{data.text}</mark></p>
                        </div>;
                break;
        }

        return html;
    }

    getX (x) {
        let {tooltip} = this.refs;
        if(tooltip) {
            let widthEl = tooltip.clientWidth;
            let widthPage = window.innerWidth < document.body.clientWidth ? window.innerWidth : document.body.clientWidth;

            if((x + widthEl) > widthPage) {
                x = (x - widthEl < 0) ? 0: x - widthEl;
            }
        }

        return x + 'px';
    };

    getY (y) {
        let {tooltip} = this.refs;
        if(tooltip) {
            var heightEl = tooltip.clientHeight;
            var heightPage = window.innerHeight < document.body.clientHeight ? window.innerHeight : document.body.clientHeight;

            if ((y + heightEl) > heightPage) {
                y = (y - heightEl < 0) ? 0 : y - heightEl;
            }
        }

        return y + 'px';
    };

    render() {
        let {type, data, show, left, top} = this.props;
        return (
            <div ref="tooltip" className={"tooltip " + (show ? 'show' : '')} style={{top: this.getY(top), left: this.getX(left)}}>
                {this.getStructureTooltip(type, data)}
            </div>
        )
    }
}

export default connect(function(state) {
    return state.Tooltip;
})(Tooltip);