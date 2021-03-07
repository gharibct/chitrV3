import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Button
} from 'react-native';

import { BASEURL } from '../../constants/api'

import Card from '../UI/Card';
import Colors from '../../constants/Colors'
import * as photoActions from '../../store/actions/photo';
import { useDispatch, useSelector } from 'react-redux';

const ReviewCertifyItem = props => {
    let TouchableCmp = TouchableOpacity;
    const dispatch = useDispatch();

    const PhotoLocation = useSelector(state => {

        //console.log(state.photo)
        return state.photo.photo_location
    });
    
    useEffect(() => {
        //dispatch(photoActions.getPhotoInfo(props.userId,props.photo_id))
        getPhotoInfo();
    }, []);

    const getPhotoInfo = async () => {
        //const uuid = uuidv4();
        try {
            //console.log("Review and Certify",props.userId,props.photo_id)
            await dispatch(photoActions.getPhotoInfo(props.userId,props.photo_id))
        }
        catch (err) {
        }
    }



    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp useForeground>
                    <View>

                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: BASEURL + 'getPhoto?id=' + props.userId + '&photo_id=' + props.photo_id }}
                                cache='reload'
                                loadingIndicatorSource={require('../../assets/Spinner-pink.gif')}
                            />
                        </View>

                        <View style={styles.details}>
                            <Text style={styles.location}>{PhotoLocation[props.photo_id]}</Text>
                        </View>

                        <View style={styles.actions}>
                            <Button
                                color={Colors.ascent}
                                title="Delete?"
                                onPress={() => {
                                    props.onDelete(props.photo_id);
                                }}
                            />
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    );
};
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    product: {
        height: 400,
        width: win.width - 20,
        margin: 10,
        padding: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '10%',
        padding: 5
    },
    location: {
        fontFamily: 'open-sans',
        fontSize: 10
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        paddingHorizontal: 5,
        paddingVertical: 2
    }
});

export default ReviewCertifyItem;
