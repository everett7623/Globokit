// app/tools/api-test/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const testApi = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      // 测试获取国家列表
      const response = await fetch('/api/holidays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'countries' })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const testHolidayApi = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      // 测试获取美国节假日
      const response = await fetch('/api/holidays?country=US&year=2025')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Holiday API 测试</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={testApi} disabled={loading}>
              测试获取国家列表
            </Button>
            <Button onClick={testHolidayApi} disabled={loading}>
              测试获取美国节假日
            </Button>
          </div>

          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>加载中...</span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>错误: {error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-2">
              <h3 className="font-semibold">API 响应:</h3>
              <pre className="bg-muted p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
