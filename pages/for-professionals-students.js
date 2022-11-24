import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function ForProfessionalsAndStudentsPage({ forProfessionalsAndStudentsContent }) {
  return (
    <div className="max-w-screen-lg m-auto">
      <div dangerouslySetInnerHTML={createHtml(forProfessionalsAndStudentsContent)} />
    </div>  
  );
};

export async function getStaticProps() {
  const GET_FOR_PROF_STUDENTS_CONTENT = gql`
    query getForProfessionalsAndStudentsContent {
      pages(where: {title: "ProfessionalsAndStudents"}) {
        nodes {
          content
        }
      }
    }
  `
  const response = await client.query({
    query: GET_FOR_PROF_STUDENTS_CONTENT
  });
  const forProfessionalsAndStudentsContent = response?.data?.pages?.nodes[0]?.content;

  return {
    props: {
      forProfessionalsAndStudentsContent
    }
  }
}