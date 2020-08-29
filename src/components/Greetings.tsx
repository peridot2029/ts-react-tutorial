import React from 'react';

// NOTE `React.FC`
// (1). props의 기본적으로 `children`이 들어가 있다
// (2). `defalutProps`, `propTypes`, `contextTypes`를 설정 할때 자동완성이 될 수 있다
// (3). 추가적으로 `React.FC`를 사용하는 경우 `defalutProps`가 제대로 작동하지 않을 수 있다 → 주의

type GreetingsProps = {
  name: string;
  mark: string;
  optinoal?: string; // 생략 할 수 있는 props
  onClick: (name: string) => void; // 함수의 타입 props
};

function Greetings({ name, mark, optinoal, onClick }: GreetingsProps) {
  const hadleClick = () => onClick(name);
  return (
    <div>
      Hello,{name} {mark}
      {optinoal && <p>{optinoal}</p>}
      <div>
        <button type='button' onClick={hadleClick}>
          Click Me
        </button>
      </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!',
};

export default Greetings;
