import Head from 'next/head.js';
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import PageHeader from "../components/common/PageHeader";
import Footer from "../components/common/Footer";
import FeaturedPostExcerpt from '../components/blog/FeaturedPostExcerpt.js';
import PostExcerpt from '../components/blog/PostExcerpt.js';

export default function Blog({ lcdLogoUrl, posts }) {
  const featuredPost = posts.length > 0 && posts[0];
  const allPosts = posts.slice(1);
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
      <div className="pt-24 mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 md:grid-cols-2 pb-20">
        <FeaturedPostExcerpt featuredPost={featuredPost} />
        <div className="mx-auto w-full pt-12 sm:pt-16 lg:mx-0 md:pt-0">
          <div className="">
            {allPosts.map((post) => (
              <PostExcerpt key={post.slug} post={post} />
            ))}
          </div>
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
      posts(where: { orderby: { field: DATE, order:DESC } }) {
        nodes {
          excerpt
          slug
          date
          title
        }
      }
    }
  `

  const response = await client.query({
    query: GET_BLOG_INFO,
  });

  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;
  const posts = response?.data?.posts?.nodes;

  return {
    props: {
      lcdLogoUrl,
      posts,
    },
    revalidate: 20,
  }
}