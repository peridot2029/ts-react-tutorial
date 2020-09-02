# TypeScript - useRef()

## 1. useRef 정의

`useRef()`는 리액트 컴포넌트에서 외부 라이브러리의 인스턴스 또는 DOM을 특정 값 안에 담을 때 사용한다. 이를 통해 컴포넌트 내부에서 관리하고 있는 값을 관리할 때 유용하다. (단, 이 값은 렌더링과 관계가 없어야 한다.)

## 2. 변수의 값 관리

`useRef()`를 쓰면 아래와 같은 코드 처럼 제네릭 통해 `current`의 값을 추론 할 수 있다.

```ts
const id = useRef<number>(0);
const incraseId = () => {
  id.current += 1;
};
```

## 3. DOM 관리

`ref` 안에 DOM을 담을 때 초기값은 `null`로 설정한다. `MyForm Component`에서 `handleSubmit`
이벤트가 등록 되었을 때, 첫 번째 인풋에 포커스가 잡힌도록 수정한다.

`inputRef`는 제네릭으로 `HTMLInputElement`타입을 넣었다. 추후에 `ref`를 사용할 때 어떤 타입을 사용할지 모르겠다면 마우스를 해당 커서에 올리면 된다.

```ts
const inputRef = useRef<HTMLInputElement>(null);
```

```ts
// src/component/MyForm.tsx
import React, { useState, useRef } from 'react';

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: '',
    });

    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='name' value={name} onChange={onChange} ref={inputRef} />
      <input name='description' value={description} onChange={onChange} />
      <button type='submit'>등록</button>
    </form>
  );
}

export default MyForm;
```

```ts
// src/App.tsx
import React from 'react';
import MyForm from './components/MyForm';

const App: React.FC = () => {
  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };
  return <MyForm onSubmit={onSubmit} />;
};

export default App;
```
