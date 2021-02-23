import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Card from "../components/TOCCard";
import hero from "../../lessons/images/Wordmark-XL.png";

import "./index.css";

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query HomepageTOC {
        site {
          siteMetadata {
            title
            subtitle
            description
            keywords
          }
        }
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___order] }) {
          edges {
            node {
              id
              frontmatter {
                order
                path
                title
                section
                description
              }
            }
          }
        }
      }
    `}
    render={(props) => (
      <div className="index">
        <div className="jumbtron-image-container">
          <img
            className="jumbotron-image"
            src={hero}
            alt="Complete Intro to React v6 and Intermediate React v3"
          />
        </div>
        <Card
          title="Table of Contents"
          content={props.allMarkdownRemark.edges}
        />
      </div>
    )}
  />
);

export default IndexPage;
