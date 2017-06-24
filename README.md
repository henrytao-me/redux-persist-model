# redux-persist-model

Immutable Model for Redux Persist

## Installation

```node
npm install redux-persist-model --save
```

## Usages

### Define Model

```node
// User.js
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

### User Model

```node
const user = new User({
  id: 'some-user-id',
  firstName: 'user-first-name',
  lastName: 'user-last-name',
  username: 'user-name'
})
```

### Integrate with redux-persist




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