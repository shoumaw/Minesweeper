import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableHighlight, Animated, Easing, Text, Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
export default Modal = ({isGameOver, resetGame}) => {
 
    const [modalY, setModalY] = useState(new Animated.Value(deviceHeight))
    useEffect(() => {
        if(isGameOver){
            openModal()
        }

    }, [isGameOver])
    const openModal = () => {
        Animated.timing(modalY, {
            duration: 300,
            toValue: -deviceHeight / 3,
            useNativeDriver: true,
            easing: Easing.out
        }).start();
    }
    
    const closeModal = () => {
        Animated.timing(modalY, {
            duration: 300,
            toValue: deviceHeight,
            useNativeDriver: true
        }).start();
        resetGame()
    }
    
    return (
            <Animated.View style={[ styles.modal, { transform: [{translateY: modalY}] }]}>
                <View style ={styles.textView}>                
                    <Text style={styles.text} >You losee</Text>
                </View>
                <TouchableHighlight onPress={ closeModal } style={ styles.button }>
                    <Text style={ styles.buttonText }>Retry</Text>
                </TouchableHighlight>
            </Animated.View>
    ); 
   };
   
   const styles = StyleSheet.create({
    container: {
      justifyContent: 'center'
    },
    text:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20, 
    },
    textView:{
        backgroundColor:'white',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    button: {
      borderRadius: 4,
      backgroundColor: 'green',
      alignItems: 'center',
      height: 40,
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white'
    },
    modal: {
      height: deviceHeight/8,
      width: deviceWidth/3,
      justifyContent: 'center',
      borderRadius: 4,
    }
  });