export default function PageHeader({ name, headerBackgroundImageClass }) {
  return (
    <div className={`${headerBackgroundImageClass} bg-cover bg-center pb-20 pt-40 sm:pb-36 sm:pt-56`}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-white">{name}</h2>
      </div>
    </div>
  )
}