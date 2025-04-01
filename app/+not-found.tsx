import { View , Text , StyleSheet} from 'react-native';
import { Link , Stack } from 'expo-router';

export default function NotFoundScreen() {    
    return(
        <>
        <Stack.Screen options={{title: 'Error 404: Page not Found :('}}/>
        <View style={styles.container}>
            <Text>Page Not found</Text>
            <Link href='/' style={styles.button}>
            Go back to Home
            </Link>
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: 'white',
      },
});

