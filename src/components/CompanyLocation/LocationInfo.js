import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { InfoWindow } from "google-maps-react";

export default function InfoWindowEx(props) {
  const infoWindowRef = React.createRef();
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement);
    infoWindowRef.current.infowindow.setContent(contentElement);
  },[contentElement, infoWindowRef, props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
}