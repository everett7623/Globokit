// 名称: 外贸邮件话术库
// 描述: 按业务场景检索常用外贸英文邮件话术并一键复制
// 路径: Globokit/app/tools/email-phrase-library/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-16

'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { MobileFriendlyWrapper, MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'
import { EMAIL_PHRASE_SCENARIOS, searchPhrases } from './email-phrase-data'

export default function EmailPhraseLibraryPage() {
  const [scenarioId, setScenarioId] = useState(EMAIL_PHRASE_SCENARIOS[0].id)
  const [keyword, setKeyword] = useState('')

  const filtered = useMemo(() => searchPhrases(EMAIL_PHRASE_SCENARIOS, keyword), [keyword])
  const activeScenario = filtered.find((scenario) => scenario.id === scenarioId) ?? filtered[0]

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">外贸邮件话术库</h1>
        <p className="text-muted-foreground">常用外贸英文邮件模板，覆盖开发、报价、订单、收款与售后场景，占位符替换后即可发送</p>
      </div>

      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索场景或话术关键词，如 催款 / quotation / inspection"
            className="h-11 pl-10"
          />
        </div>
        <MobileButtonGroup>
          {EMAIL_PHRASE_SCENARIOS.map((scenario) => (
            <Button
              key={scenario.id}
              type="button"
              variant={activeScenario && scenario.id === activeScenario.id ? 'default' : 'outline'}
              onClick={() => setScenarioId(scenario.id)}
            >
              {scenario.label}
            </Button>
          ))}
        </MobileButtonGroup>
      </div>

      {!activeScenario ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">没有匹配“{keyword}”的话术，试试其他关键词</CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">{activeScenario.description}</p>
          {activeScenario.phrases.map((phrase) => (
            <Card key={phrase.id}>
              <CardHeader>
                <CardTitle className="text-base">{phrase.subject}</CardTitle>
                <CardDescription>{phrase.note}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted/50 p-4 font-mono text-sm leading-relaxed">{phrase.body}</pre>
                <MobileButtonGroup>
                  <EnhancedCopyButton text={phrase.body}>复制正文</EnhancedCopyButton>
                  <EnhancedCopyButton text={phrase.subject.replace('Subject: ', '')}>复制主题</EnhancedCopyButton>
                </MobileButtonGroup>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </MobileFriendlyWrapper>
  )
}
