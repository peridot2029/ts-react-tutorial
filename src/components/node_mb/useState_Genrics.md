# TypeScript

## 1. `useState<number>` - Generics

`useState()`에 제네릭을 사용해서 해당 상태가 어떤 타입을 가졌는지 설정한다.  
이 경우 **제네릭을 생략하면 알아서 유추**하기 때문에 생략해도 된다.

```ts
import React, { useState } from 'react';

function Counter() {  
  const [count, setCount] = useState(0);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}
export default Counter;
```

`useState()`에 제네릭을 사용할 경우는 상태가 `null` 또는 상태의 타입이 까다로운 구조로  
객체, 배열 일 때 제네릭을 사용해서 명시하는 것이 좋다.

```ts
// state - null
type Information = { name: string; description: string };
const [info, setInformation] = useState<Information | null>(null);

// state - object
type Todo = { id: number; text: string; done: boolean };
const [todos, setTodos] = useState<Todo[]>([]);

// Type Assertion 문법 - 제네릭을 사용하지 않을 경우
type Todo = { id: number; text: string; done: boolean };
const [todos, setTodos] = useState([] as Todo[]);
```
