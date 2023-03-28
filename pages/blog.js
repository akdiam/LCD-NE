import Head from 'next/head.js';
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import PageHeader from "../components/common/PageHeader";
import Footer from "../components/common/Footer";

const latest_post = {
  "title": "Featured post 1",
  "excerpt": "Lorem ipsum blah blah i don't know this hello blah blahlkajsdlksajdklasjdklasjdklajs.",
  "date_posted": "March 28, 2023",
  "src": "leadership.jpg",
};

const second_latest_post = {
  "title": "Featured post 2",
  "excerpt": "Lorem ipsum blah blah i don't know this hello blah blahlka jdsk;lj adk;l ",
  "date_posted": "March 28, 2023",
  "src": "leadership.jpg",
}

const all_posts = [
  {
    "title": "Example post 4",
    "excerpt": "Lorem ipsum blah blah i don't know this hello blah blahlkajsdlksajdklasjdklasjdklajs.",
    "date_posted": "March 28, 2023",
    "src": "leadership.jpg",
  },
  {
    "title": "Example post 5",
    "excerpt": "Lorem ipsum blah blah i don't know this hello blah blahlkajsdlksajdklasjdklasjdklajs.",
    "date_posted": "March 28, 2023",
    "src": "leadership.jpg",
  },
  {
    "title": "Example post 6",
    "excerpt": "Lorem ipsum blah blah i don't know this hello blah blahlkajsdlksajdklasjdklasjdklajs.",
    "date_posted": "March 28, 2023",
    "src": "leadership.jpg",
  },
  {
    "title": "Example post 7",
    "excerpt": "Lorem ipsum blah blah i don't know this hello blah blahlkajsdlksajdklasjdklasjdklajs.",
    "date_posted": "March 28, 2023",
    "src": "leadership.jpg",
  },
]

export default function Blog({ lcdLogoUrl }) {
  return (
    <div className="w-full">
      <Head>
        <title>Blog - Lawyers Collaborative for Diversity</title>
        <meta name="description" content="Blog of Lawyers Collaborative for Diversity (LCD)." />
      </Head>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader
        title='Blog'
        headerBackgroundImageClass='bg-contact'
        subtitle={'The latest from LCD'}
        subtitleSize='text-3xl lg:text-7xl'
      />
      <div className='max-w-7xl mx-auto my-24 px-6'>
        <div className='featured-section grid lg:grid-cols-3 mb-6 gap-6'>
          <div className='group lg:col-span-2 bg-lcdGray text-left hover:cursor-pointer shadow-lg rounded-md overflow-hidden'>
            <div className='overflow-hidden'>
              <img src={latest_post.src} className='w-full max-h-96 object-cover rounded-t-md group-hover:scale-110 saturate-50 group-hover:saturate-100 transition ease-in-out duration-75' />
            </div>
            <div className='p-4 border-t-8 border-blue-600'>
              <div className='text-4xl font-bold pb-4'>
                {latest_post.title}
              </div>
              <div className='text-xl font-normal pb-4 text-gray-700'>
                {latest_post.excerpt}
              </div>
              <div className='text-lg font-thin text-gray-500'>
                Posted on {latest_post.date_posted}
              </div>
            </div>
          </div>
          <div className='group lg:col-span-1 bg-lcdGray text-left hover:cursor-pointer rounded-md shadow-lg min-h-full overflow-hidden'>
            <div className='overflow-hidden'>
              <img src={latest_post.src} className='w-full object-cover rounded-t-md group-hover:scale-110 saturate-50 group-hover:saturate-100 transition ease-in-out duration-75' />
            </div>
            <div className='p-4 border-t-8 border-blue-600 min-w-0 min-h-full line-clamp-3'>
              <div className='text-2xl font-bold pb-4'>
                {second_latest_post.title}
              </div>
              <div className='text-lg font-normal pb-4 text-gray-700'>
                {second_latest_post.excerpt}
              </div>
              <div className='text-lg font-thin text-gray-500'>
                Posted on {second_latest_post.date_posted}
              </div>
            </div>
          </div>
        </div>
        <div className='all-posts grid lg:grid-cols-3 gap-6'>
          {all_posts.map((post, _) => (
            <div key={post.title} className='p-4 border border-red-400 w-full'>
              <div>
                {post.title}
              </div>
              <div>
                {post.excerpt}
              </div>
              <div>
                {post.date_posted}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps(){
  const GET_BLOG_INFO = gql`
    query GetBlogInfo {
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `

  const response = await client.query({
    query: GET_BLOG_INFO,
  });

  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      lcdLogoUrl,
    },
    revalidate: 20,
  }
}