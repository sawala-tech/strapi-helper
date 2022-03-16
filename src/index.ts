import { Uploader } from './uploader'

import type { Upload, BulkUpload } from '@sawala-tech/strapi-helper'

interface BaseInterface {
  upload: Upload
  bulkUpload: BulkUpload
}

class Base implements BaseInterface {
  upload: Upload = async (file, callback) => {
    const uploader = new Uploader(file, callback)
    return await uploader.upload()
  }
  bulkUpload: BulkUpload = async (files, callback) => {
    const uploader = new Uploader(files, callback)
    return await uploader.bulkUpload()
  }
}

export const Strapi = new Base()
