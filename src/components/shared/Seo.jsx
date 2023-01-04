import React from "react";
import Helmet from 'react-helmet';

const Seo = ({title}) => {
  const titleText = title ? `${title} | NASA Portal` : "NASA Portal"

  return <Helmet><title>{titleText}</title></Helmet>;
}

export default Seo;