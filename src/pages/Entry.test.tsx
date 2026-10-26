import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Entry from './Entry'
import Landing from './Landing'

function page(path: string) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/welcome" element={<Landing />} />
        <Route path="/dashboard" element={<p>DASHBOARD</p>} />
      </Routes>
    </MemoryRouter>,
  ).replaceAll('<!-- -->', '') // server rendering marks text boundaries with comments
}

describe('first-visit routing', () => {
  let data: Map<string, string>
  beforeEach(() => {
    data = new Map()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
    })
  })

  it('shows the landing page with 0 / 2,000 on a first visit and remembers the visit', () => {
    const html = page('/')
    expect(html).toContain('Chase 2,000')
    expect(html).toContain('0 / 2,000')
    expect(data.get('dream2000_visited')).toBe('1')
  })

  it('skips the landing page on later visits', () => {
    data.set('dream2000_visited', '1')
    const html = page('/')
    expect(html).not.toContain('Chase 2,000')
  })

  it('always shows the landing page at /welcome', () => {
    data.set('dream2000_visited', '1')
    expect(page('/welcome')).toContain('Chase 2,000')
  })

  it('shows the saved counter and has working Open Dashboard links', () => {
    data.set('dream2000_count', '42')
    const html = page('/welcome')
    expect(html).toContain('42 / 2,000')
    expect(html.match(/href="\/dashboard"/g)!.length).toBeGreaterThanOrEqual(5)
    expect(html).not.toMatch(/type="email"/)
  })
})
