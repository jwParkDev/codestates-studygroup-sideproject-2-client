import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSlice, loginStatusSlice } from '../../ducks/slices';

const StyeldHeader = styled.header`
  width:100%;
  height:80px;
  border-bottom: 1px solid #e5e5e5;
`;

const HeaderWrapper = styled.div`
  width:1000px;
  height:100%;
  margin:0 auto;
  display:flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  & > div.header--left {
    display:flex;
    & > nav {
      display:flex;
    }
  }
`;

const LogoDiv = styled.div`
  padding-right:40px;
  & > img {
    width: 150px;
    height: 60px;
  }
`;

const TabMenuUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  & > li {
    height: 100%;

    & > a {
      text-decoration: none;
      color: black;
      display:flex;
      align-items: center;
      height:100%;
      padding:0 20px;

      &.active {
        color: rgb(224 66 45);
        font-weight: bold;
      }
    };
  }
`;

const PageTitle = styled.h2`
  text-align:center;
`;

const Header = () => {
  const tabMenuArr = [
    {'tabName' : '홈', 'goToUrl': '/'},
    {'tabName' : '전체목록', 'goToUrl': '/alllist'},
    {'tabName' : '캘린더', 'goToUrl': '/calendar'}
  ];

  const router = useRouter();
  const loginStatus = useSelector(state => state.loginStatus.value);
  const dispatch = useDispatch();

  // 로그아웃 버튼 구현
  const logoutHandler = (e) => {
    // 일단 Link tag(a tag)의 기본적인 기능을 막고,
    e.preventDefault();
    // 메인페이지(-> 로그인 페이지)로 이동시켜버리자.
    router.push('/login');
    // 유저 정보를 지워주고
    dispatch(userInfoSlice.actions.revise(null));
    // 로그인 상태를 false로 바꿔준다
    dispatch(loginStatusSlice.actions.login(false));
  };


  return (
    <StyeldHeader>
      {loginStatus 
      ?
      <HeaderWrapper>
        <div className="header--left">
          <LogoDiv><img src='/images/logo.png' /></LogoDiv>
          <nav>
            <TabMenuUl>
              {tabMenuArr.map((el, idx) => {
                return (
                  <li key={idx}>
                      <Link href={el.goToUrl} className={el.goToUrl === router.pathname ? 'active' : ''}>{el.tabName}</Link>
                  </li>
                )
              })}
            </TabMenuUl>
          </nav>
        </div>
        <div className="header--right">
            <TabMenuUl>
              <li><Link href="/mypage" className={'/mypage' === router.pathname ? 'active' : ''}>마이페이지</Link></li>
              <li><Link href="#none" role="button" onClick={logoutHandler}>로그아웃</Link></li>
            </TabMenuUl>
        </div>
      </HeaderWrapper>
      :
      <HeaderWrapper>
        <LogoDiv style={{flex:1}}><img src='/images/logo.png' /></LogoDiv>
        <PageTitle style={{flex:1, textAlign:'center'}}>
          {router.pathname === '/login' ? '로그인' : '회원가입'}
        </PageTitle>
        <div style={{flex:1}}></div>
      </HeaderWrapper>
      }
    </StyeldHeader>
  )
}

export default Header;