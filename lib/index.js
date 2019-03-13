function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import styled, { StyleSheetManager } from 'styled-components';

class ShadowRootStyledComponent extends Component {
  constructor() {
    super();

    _defineProperty(this, "mainEl", undefined);

    _defineProperty(this, "setShadowRoot", element => {
      if (!element) {
        return;
      }

      while (element.parentNode && (element = element.parentNode)) {
        if (element instanceof ShadowRoot) {
          this.setState({
            shadowRoot: element
          });
          return true;
        }
      }

      return false;
    });

    this.state = {
      shadowRoot: undefined
    };
    this.mainEl = React.createRef();
  }

  componentDidMount() {
    this.setShadowRoot(this.mainEl.current);
  }

  render() {
    return React.createElement("div", {
      ref: this.mainEl
    }, this.state.shadowRoot && React.createElement(StyleSheetManager, {
      target: this.state.shadowRoot
    }, this.props.children));
  }

}

export default ShadowRootStyledComponent;