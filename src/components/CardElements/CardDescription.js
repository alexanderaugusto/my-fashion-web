import React from "react";
import PropTypes from "prop-types";

class CardDescription extends React.Component {
  render() {
    const { color, fontWeight = 400, fontSize, marginTop, marginBottom, children, tag, href } = this.props

    if (tag === "a") {
      return <p><a href={href} className={"card-description " + this.props.className}
        style={{ color, fontWeight, fontSize, marginTop, marginBottom }}>{children}</a></p>
    }
    return <p className={"card-description " + this.props.className}
      style={{ color, fontWeight, fontSize, marginBottom }}>{children}</p>;
  }
}

CardDescription.propTypes = {
  children: PropTypes.any
};

export default CardDescription;