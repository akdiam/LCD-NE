import { useEffect, useState } from "react";

import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header/Header.js';
import PageHeader from '../components/common/PageHeader.js';
import JobList from '../components/forProfessionalsStudents/JobList.js';
import { JobFilter } from '../components/forProfessionalsStudents/JobFilter.js';
import Footer from "../components/common/Footer.js";

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function ForProfessionalsAndStudentsPage({ forProfessionalsAndStudentsContent, lcdLogoUrl, jobs }) {
  const [selectedJobs, setSelectedJobs] = useState(jobs);

  const employers = [];
  jobs.forEach(job => {
    if (!employers.includes(job.jobPosting.employer)) {
      employers.push(job.jobPosting.employer);
    }
  });

  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader name='For Professionals & Students'  headerBackgroundImageClass='bg-forProfessionalsStudents' />
      <div className="max-w-6xl m-auto py-20 px-6">
        <div className='grid gap-x-6 grid-cols-1 lg:grid-cols-5'>
          <div className='lg:col-span-3 lg:pr-16'>        
            <div className="mb-4" dangerouslySetInnerHTML={createHtml(forProfessionalsAndStudentsContent)} />
          </div>
          <div className='lg:col-span-2'>
            <div className="font-extrabold text-3xl lg:text-4xl pb-6">Career Opportunities</div>
            <JobFilter
              allJobs={jobs}
              allEmployers={employers}
              setSelectedJobs={setSelectedJobs}
            />
            <div className='bg-lcdGray border border-slate-300 shadow-xl rounded-md h-96 lg:h-eventWidget overflow-auto'>
              <JobList jobs={selectedJobs} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
      jobPostings(first: 100) {
        nodes {
          jobPosting {
            jobType
            jobLocation
            applicationLink
            employer
          }
          title
          date
        }
      }
    }
  `

  const response = await client.query({
    query: GET_FOR_PROF_STUDENTS_CONTENT
  });
  const forProfessionalsAndStudentsContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;
  let jobs = response?.data?.jobPostings?.nodes;

  // Sort events by date before rendering
  const jobsForSort = [...jobs];
  jobs = jobsForSort.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return {
    props: {
      forProfessionalsAndStudentsContent,
      lcdLogoUrl,
      jobs,
    }
  }
}