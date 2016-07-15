/*
    React is a component based component/view library.
*/

/**************Vocab**************
View Controller - The top-level component that controls state
for lower level components.  Passes data and callbacks down the
tree via the props object
********************************/


//The library needs to be imported

var React = require('react');
import React from 'react';

//Each component is an instance of Rect's component class:

var newComponent = React.createClass({
    //Stuff
});

class newComponent extends React.Component {
    //Stuff
}

/* Lifecycle
================================ */

/*
    Each component contains a number of functions that are executed in
    an order known as the Component Lifecycle
*/

var componentLifecycle = React.createClass({
    getInitialState: function() {
        //ES5 only, initialize the state's properties
    },

    getDefaultProps: function() {
        //ES5 only, initialize the props object
    }

    //The rest of the lifecycle methods are the same in ES6
});

class componentLifecycle extends React.Component {
    constructor(props) {
        super(props);//The props object is just a part of the constructor
        this.state = {
            //Initialize the state object's properties
        }
    }

    static propTypes = {
        //An object that validates each of the props being passed to the component
        property1: React.PropTypes.array, //This will confirm that property1 is an array
                                            //but it is an optional property

        property2: React.PropTypes.any.isRequired //Can be anything, but is required

        customProp: function(props, propName, componentName) { //Custom validation
            if(!/matchme/.test(props[propName])) {
                return new Error('Error message!');
            }
        }
    }

    mixins:[]; //Used to add functionality shared among components

    displayName: 'Some identifier for debugging';

    /********Mounting*********/
    componentWillMount() {
        //Invoked once, on both the client and the server
        //immediately before rendering occurs
        //It will not be triggered by this.setState()
    }

    componentDidMount() {
        //Invoked on the client only immediately after rendering.
        //Because React renders from the deepest levels up,
        //the component can access all children at this point.

        //This is useful for integrating with other libraries (D3!),
        //setting timers, or sending AJAX requests.
    }

    /********Updating*********/
    componentWillReceiveProps(nextProps) {
        //This is invoked when the component properties change
        this.props //Old props
        this.setState({
            isAHigherNumber: nextProps > this.props;
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        //If this returns false, the component will not re-render
        //componentWillUpdate and componentDidUpdate will not be called
        //Use this to optomize the app by pruning unnecessary updates

        return nextProps.name !== this.props.name;
    }

    componentWillUpdate() {
        //Fires just before the component's render method
        //when called from a state or property change.
        //Not called on initial render
        //Use this to prepare the component before an update

        /*******=>this.setState() cannot be called from here<=*******/
    }

    componentDidUpdate() {
        //Invoked immediately after the component's updated data
        //are pushed onto the (actual) DOM.

        //Used to operate on the DOM after the updates have occurred.
    }

    /********Unmounting*********/

    componentWillUnmount() {
        //This is called immediately before the component unmounts.

        //Useful for cleaning up code associated with the component.
        //eg. timers, d3 selections, or any DOM elements created in
        //componentDidMount()
    }
}

/* JSX
================================ */

/*Used in the render() method to represent the desired DOM elements*/

return (
        <div> //There can only be 1 upper level item
            <h1>A heading for some component</h1>
            <SomeCustomItem />
        </div>
    );

