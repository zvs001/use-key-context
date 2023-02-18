
Hook provides easy way to build keys for components. 
Approach helps to build unique keys in easy manner.
It can be useful for testing or id/key definition.

[![npm](https://img.shields.io/npm/v/use-key-context)](https://www.npmjs.com/package/use-key-context)

## Install

``yarn add use-key-context``

or 

```npm i -S use-key-context```

## Usage

Example with explanation how it works:

```tsx
import { useKeyContext, KeyContextProvider } from 'use-key-context'

function App() {
  return (
    <KeyContextProvider value={'app'}>
      <LoginPage />
    </KeyContextProvider>
  )
}

function LoginPage() {
  return (
    <KeyContextProvider value={'login'}>
      <LoginForm />
    </KeyContextProvider>
  ) 
}

function LoginForm() {
  const keyForBtn = useKeyContext('button')  // => app/login/button
  const keyForClose = useKeyContext('close') // => app/login/close
  const keyOfContext = useKeyContext()       // => app/login
  
  return (
    <div>
      <button id={keyForBtn} testID={keyForBtn}>login</button>
      <button id={keyForClose} testID={keyForClose}>cancel</button>
    </div>
  )
}
```


#### How it would work with lists?

```tsx
function Users() {
  return (
    <KeyContextProvider value={'users'}>
      <UsersList />
    </KeyContextProvider>
  )
}

function UsersList() {
  const users = [
    { id: '1', name: 'user1' },
    { id: '2', name: 'user2' },
    { id: '3', name: 'user2' },
  ]

  // In case you don't have id key for item and you have to use index
  //   you can use prefix like next one
  const keyPrefixForListItem = useKeyContext('item')


  return users.map((user, index) => (
    <KeyContextProvider
      key={`${keyPrefixForListItem}-${index}`} // key like users/item-2
      value={index} // index might be useful for testing specific item
    >
      <UserItem name={user.name} />
    </KeyContextProvider>
  ))
}

function UserItem({ name }) {
  // => users/0/show-more
  // => users/1/show-more
  // => users/2/show-more
  const keyForShowMore = useKeyContext('show-more') 

  return (
    <div>
      {name}
      <button id={keyForShowMore} testID={keyForShowMore}>
        show more
      </button>
    </div>
  )
}

export default Users
```


