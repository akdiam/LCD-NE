import { client } from '../../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../../components/common/Header/Header.js';
import PageHeader from '../../components/common/PageHeader.js';
import Footer from '../../components/common/Footer';
import { createHtmlString, formatTimestamp } from '../../util/wordpressUtil.js';
import { createCommonStaticProps } from '../../util/getCommonStaticProps.js';

export default function BlogPost({ lcdLogoUrl, post, socials }) {
  return (
    <div className='w-full'>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader
        title={`Posted on ${formatTimestamp(post.date)}`} 
        subtitle={post.title}
        headerBackgroundImageClass='bg-blue-700'
        subtitleSize={'text-3xl lg:text-6xl'}
        maxWidth={'lg:max-w-6xl'}
        backLink={'/blog'}
        backText={'< Back to all blog posts'}
      />
      <div className='max-w-7xl mx-auto px-6 py-24'>
        <div dangerouslySetInnerHTML={createHtmlString(post.content)} />
      </div>
      <Footer socials={socials} />
    </div>
  )
}

export async function getStaticPaths() {
  const GET_ALL_POSTS = gql`
    query GetAllPosts {
      posts(where: { orderby: { field: DATE, order:DESC } }) {
        nodes {
          slug
          postId
          date
        }
      }
    }
  `

  const response = await client.query({
    query: GET_ALL_POSTS,
  });

  const paths = response?.data?.posts?.nodes.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = createCommonStaticProps(async ({ params }) => {
  const slug = params.slug;

  const GET_POST = gql`
    query GetPost($slug: ID!) {
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
      post(id: $slug, idType: SLUG) {
        title
        content
        postId
        date
      }
    }
  `

  const response = await client.query({
    query: GET_POST,
    variables: { slug },
  });

  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;
  const post = response?.data?.post; 

  return { 
    props: { 
      lcdLogoUrl,
      post
    },
    revalidate: 20, 
  };
});
