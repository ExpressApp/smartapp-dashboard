---
sidebar_position: 8
---

# Шифрование кеша SmartApp

Для подключения шифрования кеша в SmartApp необходимо установить библиотеки crypto-js и idb-keyval, а затем скопировать приведенный ниже код. При этом следует заменить переменную secure на значение, соответствующее вашему проекту (эта переменная не должна быть уникально сгенерированной).

```typescript
import { del, get, set } from 'idb-keyval'
import CryptoJS from 'crypto-js'
import { clientStorageGet, clientStorageSet } from '@expressms/smartapp-sdk'
import { v4 } from 'uuid'

const DASHBOARD_SECURE_KEY = 'DASHBOARD_SECURE_KEY'
const SECURE_KEY_NAME = 'dashboardSmartAppSecureKey'

const encryptData = (data: string, secureKey: string) => CryptoJS.AES.encrypt(data, secureKey).toString()

const decryptData = (cipherText: string, secureKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secureKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

const saveToSessionStorage = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value)
    sessionStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error('Error saving to sessionStorage', error)
  }
}

const loadFromSessionStorage = (key: string) => {
  try {
    const serializedValue = sessionStorage.getItem(key)
    if (!serializedValue) return null
    return JSON.parse(serializedValue)
  } catch (error) {
    console.error('Error loading from sessionStorage', error)
  }
}

export const getPersistStorage = () => {
  return {
    getItem: async (idbkey: string) => {
      try {
        // Загружаем текущий защищенный ключ из sessionStorage
        const currentSecureKey = loadFromSessionStorage(DASHBOARD_SECURE_KEY)
        const encryptedData = await get(idbkey)
        // Если ключ загружен, расшифровываем данные
        if (currentSecureKey) return encryptedData ? decryptData(encryptedData, currentSecureKey) : null
        // Если ключ не найден, пытаемся получить его из clientStorage
        const { payload } = await clientStorageGet({ key: SECURE_KEY_NAME })
        const { value: secureKey } = payload
        // Если ключ найден, сохраняем его в sessionStorage и расшифровываем данные
        if (secureKey) {
          saveToSessionStorage(DASHBOARD_SECURE_KEY, secureKey)
          return encryptedData ? decryptData(encryptedData, secureKey as string) : null
        }
        // Если ключ не найден, создаем новый и сохраняем его
        const newSecureKey = v4()
        await clientStorageSet({ key: SECURE_KEY_NAME, value: newSecureKey })
        saveToSessionStorage(DASHBOARD_SECURE_KEY, newSecureKey)
        // Возвращаем null, так как данных нет
        return null
      } catch (error) {
        console.error('Error in getItem:', error)
        // Возвращаем null в случае ошибки
        return null
      }
    },
    setItem: async (idbkey: string, value: string | null) => {
      try {
        const secureKey = loadFromSessionStorage(DASHBOARD_SECURE_KEY)
        if (secureKey) {
          const encryptedValue = value ? encryptData(value, secureKey) : null
          return await set(idbkey, encryptedValue)
        }
      } catch (error) {
        console.error('Error in setItem:', error)
      }
    },
    removeItem: (key: string) => del(key),
  }
}
```

Функции encryptData и decryptData предназначены для работы с зашифрованными данными. Для расшифровки требуется ключ-дешифратор.

Требования к ключу-дешифратору:

1. Ключ должен быть уникальным для каждого пользователя.
2. Ключ должен быть инкапсулированным и не может быть объявлен в глобальном скоупе.
3. Ключ не должен генерироваться с использованием предсказуемых алгоритмов (например, Math.random).

Функции saveToSessionStorage и loadFromSessionStorage используются для взаимодействия с сессионным хранилищем.

Функция getItem: при запуске приложения проверяется наличие ключа-дешифратора в sessionStorage. Если ключ найден, он используется для дешифровки данных. В случае его отсутствия, выполняется запрос к платформе с помощью метода [clientStorageGet](https://docs.express.ms/smartapps/developer-guide/smartapp-sdk/methods/storage/#clientstorageget). Если ключ получен, он сохраняется в sessionStorage, после чего данные дешифруются. Если платформа не предоставляет ключ, он устанавливается с помощью метода [clientStorageSet](https://docs.express.ms/smartapps/developer-guide/smartapp-sdk/methods/storage/#clientstorageset) и сохраняется в sessionStorage.

Функция setItem: при добавлении данных в кеш осуществляется проверка наличия ключа в хранилище. В отличии от getItem, данные шифруются перед записью в IndexDB, после чего возвращается результат операции.

Функция removeItem: для удаления записей дешифровка данных не требуется, взаимодействие происходит напрямую с IndexDB.

Функцию getPersistStorage необходмо вызывать для генерации хранилища в конфиге redux-persist для каждого слайса.

```javascript
import { getPersistStorage } from '../../utils/encryption'

const dashboardPersistConfig = {
  key: 'dashboardInfo',
  storage: getPersistStorage(),
  whitelist: ['services', 'chats', 'contacts'],
  blacklist: ['searchResults'],
}
```
