# TodoList

## 프로그램 소개
회원가입 및 로그인 기능과 함께 간단 ToDoList 웹 페이지를 만들었습니다.

![시연영상1](https://user-images.githubusercontent.com/110954895/207246034-8b49fba7-c46e-4741-8082-ec6f58271c11.gif)
![시연영상2](https://user-images.githubusercontent.com/110954895/207246050-c38a5675-8ef4-4b95-afeb-2c57e48789ef.gif)

## 사용한 기술스택
- Next.js
- Typescript
- styled-Components
- Redux ToolKit
- React-Hook-Form
- NextAuth

## 컴포넌트 구조
- ```Atomic Design Pattern```을 참고하여 Atoms - Blocks - Pages로 구성하였습니다.
- 전역 상태 관리를 위한 RTK Store와 Slice들은 Ducks 디렉토리에 따로 뺴놓았습니다.
- 공통된 type 구조를 상속하여 재사용하기 위해 interface들을 모아놓은 파일을 따로 만들었습니다. 

## Server Repository
https://github.com/jwParkDev/codestates-studygroup-sideproject-2-server

## Blog
https://charm-antimony-6ba.notion.site/jwParkDev-s-Blog-7c73001d76a740eea7976bbfc8162357
