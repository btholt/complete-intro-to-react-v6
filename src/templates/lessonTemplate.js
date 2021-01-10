import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import * as helpers from "../util/helpers";

const sortFn = helpers.sorter;

export default function Template(props) {
  let { markdownRemark, allMarkdownRemark } = props.data; // data.markdownRemark holds our post data

  const sections = allMarkdownRemark.edges
    .map(lesson => lesson.node.frontmatter)
    .sort(sortFn);

  const { frontmatter, html } = markdownRemark;

  const index = sections.findIndex(el => el.path === frontmatter.path);

  const prevLink =
    index > 0 ? (
      <Link className="prev" to={sections[index - 1].path}>
        {"← " + sections[index - 1].title}
      </Link>
    ) : null;
  const nextLink =
    index < sections.length - 1 ? (
      <Link className="next" to={sections[index + 1].path}>
        {sections[index + 1].title + " →"}
      </Link>
    ) : null;
  return (
    <div className="lesson-container">
      <div className="lesson">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="lesson-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="lesson-links">
          {prevLink}
          {nextLink}
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query LessonByPath($path: String!) {
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
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          frontmatter {
            order
            path
            title
          }
        }
      }
    }
  }
`;
