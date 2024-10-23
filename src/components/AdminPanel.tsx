import React, { useState } from 'react'
import { Settings, Users, Database } from 'lucide-react'

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('settings')

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">管理者パネル</h2>
      <div className="flex mb-6">
        <button
          className={`mr-4 px-4 py-2 rounded-md ${
            activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="w-4 h-4 inline-block mr-2" />
          システム設定
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded-md ${
            activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <Users className="w-4 h-4 inline-block mr-2" />
          ユーザー管理
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'backup' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('backup')}
        >
          <Database className="w-4 h-4 inline-block mr-2" />
          バックアップ
        </button>
      </div>
      <div>
        {activeTab === 'settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">システム設定</h3>
            {/* システム設定フォームをここに追加 */}
          </div>
        )}
        {activeTab === 'users' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">ユーザー管理</h3>
            {/* ユーザー管理インターフェースをここに追加 */}
          </div>
        )}
        {activeTab === 'backup' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">バックアップ管理</h3>
            {/* バックアップ管理インターフェースをここに追加 */}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel