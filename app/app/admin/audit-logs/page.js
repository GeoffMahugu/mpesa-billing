'use client'
import { Table, Input, Select, Button, SelectItem } from '@/components/ui'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAuditLogs } from '@/lib/db'

export default function AuditLogsPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin?callbackUrl=/admin/audit-logs')
    }
  })

  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    actor: ''
  })

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      redirect('/')
    }

    const fetchLogs = async () => {
      try {
        const result = await getAuditLogs(filters)
        setLogs(result)
      } catch (error) {
        console.error('Failed to fetch audit logs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [filters, session])

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  if (loading) return <div>Loading audit logs...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>
      
      <div className="flex gap-4 mb-6">
        <Input
          label="Search"
          placeholder="Filter logs..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <Select
          label="Action"
          placeholder="Filter by action"
          value={filters.action}
          onChange={(e) => handleFilterChange('action', e.target.value)}
        >
          <SelectItem value="create">Create</SelectItem>
          <SelectItem value="update">Update</SelectItem>
          <SelectItem value="delete">Delete</SelectItem>
        </Select>
        <Select
          label="Actor"
          placeholder="Filter by user"
          value={filters.actor}
          onChange={(e) => handleFilterChange('actor', e.target.value)}
        >
          {Array.from(new Set(logs.map(log => log.actorId))).map(id => (
            <SelectItem key={id} value={id}>{id}</SelectItem>
          ))}
        </Select>
        <Button onClick={() => setFilters({ search: '', action: '', actor: '' })}>
          Clear Filters
        </Button>
      </div>

      <Table aria-label="Audit logs">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Actor</th>
            <th>Action</th>
            <th>Target</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.actorId}</td>
              <td>{log.action}</td>
              <td>{log.target}</td>
              <td>{JSON.stringify(log.meta)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
