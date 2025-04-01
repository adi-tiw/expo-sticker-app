import {Text , View , StyleSheet} from 'react-native';

export default function AboutScreen() {
    return(
        <View style = {styles.container}>
            <Text style = {styles.text}>
                About Page
            </Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#061b3d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
});