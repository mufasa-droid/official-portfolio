import { listMedia } from '@/app/admin/actions/media'
import { MediaLibraryView } from '@/components/admin/media/media-library-view'

export default async function AdminMediaPage() {
  const { files } = await listMedia()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground">
          Media Library & Asset Storage
        </h1>
        <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
          Upload and manage project case study screenshots, gallery assets, diagrams, and cover graphics.
        </p>
      </div>

      <MediaLibraryView initialFiles={files} />
    </div>
  )
}
