'use client'

import { useState } from 'react'

export default function PinyinPage() {
  const [text, setText] = useState('')
  
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">中文转拼音（测试版）</h1>
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="输入测试文字"
        />
        <p className="mt-4">你输入了：{text}</p>
      </div>
    </div>
  )
}
