import { useState } from "react";
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import PageHeader from '../components/common/PageHeader.js';
import JobList from '../components/forProfessionalsStudents/JobList.js';
import { JobFilter } from '../components/forProfessionalsStudents/JobFilter.js';
import Footer from "../components/common/Footer.js";
import { createHtmlString } from "../util/wordpressUtil.js";

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
      <PageHeader 
        title='For Professionals & Students'
        headerBackgroundImageClass='bg-forProfessionalsStudents'
        subtitle={'LCD offers numerous professional development and career opportunities for everyone; from practicing attorneys, to students interested in pursuing legal careers.'}
        subtitleSize='text-2xl lg:text-4xl'
        maxWidth='lg:max-w-3xl' 
      />
      <div className="max-w-6xl m-auto py-20 px-6">
        <div className='grid gap-x-6 grid-cols-1 lg:grid-cols-5'>
          <div className="order-last lg:order-first lg:col-span-3 lg:pr-16 wp-text mb-4" dangerouslySetInnerHTML={createHtmlString(forProfessionalsAndStudentsContent)} />
          <div className='order-first lg:order-last pb-12 lg:pb-0 lg:col-span-2 lg:pt-2'>
            <div className="font-extrabold text-4xl lg:text-6xl pb-6 text-black">Browse Jobs</div>
            <JobFilter
              allJobs={jobs}
              allEmployers={employers}
              setSelectedJobs={setSelectedJobs}
            />
            <div className='bg-jobPostingsBlue border border-slate-300 shadow-xl rounded-md h-96 lg:h-eventWidget overflow-auto'>
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
    query: GET_FOR_PROF_STUDENTS_CONTENT,
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
    },
    revalidate: 20,
  }
}