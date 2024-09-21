
import Quiz from './components/Quiz';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Quiz />
    </ThemeProvider>
  );
}

export default App;
