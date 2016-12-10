//Packages used in tutorial - enzyme, react-addons-test-utils, tape, babel-register, jsdom, sinon (react@15)
//React components are basic JS
//Shallow rendering is the compiling of React components into JavaScript from JSX.  Shallow renders are aware of the React component's name, props, and state, but not the element that the component renders to.
//Static rendering creates the final HTML which can then be probed by helper functions.  This rendering is **not** aware of the React component's workings, but we do get a full virtual DOM to probe.
//Full DOM rendering allows the component to interact with an actual DOM in the tests. Because it's the actual DOM structure with React in it, it will be aware of both React and the elements it renders.