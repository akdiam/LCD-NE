import YellowButton from '../common/YellowButton.js';

import { createHtmlString, formatTimestamp } from '../../util/wordpressUtil.js';

export default function FeaturedPost({ featuredPost }) {
  const isoDate = formatTimestamp(featuredPost.date);

  return (
    <article className="mx-auto w-full lg:mx-0">
      <time dateTime={isoDate} className="block text-sm leading-6 text-gray-600">
        {isoDate}
      </time>
      <h2 id="featured-post" className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {featuredPost.title}
      </h2>
      <div className="mt-4 text-lg leading-8 text-gray-600" 
           dangerouslySetInnerHTML={createHtmlString(featuredPost.excerpt)} 
      />
      <div className="pt-2 mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
        <div className="flex lg:pb-8">
          <YellowButton text='Continue reading' href={`blog/${featuredPost.slug}`} color='bg-blue-500' textColor='white' isBold={true} />
        </div>
      </div>
    </article>
  );
};