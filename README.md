# redux-persist-model

Immutable Model for Redux Persist - backed by [Record Immutable](https://facebook.github.io/immutable-js/docs/#/Record)

## Installation

```js
npm install redux-persist-model --save
```

## Sample app 

Checkout [https://github.com/henrytao-me/react-native-workshop](https://github.com/henrytao-me/react-native-workshop)


## Usages

### Define Model

```js
// user.js
import { Model } from 'redux-persist-model'

const Base = Model.create('User', {
  id: undefined,
  firstName: 'default-value',
  lastName: 'default-value',
  username: 'default-value'
})

export default class User extends Base {
  
  getFullName() {
    return `${this.firstName} ${this.lastName}` 
  }
}
```

### Use Model

```js
const user = new User({
  id: 'some-user-id',
  firstName: 'user-first-name',
  lastName: 'user-last-name',
  username: 'user-name'
})

user.firstName
user.lastName
user.getFullName()
user.get('firstName')
user.get('firstName', 'default-value')
```

### Integrate with redux-persist using applyModelTransform

```js
// store.js
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import { applyModelTransform } from 'redux-persist-model'

import UserModel from './user'

const MODELS = [UserModel, ...SomeOtherModels]
const STORE = ...

persistStore(STORE, {
  storage: AsyncStorage,
  transforms: [applyModelTransform(MODELS)]
})
```

### Lazy load component with PersistModelProvider

If you want to wait until redux-persist is rehydrated before rendering components to UI, you can use `PersistModelProvider`

```js
// store.js
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import { applyModelTransform, PersistModelProvider } from 'redux-persist-model'

import UserModel from './user'

const MODELS = [UserModel, ...SomeOtherModels]
const STORE = ...

persistStore(STORE, {
  storage: AsyncStorage,
  transforms: [applyModelTransform(MODELS)]
}, () => PersistModelProvider.rehydrated())

// main.js
import { Provider } from 'react-redux'
import { PersistModelProvider } from 'redux-persist-model'

import HomeComponent './home'

export default class Main extends PureComponent {

  render() {
    return (
      <Provider store={STORE}>
        <PersistModelProvider>
          <HomeComponent />
        </PersistModelProvider>
      </Provider>
    )
  }
}
```


## License

    Copyright 2017 "Henry Tao <hi@henrytao.me>"

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.