export default function PageHeader({ title, subtitle, headerBackgroundImageClass, subtitleSize, maxWidth, backLink=null, backText=null }) {
  return (
    <div className={`${headerBackgroundImageClass} bg-cover bg-center pb-24 pt-40 sm:pb-36 sm:pt-56`}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-xl sm:text-3xl font-semibold tracking-normal text-white text-opacity-50 pb-1">{title}</h2>
        <p className={`text-white ${subtitleSize} font-bold ${maxWidth}`}>{subtitle}</p>
        {backLink && backText && (
          <div className="pt-2 font-bold text-sm sm:text-xl">
            <a className="text-yellow-300" href={backLink}>{backText}</a>
          </div>
        )}
      </div>
    </div>
  )
}