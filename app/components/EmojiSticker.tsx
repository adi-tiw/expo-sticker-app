import { View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import Animated , { useAnimatedStyle , useSharedValue , withSpring} from 'react-native-reanimated';
import { Gesture , GestureDetector } from 'react-native-gesture-handler';
import { transform } from '@babel/core';


type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    const scaledImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const Drag = Gesture.Pan().onChange(event => 
    {
        translateX.value += event.changeX
        translateY.value += event.changeY
    }
    )
    const containerStyle = useAnimatedStyle(() => {
        return {
        transform: [
            {
                translateX: translateX.value
            },{
                translateY : translateY.value
            }
        ]
    }
    })

    const imageStyle = useAnimatedStyle(() => {
        return {
          width: withSpring(scaledImage.value),
          height: withSpring(scaledImage.value),
        };

      });

    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
        if(scaledImage.value !== imageSize * 2) {
            scaledImage.value = imageSize * 2
        }
        else {
            scaledImage.value = imageSize * 1
        }
    });

    return (
        <GestureDetector gesture={Drag}>
        <Animated.View style={[ containerStyle ,{ top: -350 }]}>
        <GestureDetector gesture = {doubleTap}>
            <Animated.Image source={stickerSource} style={[imageStyle , { width: imageSize, height: imageSize }]} />
        </GestureDetector>
        </Animated.View>
        </GestureDetector>
  );
}

