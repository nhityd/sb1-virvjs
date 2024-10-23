import React, { useState } from 'react'
import { X } from 'lucide-react'

interface PC {
  id: number
  name: string
  status: '利用可' | '利用中' | '利用不可'
  user?: string
  computerName?: string
  reservationEnd?: Date
  software: string
}

interface User {
  id: number
  name: string
  isAdmin: boolean
  computerName: string
}

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  onReserve: (startDate: Date, endDate: Date) => void
  pc: PC
  currentUser: User
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, onReserve, pc, currentUser }) => {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onReserve(new Date(startDate), new Date(endDate))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{pc.name}の予約</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">
              開始日時
            </label>
            <input
              type="datetime-local"
              id="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">
              終了日時
            </label>
            <input
              type="datetime-local"
              id="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            予約する
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReservationModal