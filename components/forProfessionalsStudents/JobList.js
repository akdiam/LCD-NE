import { JobFilter } from "./JobFilter";

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
            <div className="shadow-md border border-slate-700 rounded-md w-full bg-blue-700 hover:bg-blue-900 transition duration-150 ease-in-out min-h-52 lg:h-72 text-left px-4 py-3 flex flex-col justify-around">
              <div className="text-xl lg:text-2xl text-white font-semibold tracking-wide pb-2">
                {job.title}
              </div>
              <div className="">
                <div className="text-lg lg:text-2xl font-bold text-yellow-300 pb-2">
                  {job.jobPosting.employer}
                </div>
                <div className="text-sm lg:text-lg font-normal text-white">
                  {job.jobPosting.jobType}
                </div>
                <div className="text-xs lg:text-sm font-thin text-white">
                  {job.jobPosting.jobLocation}
                </div>
                <div className="text-xs lg:text-sm font-thin text-gray-300">
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