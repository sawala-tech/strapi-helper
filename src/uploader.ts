import { Media, MediaCallback } from '@sawala-tech/strapi-helper'

type UploaderFn = (file: File) => Promise<Media | null>
export class Uploader {
  public file: File | File[]
  public callback?: MediaCallback
  private url: string

  constructor(file: File | File[], callback?: MediaCallback) {
    this.file = file
    this.callback = callback
    this.url = `${process.env.STRAPI_API_URL || "http://localhost:1337"}/api/upload`
  }

  private uploader: UploaderFn = async (file) => {
    const formData = new FormData()
    formData.append("files", file)
    return await fetch(this.url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch(() => null)
  }

  public upload = async () => {
    if (!this.file) return
    const files = Array.isArray(this.file) ? (this.file as File[])?.[0] : this.file
    this.uploader(files)
      .then((data) => this.callback && this.callback(data))
      .catch(() => this.callback && this.callback(null))
  }

  public bulkUpload = async () => {
    if (!this.file) return
    const files = !Array.isArray(this.file) ? [this.file] : this.file
    const promises = []
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      promises.push(this.uploader(file))
    }
    Promise.all(promises)
      .then((results) => {
        if (results?.length === 0) {
          this.callback && this.callback(null)
          return
        }
        this.callback && this.callback(results)
      })
      .catch(() => {
        this.callback && this.callback(null)
      })
  }
}
