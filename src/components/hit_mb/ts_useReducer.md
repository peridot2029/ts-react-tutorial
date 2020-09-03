# TypeScript - useReducer

## 1. useReducer를 사용해서 컴포넌트 구현

**Counter Component**를 useState() → useReducer()로 전환한다. `Action`은 `| (OR, 또는)` 연산자를 사용해서 타입을 명시 한다.  
`reducer`함수는 `state`의 타입과 반환 타입이 똑같다.

추후에 리듀서를 사용할 때에는 액션 안에 무엇이 들어 있는지 자동완성을 통해 알 수 있다. 추가적으로 새로운 액션을 디스패치 할 때에도 액션에 타입스크립트 타입 검사도 한다.

```ts
// src/components/Counter.tsx
import React, { useReducer } from 'react';

type Action = { type: 'INCREASE' } | { type: 'DECREASE' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandle action');
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });
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

## 2. 자동완성 및 타입 검사를 확인하기 위한 컴포넌트 구현

위에서 언급했듯이 자동완성 및 타입 검사를 확인하기 위해서 새로운 `ReducerSample Component`를 만들어서 구현했다. 코드를 작성하는 과정에서 **자동완성** 이 되고 필요한 값을 빠트리면 에러가 발생하는 걸 확인 가능하다. 또한 `State`를 정의하고, 이에 대한 타입도 정의 한다.

`Action` 타입을 정의함으로써 리듀서에 자동완성이 되어 개발에 편의성 더해주고 액션을 디스패치 할 때, 액션에 대한 타입 검사가 이루어지므로 사소한 실수를 사전에 방지할 수 있다.

```ts
// src/components/ReducerSample
import React, { useReducer } from 'react';
type Color = 'red' | 'orange' | 'yellow';

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};
type Action =
  | { type: 'SET_COUNT'; count: number }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'SET_COLOR'; color: Color }
  | { type: 'TOGGLE_GOOD' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count, // count가 자동완성 되며, number 타입 확인
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text, // text가 자동완성 되며, string 타입 확인
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color, // color가 자동완성 되며, Color 타입 확인
      };
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood,
      };
    default:
      throw new Error('Unhandled action');
  }
}

function ReducerSample() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: 'print text',
    color: 'red',
    isGood: true,
  });
  const setCount = () => dispatch({ type: 'SET_COUNT', count: 5 }); // count를 넣지 않으면 오류 발생
  const setText = () => dispatch({ type: 'SET_TEXT', text: 'byebye~' }); // text를 넣지 않으면 오류 발생
  const setColor = () => dispatch({ type: 'SET_COLOR', color: 'orange' }); // color를 넣지 않으면 오류 발생
  const toggleGood = () => dispatch({ type: 'TOGGLE_GOOD' });

  return (
    <div>
      <p>
        <code>count : </code>
        {state.count}
      </p>
      <p>
        <code>text : </code>
        {state.text}
      </p>
      <p>
        <code>color : </code>
        {state.color}
      </p>
      <p>
        <code>isGood : </code>
        {state.isGood ? 'true' : 'false'}
      </p>
      <div>
        <button onClick={setCount}>SET_COUNT</button>
        <button onClick={setText}>SET_TEXT</button>
        <button onClick={setColor}>SET_COLOR</button>
        <button onClick={toggleGood}>TOGGLE_GOOD</button>
      </div>
    </div>
  );
}

export default ReducerSample;
```

```ts
// src/App.tsx
import React from 'react';
import ReducerSample from './components/ReducerSample';

const App: React.FC = () => {
  return <ReducerSample />;
};

export default App;
```
