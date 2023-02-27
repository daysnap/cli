import Metalsmith from 'metalsmith'

export interface MetalsmithHandleOptions {
  name: string
  files: Metalsmith.Files
  metalsmith: Metalsmith
}
