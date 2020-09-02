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
