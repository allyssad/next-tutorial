// default export of _app.js is a top-level React compt that wraps all pages in your app
// use this comp to keep state when navigating between pages, or to add global styles

import '../styles/globals.css';

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
