export class QmzDBStorage {
  db: any
  dbName: string
  _events_: any
  setTimers: any
  setPromises: any
  constructor(name) {
    this.db = ''
    this.dbName = name
    this._events_ = {}
    this.setTimers = {}
    this.setPromises = {}
  }
  // 打开db
  open(name) {
    return new Promise((resolve, reject) => {
      try {
        const openDB = window.indexedDB.open(name)
        openDB.onerror = function() {
          resolve(false)
        }
        openDB.onupgradeneeded = event => {
          const db = (event.target as any).result
          const dbStorate = db.createObjectStore(name, { keyPath: 'id' })
          dbStorate.createIndex('value', 'value', { unique: true })
        }
        openDB.onsuccess = (event) => {
          const db = (event.target as any).result
          this.db = db
          this.dbName = name
          resolve(this)
        }
      } catch(e) {reject(e)}
    })
  }
  // 创建事务
  createTransaction(type = 'readwrite') {
    return this.db.transaction([this.dbName], type)
      .objectStore(this.dbName)
  }
  // 读取数据
  get(name) {
    return new Promise(async(resolve) => {
      try {
        await this.open(this.dbName)
        const request = this.createTransaction('readonly').get(name)
        request.onerror = (error) => {
          console.log(error.target.error.message)
          resolve(false)
        }
        request.onsuccess = e => {
          resolve(e.target.result && e.target.result.value || null)
        }
      } catch(e) {
        resolve(null)
      }
    })
  }
  // 存储数据
  async set(name, value) {
    await this.remove(name)
    await this.add(name, value)
    this.$emit(name, value)
  }
  // 新增数据
  add(name, value) {
    return new Promise(async(resolve) => {
      try {
        await this.open(this.dbName)
        const request = this.createTransaction().add({
          id: name,
          value
        })
        request.onsuccess = () => {
          resolve(this)
        }
        request.onerror = () => {
          resolve(false)
        }
      } catch(e) {
        resolve(false)
      }
    })
  }
  // 删除数据
  remove(name) {
    return new Promise(async(resolve) => {
      try {
        await this.open(this.dbName)
        const request = this.createTransaction().delete(name)
        request.onsuccess = () => {
          resolve(true)
        }
        request.onerror = () => {
          resolve(false)
        }
      } catch(e) {
        resolve(false)
      }
    })
  }
  // 清空
  clear(noClearArr) {
    return new Promise(async(resolve) => {
      try {
        const keys:any = await this.getAllKeys()
        let clearKeys = keys
        if (Array.isArray(noClearArr)) {
          clearKeys = keys.filter(e => !noClearArr.includes(e))
        }
        clearKeys.forEach(k => {
          this.remove(k)
        })
      } catch(e) {
        resolve(false)
      }
    })
  }
  // 获取所有keys
  getAllKeys() {
    return new Promise(async(resolve) => {
      try {
        await this.open(this.dbName)
        const request = this.createTransaction().getAllKeys()
        request.onsuccess = () => {
          resolve(request.result || [])
        }
        request.onerror = error => {
          console.log(error.target.error.message)
          resolve([])
        }
      } catch(e) {
        resolve([])
      }

    })
  }
  // 监听数据变动
  watch(name, fn) {
    if (name && typeof fn === 'function') {
      if (!this._events_[name]) {
        this._events_[name] = []
      }
      this._events_[name].push(fn)
    }
    return () => {
      (this._events_[name] = this._events_[name].filter(e => e !== fn))
    }
  }
  $emit(name, value) {
    if (this._events_[name] && Array.isArray(this._events_[name])) {
      this._events_[name].forEach(fn => {
        fn(value);
      });
    }
  }
}

export default function CreateQmzDBStore(name: string) {
  return new QmzDBStorage(name)
}