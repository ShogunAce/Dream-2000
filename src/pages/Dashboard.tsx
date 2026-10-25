import { useStore } from '../lib/store'
import UploadPanel from '../components/dashboard/UploadPanel'
import MissionLog from '../components/dashboard/MissionLog'

export default function Dashboard() {
  const { missions, batchIds } = useStore()
  const batch = batchIds
    .map((id) => missions.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))

  return (
    <main className="min-h-screen bg-black px-6 py-10 max-w-3xl mx-auto">
      <h1 className="font-display text-5xl mb-8">Mission log</h1>
      {missions.length === 0 ? (
        <div className="liquid-glass rounded-3xl p-10 text-center">
          <p className="font-hud text-xl mb-6">No mission set yet</p>
          <UploadPanel hasMissions={false} />
        </div>
      ) : (
        <>
          <MissionLog missions={batch} />
          <div className="mt-8">
            <UploadPanel hasMissions />
          </div>
        </>
      )}
    </main>
  )
}
