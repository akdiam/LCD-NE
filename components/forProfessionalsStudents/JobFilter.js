import { useState } from 'react';

export const JobFilter = ({ allJobs, allEmployers, setSelectedJobs }) => {
  const [selectedEmployers, setSelectedEmployers] = useState([]);

  const filterJobs = (newSelectedEmployers) => {
    const filteredJobs = [];
    if (newSelectedEmployers.length !== 0) {
      filteredJobs = allJobs.filter(job => newSelectedEmployers.includes(job.jobPosting.employer));
    } else {
      filteredJobs = allJobs;
    }

    return filteredJobs;
  };

  const handleOptionChange = (selectedEmployer) => {
    let newSelectedEmployers = [...selectedEmployers];
    if (!selectedEmployers.includes(selectedEmployer)) {
      newSelectedEmployers.push(selectedEmployer);
    } else {
      newSelectedEmployers = selectedEmployers.length !== 0 
        ? selectedEmployers.filter(employer => selectedEmployer !== employer)
        : selectedEmployers;
    }

    setSelectedJobs(filterJobs(newSelectedEmployers));
    setSelectedEmployers(newSelectedEmployers);
  };

  return (
    <div className='mb-8 bg-lcdGray border border-slate-300 shadow-md rounded-md'>
      <div className='text-xl font-semibold text-gray-600 pt-5 pb-2 px-4 lg:px-8'>Filter by employer</div>
      <div className='pb-3'>
        {allEmployers.map((employer, _) => (
          <div className="flex items-center my-2 px-4 lg:px-8" key={employer}>
            <button
              onClick={() => handleOptionChange(employer)}
              className={`${selectedEmployers.includes(employer) ? 'bg-blue-300' : 'bg-white hover:bg-gray-300'} font-bold py-2.5 px-2.5 rounded-md border mr-2`} 
            />
            <span className="flex items-center h-full font-thin text-sm text-gray-600">
              {employer}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};