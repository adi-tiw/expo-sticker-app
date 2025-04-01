import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from 'react-native'; 

export default function RootLayout() {
  return(
    <>
    <Stack>
    <View>
    <StatusBar style="auto"/> 
    </View>
    <Stack.Screen name='(tabs)' options={{ headerShown: false}} />
    <Stack.Screen name='index' options={{ title:'Home'}} />
    <Stack.Screen name='about' options={{ title: 'About'}} />
    </Stack>
    <StatusBar style='light' />
    </>
  )

}
