import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableHighlight, Animated, Easing, Text, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
export default Modal = ({ isGameOver, gameOverText, resetGame }) => {
    const [trans, setTrans] = useState(new Animated.Value(0))
    const [pulse, setPulse] = useState(new Animated.Value(0))
    useEffect(() => {
        if (isGameOver) {
            openModal()
        }

    }, [isGameOver])
    const openModal = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(trans, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,

                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,

                }),
                Animated.timing(pulse, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,

                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,

                }),
                Animated.timing(pulse, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,

                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,

                })
            ]),
            {
                iterations: 1
            }
        ).start();

    }

    const closeModal = () => {
        Animated.timing(trans, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
        resetGame()
    }
    return (
        <Animated.View style={[styles.modal, {
            transform: [
                {
                    translateY: trans.interpolate({
                        inputRange: [0, 1],
                        outputRange: [deviceHeight, 0]
                    })
                },
                {
                    scaleX: pulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.4]
                    })
                },
                {
                    scaleY: pulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.4]
                    })
                }]
        },
        ]}>
            <View style={styles.textView}>
                <Text style={styles.text} >{gameOverText}</Text>
            </View>
            <TouchableHighlight onPress={closeModal} style={styles.button}>
                <Text style={styles.buttonText}>Retry</Text>
            </TouchableHighlight>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textView: {
        backgroundColor: 'white',
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
        position: 'absolute',
        height: deviceHeight / 8,
        width: deviceHeight / 3,
        justifyContent: 'center',
        borderRadius: 4,
    }
});