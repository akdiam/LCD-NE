import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header';

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function ForProfessionalsAndStudentsPage({ forProfessionalsAndStudentsContent, lcdLogoUrl }) {
  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <div className="max-w-screen-lg m-auto pt-20">
        <div className="m-4" dangerouslySetInnerHTML={createHtml(forProfessionalsAndStudentsContent)} />
      </div>  
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
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `
  const response = await client.query({
    query: GET_FOR_PROF_STUDENTS_CONTENT
  });
  const forProfessionalsAndStudentsContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      forProfessionalsAndStudentsContent,
      lcdLogoUrl
    }
  }
}