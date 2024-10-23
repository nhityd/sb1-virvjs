import React, { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react'
import ReservationModal from './ReservationModal'
import AddPCModal from './AddPCModal'
import Calendar from './Calendar'

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

interface Reservation {
  id: number
  title: string
  start: Date
  end: Date
  pcId: number
}

const Dashboard: React.FC = () => {
  const [pcs, setPCs] = useState<PC[]>([])
  const [selectedPC, setSelectedPC] = useState<PC | null>(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isAddPCModalOpen, setIsAddPCModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    // APIからPCデータを取得する（ここではモックデータを使用）
    const mockPCs: PC[] = [
      { id: 1, name: 'PC 1', status: '利用可', software: 'Office 365, Adobe Creative Suite' },
      { id: 2, name: 'PC 2', status: '利用中', user: '山田太郎', computerName: 'COMP-001', reservationEnd: new Date(new Date().setHours(23, 59, 59, 999)), software: 'AutoCAD, MATLAB' },
      { id: 3, name: 'PC 3', status: '利用不可', software: 'Visual Studio, Unity' },
    ]
    setPCs(mockPCs)

    // 現在のユーザー情報を取得（ここではモックデータを使用）
    const mockUser: User = {
      id: 1,
      name: '山田太郎',
      isAdmin: true,
      computerName: 'COMP-001'
    }
    setCurrentUser(mockUser)

    // 予約データを取得（ここではモックデータを使用）
    const mockReservations: Reservation[] = [
      { id: 1, title: 'PC 1 予約', start: new Date(2023, 4, 1, 10, 0), end: new Date(2023, 4, 1, 12, 0), pcId: 1 },
      { id: 2, title: 'PC 2 予約', start: new Date(2023, 4, 2, 14, 0), end: new Date(2023, 4, 2, 16, 0), pcId: 2 },
    ]
    setReservations(mockReservations)
  }, [])

  const openReservationModal = (pc: PC) => {
    setSelectedPC(pc)
    setIsReservationModalOpen(true)
  }

  const closeReservationModal = () => {
    setIsReservationModalOpen(false)
    setSelectedPC(null)
  }

  const openAddPCModal = () => {
    setIsAddPCModalOpen(true)
  }

  const closeAddPCModal = () => {
    setIsAddPCModalOpen(false)
  }

  const handleAddPC = (newPC: { name: string; status: '利用可' | '利用中' | '利用不可'; software: string }) => {
    const newId = Math.max(...pcs.map(pc => pc.id)) + 1
    setPCs([...pcs, { ...newPC, id: newId }])
    closeAddPCModal()
  }

  const handleReservation = (startDate: Date, endDate: Date) => {
    if (selectedPC && currentUser) {
      const newReservation: Reservation = {
        id: Math.max(...reservations.map(r => r.id)) + 1,
        title: `${selectedPC.name} 予約`,
        start: startDate,
        end: endDate,
        pcId: selectedPC.id
      }
      setReservations([...reservations, newReservation])
      setPCs(pcs.map(pc => {
        if (pc.id === selectedPC.id) {
          return { ...pc, status: '利用中', user: currentUser.name, computerName: currentUser.computerName, reservationEnd: endDate }
        }
        return pc
      }))
    }
    closeReservationModal()
  }

  const handleSelectEvent = (event: Reservation) => {
    const pc = pcs.find(p => p.id === event.pcId)
    if (pc) {
      setSelectedPC(pc)
      setIsReservationModalOpen(true)
    }
  }

  const handlePCStatusChange = (pc: PC) => {
    if (pc.status === '利用可' || (currentUser && (currentUser.isAdmin || currentUser.computerName === pc.computerName))) {
      const newStatus = pc.status === '利用可' ? '利用中' : '利用可'
      const updatedPCs = pcs.map(p => {
        if (p.id === pc.id) {
          const updatedPC = { ...p, status: newStatus }
          if (newStatus === '利用中') {
            updatedPC.user = currentUser?.name
            updatedPC.computerName = currentUser?.computerName
            updatedPC.reservationEnd = new Date(new Date().setHours(23, 59, 59, 999))
          } else {
            delete updatedPC.user
            delete updatedPC.computerName
            delete updatedPC.reservationEnd
          }
          return updatedPC
        }
        return p
      })
      setPCs(updatedPCs)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '利用中':
        return 'text-red-600'
      case '利用可':
        return 'text-blue-600'
      case '利用不可':
        return 'text-gray-600'
      default:
        return ''
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">共有PCダッシュボード</h1>
      {currentUser && (
        <p className="mb-4">ログインユーザー: {currentUser.name} ({currentUser.isAdmin ? '管理者' : '一般ユーザー'})</p>
      )}
      <div className="mb-4 flex justify-between items-center">
        {currentUser?.isAdmin && (
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={openAddPCModal}
          >
            <PlusCircle className="w-4 h-4 inline-block mr-2" />
            新しいPCを追加
          </button>
        )}
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarIcon className="w-4 h-4 inline-block mr-2" />
          {showCalendar ? 'リスト表示' : 'カレンダー表示'}
        </button>
      </div>
      {showCalendar ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pcs.map(pc => (
            <div key={pc.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">{pc.name}</h3>
              <Calendar
                events={reservations.filter(r => r.pcId === pc.id)}
                onSelectEvent={handleSelectEvent}
                pc={pc}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pcs.map(pc => (
            <div
              key={pc.id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handlePCStatusChange(pc)}
            >
              <h3 className="text-xl font-semibold mb-2">{pc.name}</h3>
              <p className="mb-1">
                ステータス: <span className={getStatusColor(pc.status)}>{pc.status}</span>
              </p>
              <p className="mb-1">利用者: {pc.user || '未使用'}</p>
              <p className="mb-1">コンピュータ名: {pc.computerName || 'N/A'}</p>
              <p className="mb-1">予約終了: {pc.reservationEnd ? pc.reservationEnd.toLocaleString() : 'N/A'}</p>
              <p className="mb-1">ソフトウェア: {pc.software}</p>
            </div>
          ))}
        </div>
      )}
      {selectedPC && currentUser && (
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={closeReservationModal}
          onReserve={handleReservation}
          pc={selectedPC}
          currentUser={currentUser}
        />
      )}
      {currentUser?.isAdmin && (
        <AddPCModal
          isOpen={isAddPCModalOpen}
          onClose={closeAddPCModal}
          onAdd={handleAddPC}
        />
      )}
    </div>
  )
}

export default Dashboard