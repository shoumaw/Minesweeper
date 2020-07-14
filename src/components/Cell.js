import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import Constants from '../utils/AppConstants';
import Images from '../../assets/Images';
export default Cell = forwardRef(({ onUncover: onUncoverCb, setTotalNumUrchins, onGameOver, width, height, x, y }, ref) => {
    const [isUncovered, changeVisibility] = useState({ visibility: false, user: false })
    const [isUrchin, setUrchinProbability] = useState(Math.random() < 0.1)
    const [urchinsAround, setUrchinsAround] = useState(null)
    const isInitialMount = useRef(true);
    // Incerement the total number of urchins on the board
    if (isUrchin) {
        setTotalNumUrchins()
    }
    // OnUncover side effect. Its either gameover or call the parent uncover callback
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (isUncovered.user) {
            if (isUrchin) {
                onGameOver(Constants.YOU_LOSE);
            } else {
                onUncoverCb(x, y);
            }
        }

    }, [isUncovered])
    // On uncover change visibility 
    const onUncover = (userInitiated) => {

        if (isUncovered.visibility) {
            return;
        }

        if (!userInitiated && isUrchin) {
            return;
        }
        changeVisibility({ visibility: true, user: true })

    }
    // Uncover all cells when the game is over
    const uncoverWithoutSideEffects = () => {
        if (isUncovered.visibility) {
            return;
        }

        changeVisibility({ visibility: true, user: false })

    }
    // Ref functions to be called using the parent component
    useImperativeHandle(ref, () => ({
        onUncover,
        uncoverWithoutSideEffects,
        reset: () => {
            changeVisibility({ visibility: false, user: false })
            setUrchinProbability(Math.random() < 0.2)
            setUrchinsAround(null)
        },
        isUrchin: () => {
            return isUrchin
        },
        setUrchinsAround: (urchinsAround) => {
            setUrchinsAround(urchinsAround)
        }
    }));


    const cell = () => {
        if (!isUncovered.visibility) {
            return (
                <TouchableOpacity onPress={() => onUncover(true)}>
                    <View style={[styles.cell, { width: width, height: height }]}>

                    </View>
                </TouchableOpacity>
            )
        } else {
            let content = null;
            if (isUrchin) {

                content = <Image id="urchin-image" source={Images.urchin} style={{ width: width / 2, height: height / 2 }} resizeMode="contain" />

            } else if (urchinsAround) {
                content = <Text id="num-urchins">{urchinsAround}</Text>

            }
            return (<View id="cell-view" style={[styles.cellUncovered, { width: width, height: height }]}>
                {content}
            </View>)
        }
    }

    return (cell())


})

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#bdbdbd',
        borderWidth: 3,
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d'
    },
    cellUncovered: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#7d7d7d',
        alignItems: 'center',
        justifyContent: 'center'
    }

})