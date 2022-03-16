declare module "@sawala-tech/strapi-helper" {
  interface Media {
    alternativeText?: string
    caption?: string
    createdAt: Date | string
    ext: string
    formats: Record<string, string>
    hash?: string
    height?: number
    mime?: string
    name?: string
    previewUrl?: string
    provider?: string
    provider_metadata?: string
    size?: number
    updatedAt?: Date | string
    url?: string
    width?: number
  }
  type MediaCallback = (res?: Media | null | Media[] | (Media | null)[]) => void
  type Upload = (file: File, callback?: MediaCallback) => Promise<void>
  type BulkUpload = (file: File[], callback?: MediaCallback) => Promise<void>

  class Base {
    /**
     * Upload single file
     * @param file - Single file
     * @param callback - Define callback when upload is complete, return null if error
     * @returns callback
     */
    upload: Upload
    /**
     * Upload multiple files at once
     * @param files - Array of files
     * @param callback - Define callback when upload is complete, return null if error
     * @returns Promise<callback>
     */
    bulkUpload: BulkUpload
  }
  export const Strapi: Base
}
