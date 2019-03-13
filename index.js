import React, { Component } from 'react';
import styled, { StyleSheetManager } from 'styled-components';

class ShadowRootStyledComponent extends Component {
  mainEl = undefined;

  constructor() {
    super();

    this.state = {
      shadowRoot: undefined
    };

    this.mainEl = React.createRef();
  }

  componentDidMount() {
    this.setShadowRoot(this.mainEl.current);
  }

  setShadowRoot = element => {
    if (!element) {
      return;
    }

    while (element.parentNode && (element = element.parentNode)) {
      if (element instanceof ShadowRoot) {
        this.setState({ shadowRoot: element });
        return true;
      }
    }

    return false;
  };

  render() {
    return (
      <div ref={this.mainEl}>
        {this.state.shadowRoot && (
          <StyleSheetManager target={this.state.shadowRoot}>
            {this.props.children}
          </StyleSheetManager>
        )}
      </div>
    );
  }
}

export default ShadowRootStyledComponent;
