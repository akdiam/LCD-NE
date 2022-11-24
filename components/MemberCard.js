const MemberCard = ({ member, isExec }) => {
  return (
    <button className="m-2 md:m-4 max-w-48 shadow-lg hover:shadow-2xl ease-in duration-100 bg-white">
      <div className="p-4 md:p-6">
        <img className="shadow-lg flex shrink block m-auto w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" src={member.headshotImage.sourceUrl} alt={member.name} />
      </div>
      {isExec && 
        <div className="text-center align-middle m-auto font-thin text-sm md:text-lg">
          {member.name}
        </div>
      }
      {!isExec && 
        <div className="text-center align-middle m-auto font-thin text-xs md:text-sm">
          {member.name}
        </div>
      }
      {member.lcdPositionTitle && (
        <div className="pb-10 text-center align-middle m-auto font-thin text-xs md:text-sm text-sky-700">
          {member.lcdPositionTitle && member.lcdPositionTitle}
        </div>
      )}
      <div className="pb-10 text-center align-middle m-auto font-thin text-xs md:text-sm text-slate-500 truncate">
        {member.company && member.company}
      </div>
    </button>
  )
};

export default MemberCard;