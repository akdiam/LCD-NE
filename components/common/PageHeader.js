export default function PageHeader({ title, subtitle, headerBackgroundImageClass, subtitleSize, maxWidth }) {
  return (
    <div className={`${headerBackgroundImageClass} bg-cover bg-center pb-24 pt-40 sm:pb-36 sm:pt-56`}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-xl sm:text-3xl font-semibold tracking-normal text-white text-opacity-50 pb-1">{title}</h2>
        <p className={`text-white ${subtitleSize} font-bold ${maxWidth}`}>{subtitle}</p>
      </div>
    </div>
  )
}