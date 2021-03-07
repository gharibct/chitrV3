import React from 'react';
import { Dimensions } from 'react-native';
import moment from 'moment';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Alert
} from 'react-native';

import { BASEURL } from '../../constants/api'
import * as IntentLauncher from 'expo-intent-launcher';

import Card from '../UI/Card';
import * as FileSystem from 'expo-file-system'

const CertificateItem = props => {
    let TouchableCmp = TouchableOpacity;


    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={() => {
                    if (props.Status != "PROCESSED") {
                        Alert.alert(
                            'Error',
                            'Your Certificate generation is under processing',
                            [{ text: 'Okay' }]
                        );
                        return;
                    }
                    props.setIsLoading(true);
                    FileSystem.downloadAsync(
                        BASEURL + 'getCert?id=' + props.UserId +
                        '&cert_id=' + props.Desc +
                        '&type=DOWNLOAD',
                        FileSystem.documentDirectory + props.Desc + '.pdf'
                    )
                        .then(({ uri, status }) => {
                            props.setIsLoading(false);
                            FileSystem.getContentUriAsync(uri).then(cUri => {
                                IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                                    data: cUri,
                                    flags: 1,
                                });
                            });

                            /*
                            Alert.alert(
                                'Downloaded',
                                'Your Certificate is downloaded',
                                [{ text: 'Okay' }]
                              );
                              */
                        })
                        .catch(error => {
                            props.setIsLoading(false);
                            Alert.alert(
                                'Sorry!!',
                                `Something went wrong {error}`,
                                [{ text: 'Okay' }]
                            );
                        });
                }} useForeground>
                    <View>
                        <View style={styles.headingContainer}>
                            <Text style={styles.labelText}>Certificate</Text>
                            <Text style={styles.valueText}>{props.Desc + ".pdf"} </Text>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.detailContainer}>
                                <Text style={styles.labelText}>Date</Text>
                                <Text style={styles.valueText}>
                                    {moment(props.DateTime).format('DD-MM-YYYY HH:MM')}
                                </Text>
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.labelText}>Status</Text>
                                <Text style={styles.valueText}>
                                    {props.Status}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.detailContainer}>
                                <Text style={styles.labelText}># of Photos</Text>
                                <Text style={styles.valueText}>
                                    {props.PhotoCount}
                                </Text>
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.labelText}>Credits Charged</Text>
                                <Text style={styles.valueText}>
                                    {props.CreditCharged}
                                </Text>
                            </View>
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
        width: win.width - 20,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    details: {
        flexDirection: 'row',
    },
    headingContainer: {
        paddingVertical: 5
    },
    headingText: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    },

    tranNumberContainer: {
        paddingVertical: 5,
        flex: .5
    },
    tranNumberText: {
        fontFamily: 'open-sans',
        fontSize: 12
    },


    detailContainer: {
        flex: .5,
        paddingVertical: 5
    },
    valueText: {
        textAlign: 'left',
        fontFamily: 'open-sans',
        fontSize: 12
    },
    labelText: {
        textAlign: 'left',
        fontFamily: 'open-sans-bold',
        fontSize: 8
    }



});

export default CertificateItem;
