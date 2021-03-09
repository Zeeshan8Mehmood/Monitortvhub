import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { CreateID } from "./SimpleFunctions.js";
import { Sidebar } from "./SVG.js";

export const SidebarLatestPosts = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 5) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);
  const { nodes: posts } = data.allMdx;

  return (
    <div className="posts-sidebar">
      <p>Latest Posts</p>
      <ul>
        {posts.map((item, index) => (
          <li key={index}>
            <article itemType="http://schema.org/CreativeWork" itemScope>
              <Link to={item.fields.slug} rel="bookmark">
                {item.frontmatter.title}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SidebarTableofContents = ({ data, ad }) => {
  const [bSidebar, setBSidebar] = useState("");
  const sidebarToC = data?.stoc;
  const sidebarImage = data?.image;
  const sidebarShow = sidebarToC?.length || (sidebarImage && data?.atext) ? true : false;
  const { alink: sLink, atext: sText, stitle: sTitle } = data;
  const Img = sidebarImage?.base;
  const ImgName = sidebarImage?.name;
  const imgWidth = sidebarImage?.childImageSharp?.original?.width;
  const imgHeight = sidebarImage?.childImageSharp?.original?.height;
  const LinkTag = (sLink && "a") || React.Fragment;

  const openSidebar = () => {
    bSidebar ? setBSidebar("") : setBSidebar("active");
  };

  return (
    <>
      {sidebarShow && (
        <button className={`sidebar-btn ${bSidebar}`} onClick={() => openSidebar()}>
          <Sidebar />
        </button>
      )}
      <div id="toc-sidebar" className="toc-sidebar" role="navigation">
        {sidebarShow && !!sidebarToC?.length && (
          <div className="toc-top">
            <p className="toctitle">Table of Contents</p>
            <ul>
              {sidebarToC.map((item, index) => {
                const id = `#${CreateID(item.name)}`;
                const { name, level } = item;

                return (
                  <li className={`toclevel-${level ? 2 : 1}`} key={index}>
                    <a onClick={() => setBSidebar("")} href={id} title={name}>
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {sidebarShow && sidebarImage && (
          <div className="toc-bottom">
            <p className="toc-bottom-heading">{sTitle}</p>
            <div>
              <LinkTag href={sLink} rel="nofollow noopener" target="_blank">
                <picture>
                  <source srcSet={`/image/sidebar/${ImgName}.webp`} />
                  <img src={`/img/${Img}`} alt={sText} loading="lazy" width={imgWidth} height={imgHeight} />
                </picture>
                <p>{sText}</p>
              </LinkTag>
            </div>
          </div>
        )}
        {ad}
      </div>
    </>
  );
};
