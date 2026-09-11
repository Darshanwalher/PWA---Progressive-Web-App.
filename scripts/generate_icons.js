import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import zlib from 'zlib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const iconsDir = path.resolve(__dirname, '../public/icons')

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// Function to generate a simple uncompressed PNG with pure JS/zlib
function createPng(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR chunk
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8 // bit depth
  ihdrData[9] = 2 // color type: truecolor RGB
  ihdrData[10] = 0 // compression
  ihdrData[11] = 0 // filter
  ihdrData[12] = 0 // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData)

  // IDAT chunk (raw RGB image data with scanline filter bytes)
  const rawData = []
  for (let y = 0; y < height; y++) {
    rawData.push(0) // filter type 0 (None)
    for (let x = 0; x < width; x++) {
      // Draw rounded blue square with white check icon
      const cx = width / 2
      const cy = height / 2
      const distBorder = Math.min(x, y, width - x, height - y)
      const radius = width * 0.15

      // Check mark coordinates normalized
      const nx = (x - cx) / (width * 0.5)
      const ny = (y - cy) / (height * 0.5)

      let isWhite = false

      // Draw check mark
      // Segment 1: from (-0.4, 0.0) to (-0.1, 0.35)
      // Segment 2: from (-0.1, 0.35) to (0.45, -0.35)
      const inSeg1 = Math.abs((ny - 0.0) - (nx - (-0.4)) * 1.16) < 0.1 && nx >= -0.42 && nx <= -0.05
      const inSeg2 = Math.abs((ny - 0.35) - (nx - (-0.1)) * -1.27) < 0.1 && nx >= -0.15 && nx <= 0.48

      if (inSeg1 || inSeg2) {
        isWhite = true
      }

      if (distBorder < 8) {
        // Darker blue border
        rawData.push(29, 78, 216)
      } else if (isWhite) {
        // White checkmark
        rawData.push(255, 255, 255)
      } else {
        // Sapphire blue background
        rawData.push(r, g, b)
      }
    }
  }

  const compressed = zlib.deflateSync(Buffer.from(rawData))
  const idatChunk = createChunk('IDAT', compressed)

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

function createChunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)

  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])

  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)

  return Buffer.concat([length, body, crc])
}

// Standard CRC32 table
const crcTable = []
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }
  crcTable[n] = c
}

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

// Generate 192x192 and 512x512 icons (RGB: 37, 99, 235 = #2563eb)
const icon192 = createPng(192, 192, 37, 99, 235)
const icon512 = createPng(512, 512, 37, 99, 235)

fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), icon192)
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), icon512)

console.log('Icons generated successfully: icon-192x192.png and icon-512x512.png')
