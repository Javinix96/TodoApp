import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  NativeModules,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {HeaderComponent} from '../components/headerComponent';
import {BodyComponent} from '../components/bodyComponent';
import {TodoComponent} from '../components/todoComponent';
import {UserComponent} from '../components/userComponent';

export const MainPage = () => {
  const [height, setHeight] = useState(50);
  const [buttonT, setButtonT] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(450)).current;
  const translateXTitle = useRef(new Animated.Value(450)).current;
  const translateXHour = useRef(new Animated.Value(450)).current;
  const [focus, setFocus] = useState(false);

  const moveDown = () => {
    setButtonT(true);
    // translateX.setOffset(100);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 200,
        duration: 1500,
        useNativeDriver: true,
      }).start(),
      Animated.timing(translateXTitle, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        delay: 500,
      }).start(),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        delay: 800,
      }).start(),
      Animated.timing(translateXHour, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        delay: 1000,
      }).start(),
    ]);
  };

  const anims = {
    translateY,
    translateX,
    translateXTitle,
    height,
    moveDown,
    setHeight,
    translateXHour,
    buttonT,
    setButtonT,
    showButton,
    setShowButton,
    setFocus,
    focus,
  };
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.titleContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setFocus(false);
        }}
        style={styles.Main}>
        <View style={styles.Main}>
          <UserComponent />
          <View style={styles.titleContainer}>
            <Text style={styles.Title}>TO DO LIST</Text>
          </View>
          <TodoComponent anims={anims} />
        </View>
      </TouchableWithoutFeedback>
      <BodyComponent anims={anims} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Main: {
    backgroundColor: '#001B54',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    overflow: 'visible',
    zIndex: 1,
  },
  Title: {
    color: 'white',
    fontFamily: 'ShadowsIntoLight-Regular',
    textAlign: 'center',
    height: 120,
    width: '100%',
    // backgroundColor: 'red',
    fontSize: 65,
    margin: 0,
    lineHeight: 60,
    paddingTop: 40,
    marginRight: 20,
  },
  titleContainer: {
    width: '100%',
    height: '100%',
    // flex: 1,
    alignItems: 'center',
  },
});
