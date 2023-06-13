import { createHtmlString } from '../../util/wordpressUtil.js';

export default function PostExcerpt({ post }) {
  const isoDate = formatTimestamp(post.date);

  return (
    <article key={post.slug} className="border border-gray-300 rounded-md p-4 py-12 mb-4">
      <div className="group relative">
        <time dateTime={isoDate} className="block text-sm leading-6 text-gray-600">
          {isoDate}
        </time>
        <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
          <a href={`blog/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h2>
        <div className="mt-4 text-sm leading-6 text-gray-600" 
             dangerouslySetInnerHTML={createHtmlString(post.excerpt)} 
        />
      </div>
    </article>
  )
};

const formatTimestamp = (timestamp) => {
  // Parse the timestamp into a Date object
  const date = new Date(timestamp);

  // Format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}