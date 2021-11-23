import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { loadGobalConfig } from "../../actions/global.action";

/**
 * @module globalComponent
 * @component GlobalConfigLoader
 */
class GlobalConfigLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * Call every time on mount component
     */
    componentDidMount = async () => {
        await this.props.action.loadGobalConfig();
    };
    render() {
        return (<React.Fragment>{""}</React.Fragment>);
    }
}

//state map from redux store, based on initial state
const mapStateToProps = (state) => {
    const { globalConfig } = state;
    return { globalConfig: {...globalConfig?.result} };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    action: { loadGobalConfig: () => dispatch(loadGobalConfig()) },
    // loadGobalConfig: () => dispatch(loadGobalConfig()) ,
});

const connectedGlobalConfigLoader = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GlobalConfigLoader));

export { connectedGlobalConfigLoader as GlobalConfigLoader };
