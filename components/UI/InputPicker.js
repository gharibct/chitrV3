import React, { useReducer, useEffect } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};

const InputPicker = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        
        let isValid = true;

        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        else {
            isValid = true;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    return (

        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <Picker
                {...props}
                prompt={props.label}
                style={styles.input}
                //onBlur={lostFocusHandler}
                selectedValue={inputState.value}
                onValueChange={(itemValue, itemIndex) => {
                    lostFocusHandler()
                    textChangeHandler(itemValue)
                }}
            >
                {props.questions.map(secQuestion => (
                    <Picker.Item label={secQuestion.question} key={secQuestion.question} value={secQuestion.question} />
                ))}

            </Picker>
            {!inputState.isValid && (inputState.touched || props.submitFlag) && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
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

export default InputPicker;
