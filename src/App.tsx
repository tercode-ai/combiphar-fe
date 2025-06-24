import SessionProvider from './components/providers/session';
import AppProvider from './providers';
import AppRouter from './routes';

export default function App() {
  return (
    <AppProvider>
      <SessionProvider>
        <AppRouter />
      </SessionProvider>
    </AppProvider>
  );
}
