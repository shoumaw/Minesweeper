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
    const [isUncovered, changeVisibility] = useState(false)
    const [isUrchin, setUrchinProbability] = useState(Math.random() < 0.2)
    const [urchinsAround, setUrchinsAround] = useState(null)
    const [performSideEffects, setPerformSideEffects] = useState(false)
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            console.log("Mount")

            isInitialMount.current = false;
        } else if (performSideEffects) {
            if (isUrchin) {
                console.log("Stung")

                onStung();
            } else {
                console.log("uncover cb")

                onUncoverCb(x, y);
            }
        }

    }, )
    const onUncover = (userInitiated) => {
        if (isUncovered) {
            ;
        }return

        if (!userInitiated && isUrchin) {
            return;
        }
        //console.log("changing visibility")
        changeVisibility(true)
        setPerformSideEffects(true)
    }
    const uncoverWithoutSideEffects = () => {
        if (isUncovered){
            return;
        }

        changeVisibility(true)
        setPerformSideEffects(false)

    }
    useImperativeHandle(ref, () => ({
        onUncover,
        reset : () => {
            changeVisibility(false)
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
        if (!isUncovered) {
            return (<TouchableOpacity onPress={() => { onUncover(true); }}>
                    <View style={[styles.cell, { width: width, height: height }]}>

                    </View>
                </TouchableOpacity>)
        } else {
            let content = null;
            if (isUrchin) {
                //console.log("Noo")

                content = <Image source={Images.mine} style={{ width: width / 2, height: height / 2 }} resizeMode="contain" />
                
            } else if (urchinsAround) {
                //console.log("Maybee")

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
        backgroundColor: '#bdbdbd',
        borderWidth: 1,
        borderColor: '#7d7d7d',
        alignItems: 'center',
        justifyContent: 'center'
    }

})