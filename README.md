
##### Название проекта:

Личный дашборд Smartapp.

##### Цель проекта: 

Изучить особенности разработки Smartapp, применить на практике smartapp-sdk и другие средства разработки, ознакомиться с принятой в компании структурой проектов.

##### Краткое описание функционала:
Личный дашборд, в котором пользователь может закрепить нужные ему сервисы, чаты, контакты и открыть смартапп, чат или карточку контакта из приложения.

В дашборде имеется возможность поиска и сортировки сущностей. Сортировка реализована через drag-and-drop. Приложение реализуется под мобильные устройства и десктоп.

****Описание [API](https://test-smartapp.rndteam.ccstest.ru/docs).****
****Стек технологий:**** TS+React+React-Router+Redux+Saga+react-beautiful-dnd+react-slick+reactjs-popup.

Bot Huid&SmartApp ID: c069df87-a345-5a42-8b4f-289927f97577.
Имя бота: Test dashboard smartapp.

Чтобы проект запустился в среде разработки web-dev, необходимо использовать метод ready(). 
Метод ready – обязательный метод, сигнализирующий успешную загрузку SmartApp, он должен быть использован первым.

    Вызов метода с помощью SmartApp SDK:

     import { ready } from '@expressms/smartapp-sdk'
 
     ready()
Все клиентские и botx-овские методы реализуются через Redux Saga (в том числе метод ready).

#### Главный экран

Платформа задается параметром в адресной строке (например: "http://localhost:3000?**platform=web**").
Для идентификации платформы в смартаппе необходимо использовать хук useQuery, который импортируется из библиотеки smartapp-sdk (Пример использования: "const { platform, theme } = useQuery()").
Получение закрепленных сервисов/чатов/контактов происходит через botx при помощи запроса dashboard.get.
Каждый чат или контакт должен иметь иконку, поясняющую тип элемента (внешний/корпоративный/чат-бот и т.д.).

#### Экран поиска

Поиск по сервисам, чатам и контактам реализуется раздельно (разными методами):
- Поиск по сервисам происходит через botx при помощи метода services.get и параметра querySearch.
- Поиск по чатам происходит через клиентский метод getChats.
- Поиск по контактам происходит через клиентский метод searchCorporatePhonebook.


Поиск производится по строке длинной минимум 3 символа. Запуск поиска происходит по событию формы onSubmit.
Каждый элемент имеет кнопку добавления в сохраненные. Если элемент уже сохранен, кнопка заменяется на удаление.
Добавление и удаление происходит через botx при помощи методов dashboard.post и dashboard.delete (подробнее в документации API бота).
При добавлении контакта мы передаем в запросе весь объект, в котором, на верхнем уровне, должно присутствовать поле userHuid.
Его берем из массива contacts самого контакта и таким образом поднимаем userHuid на верхний уровень.
В дальнейшем, при получении контакта, как сохраненного, его userHuid будет уже на верхнем уровне.
Максимальное количество сохраненных элементов в группе не может превышать 9.

#### Экран настроек:

На экране настроек производится сортировка элементов. Она реализуется через библиотеку react-beautiful-dnd. Перемещение сущности возможно только в рамках своей группы.
Для сохранения состояния используется обработчик события onDragEnd библиотеки react-beautiful-dnd.
При наступлении события выполняется callback функция, которая сохраняет порядок локально и дергает соответствующую сагу.
Изменение порядка сервисов/чатов/контактов происходит при помощи dashboardOrdering.patch метода botx. В параметрах передается тип сущности и массив, описывающий новый порядок (подробнее в документации API бота).
После удаления элемент должен исчезать из списка.

#### Крайние состояния:

Если сохраненные/искомые элементы в группе отсутствуют, сама группа не отображается.
При достижении максимального количества элементов в группе, после попытки добавления элемента должен возникать попап с соответствующим сообщением.
В случае, если сохраненных элементов нет, главная страница и страница настроек должна сигнализировать об этом и предлагать добавить элементы (со ссылкой на страницу поиска).
Если поиск не дал результата, на странице должно отобразиться соответствующее сообщение.

#### Реализация функционала взаимодействия с элементами на главной странице.

При нажатии на чат/сервис/контакт на клиенте должна открываться соответствующая сущность.
Для взаимодействия в Smartapp SDK существуют методы: openGroupChat, openContactCard, openSmartApp.  Каждый из этих методов принимает объект, в котором находится ID элемента.
Для чатов это - groupChatId, контактов - userHuid, сервисов - appId.

#### Кеширование контента
**Redux Persist** – это инструмент, который используется для бесшовного сохранения объекта состояния Redux приложения в AsyncStorage.

1. Первым шагом необходимо создать **Persist Store** для сохранения состояния Redux с помощью функции **persistStore**.
```
import { persistStore } from 'redux-persist'
import { configureStore } from '../redux/configureStore'
    
export const store = configureStore()
export const persistor = persistStore(store)
```

2. Вторым шагом необходимо обернуть корневой компонент приложения с помощью **PersistGate**.
```
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './helpers'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App history={history} />
        <MainLoader />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

3. Следующим шагом необходимо определить конфигурацию **Persist Config**, которую мы передадим в persistStore для настройки сохранения состояния стора.
```
import storage from 'redux-persist/lib/storage'

const dashboardPersistConfig = {
  key: 'dashboard',
  storage,
  whitelist: ['services', 'chats', 'contacts'],
  blacklist: ['searchResults'],
}
```

4. После описания конфигурации Persist Config, ее необходимо передать в **Persist Reducer**.
```
import { persistReducer } from 'redux-persist'

const rootReducer = combineReducers<ApplicationState>({
  ui,
  router: connectRouter(historyRouter),
  dashboard: persistReducer(dashboardPersistConfig, dashboard) as any,
})
```

#### Кеширование статики
1. Первым шагом необходимо добавить новые зависимости в **devDependencies**.
```
"generate-json-webpack-plugin": "^2.0.0",
"react-app-rewired": "^2.2.1",
"zip-webpack-plugin": "^4.0.1",
```

2. Вторым шагом необходимо обновить **build-скрипт**.
```
"build": "react-app-rewired build"
```

3. Третьим шагом необходимо создать [**smartapp-manifest.json**](smartapp-manifest.json) файл в корне проекта и скопировать в него код, представленный ниже.
```
{
  "manifestVersion": "1.0.0",
  "smartAppVersion": "==filled automatically==",
  "bundlePath": "==filled automatically==",
  "changeLog": "Кеширование контента и статики"
}
```

* `manifestVersion` - константа (обязательно 1.0.0);
* `smartAppVersion` - текущая версия SmartApp в формате [**semver**](https://semver.org/lang/ru/); при обновлении данного параметра клиент скачивает новый bundle;
* `bundlePath` - путь к архиву со статикой SmartApp Frontend;
* `changeLog` - описание изменений в текущей версии SmartApp; данное описание будет выведено пользователю.

4. Четвертым шагом необходимо создать **config-overrides.js** файл в корне проекта и скопировать в него код из [**config-overrides.js файла**](config-overrides.js) для корректного использования библиотек, установленных на первом шаге.


