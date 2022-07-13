import React from "react";

export default function Date() {
  var showdate = new Date();
  var displaydate =
    showdate.getDate() +
    "/" +
    (showdate.getMonth() + 1) +
    "/" +
    showdate.getFullYear();

  return (
    <div>
      <input type="text" value={displaydate} readOnly="true" />
    </div>
  );
}
