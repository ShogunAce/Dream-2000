import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function OpenDashboardButton({ label = 'Enter my cockpit' }: { label?: string }) {
  return (
    <Link
      to="/dashboard"
      className="bg-white text-black rounded-full pl-8 pr-3 py-3 text-sm font-medium inline-flex items-center gap-4 hover:bg-white/90 transition-colors"
    >
      {label}
      <span className="size-9 rounded-full bg-black text-white flex items-center justify-center">
        <ArrowRight size={20} />
      </span>
    </Link>
  )
}
