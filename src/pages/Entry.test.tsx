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
    expect(html).toContain('Every no is a')
    expect(html).toContain('0<span class="text-white/40"> / 2,000</span>')
    expect(data.get('dream2000_visited')).toBe('1')
  })

  it('skips the landing page on later visits', () => {
    data.set('dream2000_visited', '1')
    const html = page('/')
    expect(html).not.toContain('Every no is a')
  })

  it('always shows the landing page at /welcome', () => {
    data.set('dream2000_visited', '1')
    expect(page('/welcome')).toContain('Every no is a')
  })

  it('shows the saved counter and has working Open Dashboard links', () => {
    data.set('dream2000_count', '42')
    const html = page('/welcome')
    expect(html).toContain('42<span class="text-white/40"> / 2,000</span>')
    expect(html.match(/href="\/dashboard"/g)!.length).toBe(3) // nav, hero button, closing button
    expect(html).not.toMatch(/type="email"/)
  })

  it('has no empty video frames: the hero is the only video', () => {
    const html = page('/welcome')
    expect(html.match(/<video/g)).toHaveLength(1)
    expect(html).toContain('Example') // the pattern card is labelled (shown in capitals)
    expect(html).toContain('0 no&#x27;s logged yet')
  })
})
