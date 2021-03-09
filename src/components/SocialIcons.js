import React from "react";
import { Facebook, Youtube, Twitter } from "./SVG.js";
import SiteMetaData from "./SiteMetadata";

const SocialIcons = () => {
  const { facebook, youtube, twitter } = SiteMetaData();

  return (
    <div className="social-icons">
      {youtube && (
        <a href={youtube} className="social-icon" target="_blank" data-wpel-link="external" rel="follow external noopener noreferrer">
          <Youtube />
        </a>
      )}
      {facebook && (
        <a href={facebook} className="social-icon" target="_blank" data-wpel-link="external" rel="follow external noopener noreferrer">
          <Facebook />
        </a>
      )}
      {twitter && (
        <a href={twitter} className="social-icon" target="_blank" data-wpel-link="external" rel="follow external noopener noreferrer">
          <Twitter />
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
