import React from 'react'
import { Link } from 'react-router-dom'
import { Monitor } from 'lucide-react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
            <Monitor className="w-6 h-6 mr-2" />
            共有PC予約システム
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600">ダッシュボード</Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">ログイン</Link>
            <Link to="/admin" className="text-gray-600 hover:text-blue-600">管理者</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar