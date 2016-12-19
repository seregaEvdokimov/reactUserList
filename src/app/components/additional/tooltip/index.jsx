/**
 * Created by s.evdokimov on 12.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dictionary from './../../../lib/Dictionary';

class Tooltip extends Component {
    constructor(props) {
        super(props)
    }

    getStructureTooltip(type, data) {
        let {lang} = this.props;
        let html = null;

        switch(type) {
            case 'name':
                html = <div className={"tooltip__item tooltip_" + type}>
                            <img className="tooltip__picture" src={data.img} />
                            <p className="tooltip__paragraph">{data.text}</p>
                        </div>;
                break;
            case 'email':
                let str = Dictionary.getMessage({number: data.text}, ['tooltip', 'email'], lang);
                html = <div className={"tooltip__item tooltip_" + type}>
                            <p className="tooltip__email">{str}</p>
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
        let {tooltip} = this.props;
        let {type, data, show, left, top} = tooltip;
        return (
            <div ref="tooltip" className={"tooltip " + (show ? 'tooltip_show' : '')} style={{top: this.getY(top), left: this.getX(left)}}>
                {this.getStructureTooltip(type, data)}
            </div>
        )
    }
}

export default connect(function(state) {
    return {
        lang: state.HeaderSetting.currentLang,
        tooltip: state.Tooltip
    };
})(Tooltip);