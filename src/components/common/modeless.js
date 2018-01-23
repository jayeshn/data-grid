import React from 'react';

class Modeless extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById(this.props.root);
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.modalRoot.removeChild(this.el);
  }
  
  render() {
    // Use a portal to render the children into the element
    return (
        <div style={{"position":"absolute", "left":this.props.x, "top":this.props.y, "zIndex": 3}}>
            {this.props.children}
            </div>
    );
      
  }
}

export default Modeless;
