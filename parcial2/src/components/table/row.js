import React from "react";

function Tweet(props) {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.directedBy}</td>
    </tr>
  );
}

export default Tweet;
