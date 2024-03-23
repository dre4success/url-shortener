import UrlModel from '../models/urlShortener'

function toBase62(num: bigint): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  let value = num

  while (value >= 62n) {
    const remainder = value % 62n
    result = characters[Number(remainder)] + result
    value = value / 62n
  }

  result = characters[Number(value)] + result
  return result
}

function generateTimestampBasedIdentifier(): bigint {
  const timestamp = BigInt(Date.now())
  const randomValue = BigInt(Math.floor(Math.random() * 1000))

  const identifier = timestamp * 1000n + randomValue
  return identifier
}

function getBase62String(): string {
  const identifier = generateTimestampBasedIdentifier()
  return toBase62(identifier)
}

export async function generateUniqueShortUrl(): Promise<string> {
  const dbModel = new UrlModel()
  let uniqueShortUrl = ''
  let isUnique = false

  while (!isUnique) {
    uniqueShortUrl = getBase62String()
    isUnique = await dbModel.isShortUrlUnique(uniqueShortUrl)
  }
  return uniqueShortUrl
}
