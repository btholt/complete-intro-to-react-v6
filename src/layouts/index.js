import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";

import "bootstrap/dist/css/bootstrap.css";
import "prismjs/themes/prism-solarizedlight.css";
import "code-mirror-themes/themes/monokai.css";
import "./index.css";

// import jpg from "../../static/posterframe.jpg";

const TemplateWrapper = props => {
  return (
    <StaticQuery
      render={data => {
        const frontmatter =
          props.data && props.data.markdownRemark
            ? props.data.markdownRemark.frontmatter
            : null;

        return (
          <div>
            <Helmet
              title={
                frontmatter
                  ? `${frontmatter.title} – ${frontmatter.section} – ${data.site.siteMetadata.title}`
                  : data.site.siteMetadata.title
              }
              meta={[
                {
                  name: "og:title",
                  content: frontmatter
                    ? `${frontmatter.title} – ${frontmatter.section} – ${data.site.siteMetadata.title}`
                    : data.site.siteMetadata.title
                },
                {
                  name: "description",
                  content: frontmatter
                    ? frontmatter.description
                    : data.site.siteMetadata.description
                },
                {
                  name: "og:description",
                  content: frontmatter
                    ? frontmatter.description
                    : data.site.siteMetadata.description
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image"
                },
                // {
                //   name: "og:image",
                //   content: "https://btholt.github.io" + jpg
                // },
                // {
                //   name: "og:url",
                //   content:
                //     "https://btholt.github.io/complete-intro-to-containers" +
                //     (frontmatter && frontmatter.path ? frontmatter.path : "")
                // },
                {
                  name: "keywords",
                  content: data.site.siteMetadata.keywords.join(", ")
                },
                {}
              ]}
            />
            <div className="navbar navbar-light gradient">
              <Link to="/" className="navbar-brand">
                <h1>{data.site.siteMetadata.title}</h1>
              </Link>
              {!frontmatter ? null : (
                <h2>{`${frontmatter.section} – ${frontmatter.title}`}</h2>
              )}
            </div>
            <div className="main">{props.children}</div>
          </div>
        );
      }}
      query={graphql`
        query HomePage($path: String!) {
          markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
              path
              title
              order
              section
              description
            }
          }
          site {
            pathPrefix
            siteMetadata {
              title
              subtitle
              description
              keywords
            }
          }
        }
      `}
    />
  );
};

export default TemplateWrapper;
