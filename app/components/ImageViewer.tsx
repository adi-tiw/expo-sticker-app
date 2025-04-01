import { StyleSheet } from 'react-native';
import { Image , type ImageSource} from 'expo-image';

type props = {
    alreadyImgSource: ImageSource;
    selectedImage?: string;
};

export default function ImageViewer({alreadyImgSource , selectedImage}: props) {
    const imageSource = selectedImage ? {uri: selectedImage} : alreadyImgSource;
    return <Image source={imageSource} style={styles.image}/>;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
    },
})
