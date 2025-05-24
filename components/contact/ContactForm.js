import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function ContactForm() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2" />
      </div>
      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
        <div className="py-16 px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">LCD Contact form</h2>
            <p className="mt-3 text-lg leading-6 text-gray-500">
              Contact us via email below, or sign up for our mailing list with the sign-up form.
            </p>
            <dl className="mt-8 text-base text-gray-500">
              <div>
                <dt className="sr-only">Postal address</dt>
                <dd>
                  <p>Hartford, CT</p>
                </dd>
              </div>
              <div className="mt-6">
                <dt className="sr-only">Phone number</dt>
                <dd className="flex">
                  <PhoneIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">+1 (860) 785-3075</span>
                </dd>
              </div>
              <div className="mt-3">
                <dt className="sr-only">Email</dt>
                <dd className="flex">
                  <EnvelopeIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">contact@lcd-ne.org</span>
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-base text-gray-500">
              Looking for careers?{' '}
              <a href="/for-professionals-students" className="font-medium text-gray-700 underline">
                View all job openings
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}