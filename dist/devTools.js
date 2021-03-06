"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let id = 0;
exports.default = (storeName, initialState, setState) => {
    const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;
    const instanceID = id;
    id += 1;
    const name = `t-state - ${storeName}`;
    const features = {
        jump: true,
    };
    const devTools = reduxDevTools.connect({ name, features });
    devTools.init(initialState);
    devTools.subscribe((data) => {
        switch (data.type) {
            case 'RESET':
                setState(initialState);
                break;
            case 'DISPATCH':
                console.log('DevTools requested to change the state to', data.state);
                switch (data.payload.type) {
                    case 'JUMP_TO_STATE':
                    case 'JUMP_TO_ACTION': {
                        setState(JSON.parse(data.state));
                        break;
                    }
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    });
    return (_state, newState, action) => {
        devTools.send(action, newState, {}, instanceID);
    };
};
