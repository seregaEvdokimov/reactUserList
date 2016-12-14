/**
 * Created by s.evdokimov on 06.12.2016.
 */

import React, {Component} from 'react';

import Header from './header/index.jsx';
import Modal from './modal/index.jsx';
import Notify from './additional/notify/index.jsx';


 class App extends Component {
    constructor(props) {
        super(props);
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

export default App;

