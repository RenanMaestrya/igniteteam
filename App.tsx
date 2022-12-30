import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { 
  useFonts, 
  Roboto_400Regular, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';

import theme from './src/theme';

import { Groups } from '@screens/groups';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });


  return (
    <ThemeProvider theme={theme}>
      { fontsLoaded ? <Groups /> : <ActivityIndicator/>}
    </ThemeProvider>
  );
}
