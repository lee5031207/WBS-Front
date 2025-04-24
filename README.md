
# React

## 함수 컴포넌트, 클래스 컴포넌트
### ex

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}


## props
ㄴ 부모 Component가 자식 Component에 값을 전달할때 사용한다.
ㄴ props는 읽기 전용이다. 수정 X
ㄴ ex. <ProjectDrawer name="Project"/>

## state
ㄴ React Component의 상태를 의미한다.
ㄴ state 는 직접 수정하면 안된다. -> this.setState({name:"react"});
ㄴ state는 렌더링과 연관이 있기 때문에 반드시 setState를 이용해 수정해여함.


#### React 학습하기

### 첫 번째 컴포넌트

## 컴포넌트 : UI 구성 요소
ㄴ React를 사용하면 마크업, CSS, JavaScript를 앱의 재사용 가능한 UI 요소인 
사용자 정의 “컴포넌트”로 결합할 수 있습니다.

## 컴포넌트 정의
ㄴ React Component는 무조건 대문자로 시작(소문자일 시 동작 X)
ㄴ return 구문은 () 괄호로 묶어야 함

## 컴포넌트 사용하기
ㄴ 컴포넌트 중첩 및 구성 : 컴포넌트는 일반 JavaScript함수이므로 같은 파일에 여러 컴포넌트를 포함할 수 있습니다.


### 컴포넌트 import 및 export 하기

## root 컴포넌트란
ㄴ App.js라는 root 컴포넌트 파일에 존재합니다.

## 컴포넌트 import , export
ㄴ import Gallery from './Gallery.js'; //사용하는곳
ㄴ export default Gallery // 컴포넌트 정의

## 한 파일에서 여러 컴포넌트를 import 하거나 export 하는 방법 
ㄴ 한 파일에서는 단 하나의 default export만 사용할 수 있지만 named export는 여러 번 사용할 수 있습니다.
ㄴ import { Profile } from './Gallery.js'; // named import


### JSX 마크업 작성하기
ㄴ JSX는 JavaScript를 확장한 문법으로, JavaScript 파일을 HTML과 비슷하게 마크업을 작성할 수 있도록 해줍니다.

## JSX의 규칙
ㄴ 1. 하나의 루트 엘리먼트로 반환하기 
ㄴ 2. 모든 태그는 닫아주기
ㄴ 3. 대부분 캐멀 케이스로!

### 중괄호가 있는 JSX 안에서 자바스크립트 사용하기

## 따옴표로 문자열 전달하기
ㄴ 문자열 어트리뷰트를 JSX에 전달하려면 작은따옴표나 큰따옴표로 묶어야 합니다.

## 중괄호를 사용하는 곳
ㄴ JSX 태그 안의 문자: <h1>{name}'s To Do List</h1>
ㄴ = 바로 뒤에 오는 어트리뷰트: src={avatar}는 avatar 변수를 읽지만 
src="{avatar}"는 "{avatar}" 문자열을 전달합니다.

## ”이중 중괄호” 사용하기: JSX의 CSS와 다른 객체 
ㄴ JSX에서 객체를 전달하려면 
person={{ name: "Hedy Lamarr", inventions: 5 }}
와 같이 다른 중괄호 쌍으로 객체를 감싸야 합니다.


### 컴포넌트에 props 전달하기
ㄴ props는 HTML 어트리뷰트를 생각나게 할 수도 있지만, 
객체, 배열, 함수를 포함한 모든 JavaScript 값을 전달할 수 있습니다.

## 자식 컴포넌트에 props 전달하기 
ㄴ <Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />

## 자식 컴포넌트 내부에서 props 읽기
ㄴ function Avatar({ person, size }) {}

## prop의 기본값 지정하기
ㄴ function Avatar({ person, size = 100 }) {}

## JSX spread 문법으로 props 전달하기
ㄴ <Avatar {...props} /> 
ㄴ 이렇게 하면 Profile의 모든 props를 각각의 이름을 나열하지 않고 Avatar로 전달합니다.

## props
ㄴ Props는 읽기 전용 스냅샷으로, 렌더링 할 때마다 새로운 버전의 props를 받습니다.
ㄴ Props는 변경할 수 없습니다. 상호작용이 필요한 경우 state를 설정해야 합니다.

### 조건부 렌더링
ㄴ . React는 if 문, && 및 ? : 연산자와 같은 자바스크립트 문법을 사용하여 조건부로 JSX를 렌더링할 수 있습니다.

ㄴ Item 컴포넌트
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

### 리스트 렌더링
ㄴ  React에서 filter()와 map()을 사용해 데이터 배열을 필터링하고 컴포넌트 배열로 변환

### 컴포넌트를 순수하게 유지하기
ㄴ 컴포넌트는 순수해야만 합니다. 이것은 두가지를 의미합니다.
ㄴ 자신의 일에 집중합니다. 렌더링 전에 존재했던 객체나 변수를 변경하지 않아야 합니다.
ㄴ 같은 입력, 같은 출력. 입력이 같을 경우, 컴포넌트는 항상 같은 JSX를 반환해야 합니다.
ㄴ 렌더링은 언제든지 발생할 수 있으므로 컴포넌트는 서로의 렌더링 순서에 의존하지 않아야 합니다.
ㄴ 컴포넌트가 렌더링을 위해 사용하는 입력을 변경해서는 안됩니다. 
   여기에는 Props, State, Context가 포함됩니다. 화면을 업데이트하려면 기존 객체를 변경하는 대신 State를 “설정”하세요.
ㄴ 반환하는 JSX에서 컴포넌트의 로직을 표현하기 위해 노력하세요. “무언가를 변경”해야 할 경우 일반적으로 이벤트 핸들러에서 변경하고 싶을 것입니다. 
   마지막 수단으로 useEffect를 사용할 수 있습니다.



### 이벤트에 응답하기
ㄴ onClick={handleClick} -> handleClick 은 Function
ㄴ <button onClick={handleClick()}> <- 잘못된 예 () 없어야함







