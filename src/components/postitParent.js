import React from "react";

import Postit from "./postit";

function PostitParent() {
  return (
    <div style={{}}>
      <Postit title={"Personal notes"} type={"personal"} />
      <Postit title={"Shared notes"} type={"shared"} />
    </div>
  );
}

export default PostitParent;
