/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as headerActions from './header/actions'

import Header from './header/index.jsx';
import Modal from './modal/index.jsx';
import Notify from './additional/notify/index.jsx';


 class App extends Component {
    constructor(props) {
        super(props);
    }

    getDevice(width) {
        let device = '';

        if(width > 415 && width <= 1024) device = 'tablet';
        if(width > 319 && width <= 415) device = 'phone';

        return device;
    }

    getOrientation(width, device) {
        let orientation = '';

        switch(device) {
            case 'tablet':
                if(width > 768 && width <= 1024) orientation = 'landscape';
                if(width > 480 && width <= 768) orientation = 'portrait';
                break;
            case 'phone':
                // if(width > 480 && width <= 740) orientation = 'landscape';
                if(width > 319 && width <= 480) orientation = 'portrait';
                break;
        }

        return orientation;
    }

    componentWillMount() {
        let {dispatch} = this.props;
        let container = document.body.querySelector('#app');
        let containerWidth = screen.width;

        let device = this.getDevice(containerWidth);
        let orientation = this.getOrientation(containerWidth, device);

        container.className = device + " " + orientation;
        dispatch(headerActions.setResponsiveParams({device, orientation}))
    }

    render() {
        let {children} = this.props;
        return (
            <div>
                <Header />
                {children}
                <Modal />
                <Notify />
            </div>
        )
    }
}

export default connect(function(state) {
    return {};
})(App);

