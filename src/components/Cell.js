import React, { useState , useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import Images from '../../assets/Images';
export default Cell = forwardRef(({ onUncover: onUncoverCb, onStung, width, height, x, y }, ref) => {
    const [isUncovered, changeVisibility] = useState({visibility: false, user: false})
    const [isUrchin, setUrchinProbability] = useState(Math.random() < 0.2)
    const [urchinsAround, setUrchinsAround] = useState(null)
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if(isUncovered.user) {

            if (isUrchin) {

            onStung();
        } else {

            onUncoverCb(x, y);
        }   
    }

    },[isUncovered] )
    const onUncover = (userInitiated) => {

        if (isUncovered.visibility) {
            return;
        }

        if (!userInitiated && isUrchin) {
            return;
        }
        changeVisibility({visibility: true, user: true})
 
    }
    const uncoverWithoutSideEffects = () => {
        if (isUncovered.visibility){
            return;
        }

        changeVisibility({visibility: true, user: false})

    }
    useImperativeHandle(ref, () => ({
        onUncover, 
        uncoverWithoutSideEffects,
        reset : () => {
            changeVisibility({visibility: false, user: false})
            setUrchinProbability(Math.random() < 0.2)
            setUrchinsAround(null)
        },
        getUrchinsAround: () =>{
            return urchinsAround
        },
        setUrchinsAround: (urchinsAround) =>{
            setUrchinsAround(urchinsAround)
        }
      }));


    const cell = () => 
    {
        if (!isUncovered.visibility) {
            return (
                <TouchableOpacity onPress={() => onUncover(true) }>
                    <View style={[styles.cell, { width: width, height: height }]}>

                    </View>
                </TouchableOpacity>
            )
        } else {
            let content = null;
            if (isUrchin) {

                content = <Image source={Images.urchin} style={{ width: width / 2, height: height / 2 }} resizeMode="contain" />
                
            } else if (urchinsAround) {
                content = <Text>{urchinsAround}</Text>
                
            }
            return (<View style={[styles.cellUncovered, { width: width, height: height }]}>
                {content}
            </View> )
        }
    }
    
    return ( cell())

    
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