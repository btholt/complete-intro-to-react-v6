import React from "react";
import Link from "gatsby-link";
import * as helpers from "../util/helpers";
import "./TOCCard.css";

const sortFn = helpers.sorter;

const LessonCard = ({ content, title }) => {
  console.log(sortFn);

  const sections = content
    .map(lesson => lesson.node.frontmatter)
    .sort(sortFn)
    .reduce((acc, lesson) => {
      if (!acc.length) {
        acc.push([lesson]);
        return acc;
      }

      const lastSection = acc[acc.length - 1][0].section.split(",")[0];
      if (lastSection === lesson.section.split(",")[0]) {
        acc[acc.length - 1].push(lesson);
      } else {
        acc.push([lesson]);
      }

      return acc;
    }, []);

  return (
    <div className="main-card">
      <h1 className="lesson-title gradient">{title}</h1>
      <div className="lesson-content">
        <ol className="sections-name">
          {sections.map(section => (
            <li key={section[0].section}>
              <h3 className="lesson-section-title">{section[0].section}</h3>
              <ol>
                {section.map(lesson => (
                  <li key={lesson.path}>
                    <Link to={lesson.path}>{lesson.title}</Link>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default LessonCard;
