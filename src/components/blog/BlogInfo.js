import React from "react";
import { Calendar, CommentDots, Facebook, Twitter, Pinterest } from "../SVG.js";
import SiteMetaData from "../SiteMetadata.js";
import { CommentCount } from "disqus-react";
import { Location } from "@reach/router";

const BlogInfo = (props) => {
  const { siteURL } = SiteMetaData();
  const { location } = props;

  return (
    <div className="post-top-section">
      <div className="post-info-section">
        <div className="post-info-item">
          <Calendar />
          <p className="published">{props.date}</p>
        </div>
        {props.disqus && (
          <div className="post-info-item">
            <CommentDots />
            <p>
              <a href="#disqus_thread">
                <CommentCount config={props.disqusConfig} shortname={props.disqus}>
                  Comments
                </CommentCount>
              </a>
            </p>
          </div>
        )}
      </div>
      <div className="post-social-section">
        <a target="_blank" rel="noreferrer" data-original-title="Share on Facebook" className="btn btn-facebook" href={`https://www.facebook.com/sharer.php?u=${location.href}`}>
          <Facebook />
        </a>
        <a target="_blank" rel="noreferrer" data-original-title="Share on Twitter" className="btn btn-twitter" href={`https://twitter.com/share?url=${location.href}&amp;text=${encodeURI(props.title)}`}>
          <Twitter />
        </a>
        <a target="_blank" rel="noreferrer" data-original-title=" Share on Pinterest" className="btn btn-pinterest" href={`https://www.pinterest.com/pin/create/button/?url=${location.href}&amp;media=${siteURL}/img/${props.image}`}>
          <Pinterest />
        </a>
      </div>
    </div>
  );
};

export default (props) => <Location>{(locationProps) => <BlogInfo {...locationProps} {...props} />}</Location>;
