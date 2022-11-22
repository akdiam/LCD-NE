const EntityCard = ({ entity }) => {
  return (
    <a href={entity.url} className="m-2 md:m-4 max-w-48 max-h-48 shadow-lg hover:shadow-2xl ease-in duration-100 bg-white">
      <div className="p-4 md:p-6">
        <img className="shadow-lg flex shrink block m-auto w-full h-full" src={entity.logo.sourceUrl} alt={entity.name} />
      </div>
    </a>
  )
};

export default EntityCard;