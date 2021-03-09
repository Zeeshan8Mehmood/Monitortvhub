import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

const Author = ({ authorID }) => {
  const { authors } = useStaticQuery(graphql`
    query FindAuthor {
      authors: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "author-page" } } }) {
        nodes {
          frontmatter {
            id
            title
            description
            slug
            image {
              base
              childImageSharp {
                original {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);
  const author = authors.nodes.find((author) => author.frontmatter.id === authorID);
  if (author) {
    const { title, description, slug, image } = author.frontmatter;
    const { base: img } = image;
    const { width, height } = image.childImageSharp.original;

    return (
      author && (
        <div className="author" itemProp="author">
          <Link to={`/author/${slug}/`} className="author-img-link">
            <img src={`/img/${img}`} alt={title} loading="lazy" className="author-img" width={width} height={height} />
          </Link>
          <div className="author-text vcard" itemScope itemType="https://schema.org/Person">
            <Link to={`/author/${slug}/`} className="author-title-link url fn" itemProp="url" rel="author">
              <span itemProp="name">{title}</span>
            </Link>
            <p>{description}</p>
          </div>
        </div>
      )
    );
  } else {
    return <></>;
  }
};

export default Author;
