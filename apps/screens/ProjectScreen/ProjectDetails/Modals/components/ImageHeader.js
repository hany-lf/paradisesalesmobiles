/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import {BaseColor} from '../../../../../config';
import {Icon} from '../../../../../components';

// type Props = {
//   title?: string;
//   onRequestClose: () => void;
// };
const props = {
    title: '',
    onRequestClose: () => {},
    onDownload: () => {},
    dataImageDownload: '',
};

console.log('props dataimage', props.dataImageDownload);

const HIT_SLOP = {top: 16, left: 16, bottom: 16, right: 16};

const ImageHeader = props => (
    <SafeAreaView style={styles.root}>
        <View style={styles.container}>
            <View style={styles.space} />
            {props.title && (
                <Text
                    style={{
                        color: BaseColor.corn10,
                        marginTop: 10,

                        alignSelf: 'center',
                    }}>
                    {props.title}
                </Text>
            )}
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity
                    style={[
                        styles.closeButton,
                        {
                            alignSelf: 'center',
                            justifyContent: 'center',
                            // alignContent: 'center',
                            // alignItems: 'center',
                            paddingTop: Platform.OS === 'android' ? 3 : 0,
                        },
                    ]}
                    onPress={() => props.onDownload(props.dataImageDownload)}
                    hitSlop={HIT_SLOP}>
                    <Icon
                        name="download"
                        size={14}
                        color={BaseColor.corn30}></Icon>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.closeButton,
                        {alignSelf: 'center', justifyContent: 'center'},
                    ]}
                    onPress={props.onRequestClose}
                    hitSlop={HIT_SLOP}>
                    {/* <Icon
                        name="times"
                        size={18}
                        color={BaseColor.corn30}></Icon> */}

                    <Text
                        style={{
                            color: BaseColor.corn30,
                            fontSize: 20,
                            alignSelf: 'center',
                            justifyContent: 'center',
                        }}>
                        ✕
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#00000077',
    },
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    space: {
        width: 65,
        height: 45,
    },
    closeButton: {
        width: 45,
        height: 45,

        alignItems: 'center',
        justifyContent: 'center',
    },
    closeText: {
        lineHeight: 25,
        fontSize: 25,
        paddingTop: 2,
        includeFontPadding: false,
        color: '#FFF',
    },
    text: {
        maxWidth: 240,
        marginTop: 12,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 17,
        lineHeight: 17,
        color: '#FFF',
    },
});

export default ImageHeader;
