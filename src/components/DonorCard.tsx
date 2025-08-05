import { User, Calendar, TreePine } from 'lucide-react'

interface DonorCardProps {
  fullName: string
  amount: number
  treeCount: number
  createdAt: Date
  ngoName: string
}

export default function DonorCard({ fullName, amount, treeCount, createdAt, ngoName }: DonorCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-green-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-full">
          <User className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{fullName}</h3>
          <p className="text-sm text-gray-600">{ngoName}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <TreePine className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-600">{treeCount} ağaç</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-600">{formatDate(createdAt)}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-lg font-bold text-green-600">
          {amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
        </p>
      </div>
    </div>
  )
} 