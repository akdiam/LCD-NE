import Head from 'next/head.js';
import { useState } from "react";
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import PageHeader from '../components/common/PageHeader.js';
import JobList from '../components/forProfessionalsStudents/JobList.js';
import { JobFilter } from '../components/forProfessionalsStudents/JobFilter.js';
import Footer from "../components/common/Footer.js";
import { createHtmlString } from "../util/wordpressUtil.js";
import { createCommonStaticProps } from '../util/getCommonStaticProps.js';

export default function ForProfessionalsAndStudentsPage({ forProfessionalsAndStudentsContent, lcdLogoUrl, jobs, employers, forProfessionalsAndStudentsHeader, socials }) {
  const [selectedJobs, setSelectedJobs] = useState(jobs);

  return (
    <>
      <Head>
        <title>For Professionals & Students - Lawyers Collaborative for Diversity</title>
        <meta name="description" content="For Professionals & Students - Lawyers Collaborative for Diversity (LCD)." />
      </Head>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader 
        title='For Professionals & Students'
        headerBackgroundImageClass='bg-forProfessionalsStudents'
        subtitle={forProfessionalsAndStudentsHeader}
        subtitleSize='text-2xl lg:text-4xl'
        maxWidth='lg:max-w-3xl'
      />
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className='pb-12 lg:pb-20 lg:pl-20 lg:w-2/5 lg:pt-2 lg:float-right'>
          <div className="font-extrabold text-4xl lg:text-6xl pb-6 text-black">Browse Jobs</div>
          <JobFilter
            allJobs={jobs}
            allEmployers={employers}
            setSelectedJobs={setSelectedJobs}
          />
          <div className='bg-jobPostingsBlue border border-slate-300 shadow-xl rounded-md h-96 lg:h-eventWidget overflow-y-auto'>
            <JobList jobs={selectedJobs} />
          </div>
        </div>
        <div className='wp-text mb-4 lg:w-full'>
          <div dangerouslySetInnerHTML={createHtmlString(forProfessionalsAndStudentsContent)} />
        </div>
        <div className='clear-both' />
      </div>
      <Footer socials={socials} />
    </>
  );
};

export const getStaticProps = createCommonStaticProps(async () => {
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
      forProfessionalsAndStudentsHeader: websiteCopy(id: "header-for-professionals-students", idType: SLUG) {
        slug
        title
        uri
        website_copy {
          sectionContent
        }
      }
    }
  `

  const response = await client.query({
    query: GET_FOR_PROF_STUDENTS_CONTENT,
  });

  const forProfessionalsAndStudentsContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;
  const forProfessionalsAndStudentsHeader = response?.data?.forProfessionalsAndStudentsHeader?.website_copy?.sectionContent + '';
  let jobs = response?.data?.jobPostings?.nodes;

  // Sort events by date before rendering
  const jobsForSort = [...jobs];
  jobs = jobsForSort.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const employers = [];
  jobs.forEach(job => {
    if (!employers.includes(job.jobPosting.employer)) {
      employers.push(job.jobPosting.employer);
    }
  });

  return {
    props: {
      forProfessionalsAndStudentsContent,
      lcdLogoUrl,
      jobs,
      employers,
      forProfessionalsAndStudentsHeader,
    },
    revalidate: 20,
  }
});