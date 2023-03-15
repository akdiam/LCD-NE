import JobList from "../common/JobList";

export default function RecentJobsComponent() {
  return (
    <div className="w-full bg-slate-900">
      <div className="border-b border-gray-200 bg-slate-900 px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-semibold leading-6 text-white">Job Postings</h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              See all jobs
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl">
        <JobList />
      </div>
    </div>
  )
}