// @flow
import React, { Suspense, PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { isAuthenticated, isUserInitiated } from "modules/Auth/store/selectors";

// import components
import routes from "./routes";
import PrivateRoute from "./Private";
import PublicRoute from "./Public";
import Loader from "components/loader";
import { history } from "store";

type RoutesProps = {
  isAuthenticated: Boolean,
  isUserInitiated: Boolean
};

class Routes extends PureComponent<RoutesProps> {
  render() {
    const { isAuthenticated, isUserInitiated } = this.props;
    return (
      <Fragment>
        {isUserInitiated ? (
          // $FlowFixMe
          <ConnectedRouter history={history}>
            <Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((route, i) => {
                  if (route.auth) {
                    return (
                      <PrivateRoute
                        isAuthenticated={isAuthenticated}
                        key={i}
                        {...route}
                      />
                    );
                  }
                  return <PublicRoute key={i} {...route} />;
                })}
              </Switch>
            </Suspense>
          </ConnectedRouter>
        ) : (
          <Loader />
        )}
      </Fragment>
    );
  }
}

const Actions = {};

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
    isUserInitiated: isUserInitiated(state)
  };
}

export default connect(
  mapStateToProps,
  Actions
)(Routes);
