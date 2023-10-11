import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import AppNavigation from './navigation/AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
