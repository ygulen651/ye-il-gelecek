import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
}

export default function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-green-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="p-3 bg-green-100 rounded-full">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
      </div>
    </div>
  )
} 