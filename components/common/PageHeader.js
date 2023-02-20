export default function PageHeader({ name }) {
  return (
    <div className="bg-slate-900 py-24 sm:py-32 mb-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-6xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{name}</h2>
        </div>
      </div>
    </div>
  )
}