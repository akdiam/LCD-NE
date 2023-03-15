export default function PageHeader({ name, headerBackgroundImageClass }) {
  return (
    <div className={`${headerBackgroundImageClass} bg-cover bg-center pb-20 pt-40 sm:pb-36 sm:pt-56`}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-normal text-white text-opacity-50">{name}</h2>
      </div>
    </div>
  )
}