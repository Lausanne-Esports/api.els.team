const Cache = new Map()

export default {
  has (key: string) {
    return Cache.has(key)
  },

  set (key: string, value:any) {
    return Cache.set(key, [value, Date.now()])
  },

  get (key: string) {
    return Cache.get(key)[0]
  },

  delete (key: string) {
    return Cache.delete(key)
  },

  clear () {
    return Cache.clear()
  },

  isExpired (key: string, seconds: number) {
    const [, timestamp] = Cache.get(key)

    return (Date.now() - timestamp) / 1000 > seconds
  },
}
