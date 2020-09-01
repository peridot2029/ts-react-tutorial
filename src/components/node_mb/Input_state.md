# TypeScript

## 1. Input state 관리

이벤트를 다룰 때 타입을 다뤄야 하므로 타입을 지정하는 법 정리.

아래의 `onChange`, `hadleSumbit`은 일단 **타입을 지정하는 법 모르기 때문에  `any` 타입으로 설정**한다.

```ts
// src/components/MyForm.tsx
import React, { useState } from 'react';
type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};
function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const { name, description } = form;

  const onChange = (e: any) => {};
  const handleSubmit = (e: any) => {};
  return (
    <form onSubmit={handleSubmit}>
      <input name='name' value={name} onChange={onChange} />
      <input name='description' value={description} onChange={onChange} />
      <button type='submit'>등록</button>
    </form>
  );
}

export default MyForm;
```

그런 다음에 마우스 커서를  `onChange`, `onSumbmit`에 올린다.  

- `onChage` → `React.ChangeEvent<HTMLInputElement>`
- `onSubmit` → `React.FormEvent<HTMLFormElement>`

```ts
// src/components/MyForm.tsx
import React, { useState } from 'react';
type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};
function MyForm({ onSubmit }: MyFormProps) {
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
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name='name' value={name} onChange={onChange} />
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