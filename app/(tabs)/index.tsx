//Library Imports
import { Text, View , StyleSheet, Pressable} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState , useRef} from 'react';
import {IconSymbol}  from "@/app-example/components/ui/IconSymbol.ios";
import { type ImageSource } from 'expo-image';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";
//File Imports
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import CircleButton from '../components/CircleButton';
import EmojiPicker from "../components/EmojiPicker";
import EmojiSticker from "../components/EmojiSticker";
import EmojiList from '../components/EmojiList';



const placeHolderImage = require('@/assets/images/background-image.png');


export default function Index() {
//Hooks Definitions
  const [selectedImage  ,setSelectedImage] = useState< string | undefined >(undefined);
  const [showAppOptions , setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible , setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [permissionStatus , requestPermission ] = MediaLibrary.usePermissions();
  const imageRef  = useRef<View>(null);


  if (permissionStatus === null) {
    requestPermission();
  }

  const pickImageAsync = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality:1,
    })
    if(!result.canceled) {
      setSelectedImage( result.assets[0].uri );
      setShowAppOptions(true);
    }
    else {
      alert('You did not select any image.');
    }
  };

  const onReset= () => {
    setShowAppOptions(false);
  } 
  const onAddSticker = () => {
    setIsModalVisible(true);
  }
  const onModalClose = () => {
    setIsModalVisible(false);
  }
  const onSaveImageAsync = async() => {
    try {
      const localUri = await captureRef(imageRef , {
        height: 440,
        quality: 1, 
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if(localUri) {
        alert('Saved');
      }
    }
    catch(error){
      console.log('Error in saving the file')
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
        <ImageViewer alreadyImgSource={placeHolderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync}/>
          </View>
          </View>
    
    ):
      (<View style={styles.footerContainer}>
        <Button theme='primary' label='Choose a Photo' onPress={pickImageAsync}/>
        <Button label= 'Use this Photo' onPress={() => setShowAppOptions(true)}/>
      </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      </GestureHandlerRootView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061b3d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer:{
    position:'absolute',
    bottom: 80,
  },
  optionsRow:{
    alignItems:'center',
    flexDirection:'row',
  },
})
