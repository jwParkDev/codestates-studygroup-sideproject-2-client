import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux';

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

function MyApp({ Component, pageProps }) {

  return (
	<>
    <GlobalStyle />
    <Provider store={store} >
      <Header />
      <Component {...pageProps} />
    </Provider>
    {/* <Footer /> */}
	</>
  )
}

export default MyApp
