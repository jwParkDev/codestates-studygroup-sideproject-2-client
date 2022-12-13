import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux';

// nextauth 사용을 위함
import { SessionProvider } from "next-auth/react"

import Header from '../components/blocks/Header';
import Footer from '../components/blocks/Footer';
import { store } from '../ducks/store';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

function MyApp({ Component, pageProps, session }): React.ReactElement {

  return (
	<>
    <GlobalStyle />
    <SessionProvider session={session}>
      <Provider store={store} >
        <Header />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
    <Footer />
	</>
  )
}

export default MyApp
