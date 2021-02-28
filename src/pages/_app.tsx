import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

//provider é um elemento que permite que os dados dos
//componentes atribuiídos sejam acessados em qualquer componente.
