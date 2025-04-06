import { Link } from 'lucide-react'
import { YourLinks } from './_components/your-links'
import { CreateNewLink } from './_components/create-new-link'

export default function Home() {
  return (
    <main className="w-full h-dvh flex">
      <div className="w-full lg:max-w-[80%] lg:m-auto px-4 py-10 lg:py-0 ">
        <div className="w-full flex items-center justify-center lg:justify-start gap-2 mb-10">
          <Link size={30} />
          <span className="text-4xl">Brev.ly</span>
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:gap-10 gap-4">
          <div className="w-full ">
            <CreateNewLink />
          </div>
          <div className="w-full">
            <YourLinks />
          </div>
        </div>
      </div>
    </main>
  )
}
