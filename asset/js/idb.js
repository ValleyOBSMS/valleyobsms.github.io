class IDB {
  constructor(dataBase) {
    this.name = dataBase;
  }

  // idb.version
  get version() {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        resolve(e.target.result.version);
        this.dataBases = e.target.result.objectStoreNames;
        e.target.result.close();
      };
      request.onerror = reject;
    });
  }

  // existing database
  exist(database) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let dataBases = e.target.result.objectStoreNames;
        e.target.result.close();
        for (let i = 0; i < dataBases.length; i++) {
          if (dataBases[i] === database) {
            resolve(true);
            return;
          }
        }
        resolve(false);
      };
      request.onerror = reject;
    });
  }

  // create new data base
  createDataBase(databaseName, option = { autoIncrement: true, keyPath: undefined}) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let version = e.target.result.version;
        let dataBases = e.target.result.objectStoreNames;
        e.target.result.close();
        for (let i = 0; i < dataBases.length; i++) {
          if (dataBases[i] == databaseName) {
            this.dataBase = databaseName;
            resolve(this.dataBase);
            return;
          }
        }
        let request2 = window.indexedDB.open(this.name, Number(version) + 1);
        request2.onsuccess = (e) => {
          this.dataBase = databaseName;
          resolve(this.dataBase);
          e.target.result.close();
        };
        request2.onerror = reject;
        request2.onupgradeneeded = (e) => {
          let db = e.target.result;
          db.createObjectStore(databaseName, option);
        };
      };
      request.onerror = reject;
    });
  }

  // add value
  add(value) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let db = e.target.result;
        let transaction = db
          .transaction([this.dataBase], "readwrite")
          .objectStore(this.dataBase);
        if (value.constructor.toString().indexOf("Array") >= 0) {
          value.forEach((data, index) => {
            let request = transaction.add(data);
            if (index == value.length - 1) {
              request.onsuccess = () => {
                resolve("success");
                db.close();
              };
            }
            request.onerror = (err) => {
              db.close();
              reject(err);
            };
          });
          db.close();
        } else {
          let request = transaction.add(value);
          request.onsuccess = () => {
            resolve("success");
            db.close();
          };
          request.onerror = (err) => {
            db.close();
            reject(err);
          };
        }
      };
    });
  }

  // delete value
  remove(key) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let db = e.target.result;
        let transaction = db
          .transaction([this.dataBase], "readwrite")
          .objectStore(this.dataBase);
        if (key.constructor.toString().indexOf("Array") >= 0) {
          key.forEach((data, index) => {
            let request = transaction.delete(data);
            if (index == key.length - 1) {
              request.onsuccess = () => {
                resolve("success");
                db.close();
              };
            }
            request.onerror = (err) => {
              db.close();
              reject(err);
            };
          });
          db.close();
        } else {
          let request = transaction.delete(key);
          request.onsuccess = () => {
            resolve("success");
            db.close();
          };
          request.onerror = (err) => {
            db.close();
            reject(err);
          };
        }
      };
    });
  }

  // get data
  get(key) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let db = e.target.result;
        let transaction = db
          .transaction([this.dataBase])
          .objectStore(this.dataBase);
        if (key.constructor.toString().indexOf("Array") >= 0) {
          let result = [];
          key.forEach((data, index) => {
            let request = transaction.get(data);
            request.onsuccess = (e) => {
              result.push(e.target.result);
              if (index == key.length - 1) {
                resolve(data);
                db.close();
              }
            };
            request.onerror = (err) => {
              db.close();
              reject(err);
            };
          });
          db.close();
        } else {
          let request = transaction.get(key);
          request.onsuccess = (e) => {
            resolve(e.target.result);
            db.close();
          };
          request.onerror = (err) => {
            db.close();
            reject(err);
          };
        }
      };
    });
  }

  // put value
  put(key, value) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let db = e.target.result;
        let transaction = db
          .transaction([this.dataBase], "readwrite")
          .objectStore(this.dataBase);
        let request = transaction.get(key);
        request.onsuccess = (e) => {
          let data = e.target.result;
          data = { ...data, ...value };
          let requestUpdate = transaction.put(data);
          requestUpdate.onsuccess = () => {
            resolve("success");
            db.close();
          };
          requestUpdate.onerror = (err) => {
            db.close();
            reject(err);
          };
        };
        request.onerror = (err) => {
          db.close();
          reject(err);
        };
      };
    });
  }

  // get All
  getAll() {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let db = e.target.result;
        let transaction = db
          .transaction(this.dataBase)
          .objectStore(this.dataBase);
        let request = transaction.getAll();
        request.onsuccess = (e) => {
          resolve(e.target.result);
          db.close();
        };
        request.onerror = (err) => {
          db.close();
          reject(err);
        };
      };
    });
  }

  // get All Values
  getAllValues(type) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let db = e.target.result;
        let transaction = db
          .transaction(this.dataBase)
          .objectStore(this.dataBase);
        let request = transaction.openCursor();
        const values = [];
        request.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            values.push(cursor.value[type]);
            cursor.continue();
          } else {
            resolve(values);
            db.close();
          }
        };
        request.onerror = (err) => {
          db.close();
          reject(err);
        };
      };
    });
  }

  // delete database
  delete() {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.deleteDatabase(this.name);
      request.onsuccess = (e) => {
        console.log(`Successfully Delete ${this.name} database!`);
        resolve("success");
      };

      request.onerror = reject;
    });
  }
}

export default IDB;
