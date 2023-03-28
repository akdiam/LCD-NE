export default function JobList({ jobs }) {
  // Create display-ready job posting date
  const calcDisplayPostDate = (job) => {
    const date = new Date(job.date);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="text-black mx-auto w-full py-2 lg:py-6">
      {jobs.map((job, _) => (
        <button className="my-2 px-4 lg:px-8 w-full" key={job.title}>
          <a href={job.jobPosting.applicationLink}>
            <div className="shadow-sm border-4 border-yellow-400 rounded-md w-full bg-white hover:bg-lcdGray min-h-52 text-left px-4 py-3 flex flex-col justify-around">
              <div className="text-lg lg:text-xl text-black font-semibold tracking-wide pb-2">
                {job.title}
              </div>
              <div className="">
                <div className="text-md lg:text-xl font-bold text-blue-600 pb-2">
                  {job.jobPosting.employer}
                </div>
                <div className="text-sm lg:text-md font-normal text-black">
                  {job.jobPosting.jobType}
                </div>
                <div className="text-xs lg:text-sm font-thin text-black">
                  {job.jobPosting.jobLocation}
                </div>
                <div className="text-xs lg:text-sm font-thin text-gray-700">
                  {`Posted on ${calcDisplayPostDate(job)}`}
                </div>
              </div>
            </div>
          </a>
        </button>
      ))}
    </div>
  );
}