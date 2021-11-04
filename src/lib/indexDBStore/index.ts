class DBStorage {
  db: any
  dbName: string
  constructor(name: string) {
    this.db = ''
    this.dbName = name
  }
  // 打开db
  open(name: string) {
    return new Promise((resolve) => {
      const openDB = window.indexedDB.open(name)
      openDB.onerror = function(error: any) {
        console.log(error?.target?.error?.message)
        resolve(false)
      }
      openDB.onupgradeneeded = (event: any) => {
        const db = event?.target?.result
        const dbStorate = db.createObjectStore(name, { keyPath: 'id' })
        dbStorate.createIndex('value', 'value', { unique: true })
      }
      openDB.onsuccess = (event: any) => {
        const db = event.target.result
        this.db = db
        this.dbName = name
        resolve(this)
      }
    })
  }
  // 创建事务
  createTransaction(type:any = 'readwrite') {
    return this.db.transaction([this.dbName], type)
      .objectStore(this.dbName)
  }
  // 存储数据
  async set(name:string, value:any) {
    await this.remove(name)
    await this.add(name, value)
  }
  // 新增数据
  add(name, value) {
    return new Promise(async(resolve) => {
      await this.open(this.dbName)
      const request = this.createTransaction().add({
        id: name,
        value
      })
      request.onsuccess = () => {
        resolve(this)
      }
      request.onerror = (error: any) => {
        console.log(error?.target?.error?.message)
        resolve(false)
      }
    })
  }
  // 读取数据
  get(name) {
    return new Promise(async(resolve) => {
      await this.open(this.dbName)
      const request = this.createTransaction('readonly').get(name)
      request.onerror = (error: any) => {
        console.log(error?.target?.error?.message)
        resolve(false)
      }
      request.onsuccess = (e:any) => {
        resolve(e?.target?.result && e?.target?.result?.value || null)
      }
    })
  }
  // 删除数据
  remove(name) {
    return new Promise(async(resolve) => {
      await this.open(this.dbName)
      const request = this.createTransaction().delete(name)
      request.onsuccess = () => {
        resolve(true)
      }
      request.onerror = error => {
        console.log(error.target.error.message)
        resolve(false)
      }
    })
  }
  // 清空
  clear(noClearArr: any) {
    return new Promise(async(resolve) => {
      const keys:any = await this.getAllKeys()
      let clearKeys = keys
      if (Array.isArray(noClearArr)) {
        clearKeys = keys.filter((e: any) => !noClearArr.includes(e))
      }
      Array.isArray(clearKeys) && clearKeys.forEach((k:any) => {
        this.remove(k)
      })
      resolve(true)
    })
  }
  // 获取所有keys
  getAllKeys() {
    return new Promise(async(resolve) => {
      await this.open(this.dbName)
      const request = this.createTransaction().getAllKeys()
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = (error:any) => {
        console.log(error.target.error.message)
        resolve([])
      }
    })
  }
}

export default function CreateDBStore(name: string) {
  return new DBStorage(name)
}