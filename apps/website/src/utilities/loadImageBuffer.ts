import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

/**
 * Loads an image from the file system and returns it as a Buffer.
 * @param relativePath Path relative to the project root (e.g., 'public/images/photo.jpg')
 * @returns Buffer containing the image data
 */
export function loadImageBuffer(relativePath: string): Buffer {
  const imagePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(imagePath)
}

type FileResult = {
  name: string
  data: Buffer
  mimetype: string
  size: number
}

/**
 * Loads a local file and returns metadata + buffer.
 * @param relativePath Path relative to the project root (e.g., 'public/images/photo.jpg')
 */
export async function fetchFileFromDisk(
  relativePath: string,
  fileName?: string,
): Promise<FileResult> {
  const filePath = path.join(process.cwd(), relativePath)
  const data = fs.readFileSync(filePath)
  const name = fileName || path.basename(filePath)
  const mimetype = mime.lookup(filePath) || 'application/octet-stream'

  return {
    name,
    data,
    mimetype,
    size: data.byteLength,
  }
}
