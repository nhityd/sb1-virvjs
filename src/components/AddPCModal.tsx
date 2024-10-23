import React, { useState } from 'react'
import { X } from 'lucide-react'

interface AddPCModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (newPC: { name: string; status: '利用可' | '利用中' | '利用不可'; software: string }) => void
}

const AddPCModal: React.FC<AddPCModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'利用可' | '利用中' | '利用不可'>('利用可')
  const [software, setSoftware] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ name, status, software })
    setName('')
    setStatus('利用可')
    setSoftware('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">新しいPCを追加</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              PC名
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
              ステータス
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value as '利用可' | '利用中' | '利用不可')}
              required
            >
              <option value="利用可">利用可</option>
              <option value="利用中">利用中</option>
              <option value="利用不可">利用不可</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="software" className="block text-gray-700 font-bold mb-2">
              インストール済みソフトウェア
            </label>
            <textarea
              id="software"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            追加
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPCModal