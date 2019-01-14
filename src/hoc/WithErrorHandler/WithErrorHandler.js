import React, { Component } from "react";

import Aux from "../Auxiliary/Auxiliary";
import Model from "../../components/UI/Model/Model";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
        this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorComfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Model
            show={this.state.error}
            modelClosed={this.errorComfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
