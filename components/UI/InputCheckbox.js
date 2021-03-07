import React, { useReducer, useEffect } from 'react';
import { View, Text, CheckBox, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: !action.value
            };
        default:
            return state;
    }
};

const InputCheckbox = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : false,
        touched: false
    });

    const { onInputChange, id } = props;

    const inputChangeHandler = (value) => {
        dispatch({ type: INPUT_CHANGE });
    };


    return (
        <View style={styles.formControl}>
            <CheckBox
                {...props}
                checked={inputState.value}
                onIconPress={()=>{
                    inputChangeHandler(inputState.value)
                }}
            />
            <Text style={styles.label}>{props.label}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        flexDirection: 'row'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});

export default InputCheckbox;
