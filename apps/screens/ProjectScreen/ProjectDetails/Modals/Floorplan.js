import {Text, Button, Icon, Image} from '@components';
// import Image from '../../../../components/Image';
import {
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Platform,
    StatusBar,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Share from 'react-native-share';
import {useTranslation} from 'react-i18next';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import ImageViewing from 'react-native-image-viewing';

import get from 'lodash/get';

import ReactNativeBlobUtil from 'react-native-blob-util';
import {CustomAlert} from '@components';
import {ImageHeader} from '@components';

const Floorplan = props => {
    const {onPress, datas, icon, ...attrs} = props;
    console.log('attrs ?', attrs);
    console.log('datas nya', datas);
    const images = datas.data_floorplan;
    console.log('imagess flooorplan', images);
    const {t} = useTranslation();
    const [dataImage, setDataImage] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const insets = useSafeAreaInsets();
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, setImageIndex] = useState(0);

    const [showAlert, setShowAlert] = useState(false);
    const [imagesAlert, setImagesAlert] = useState([]);
    const [suksesAlert, setSuksesAlert] = useState(false);

    const zoomImage = (imagesArr, index) => {
        console.log('index zoom', index);

        console.log('array image zoom', imagesArr);
        setImageIndex(index);
        const arr = imagesArr.map(image => ({
            uri: image.plan_url,
        }));
        console.log('arr url', arr);

        setDataImage(arr);
        setIsVisible(true);
    };

    const onRequestClose = () => setIsVisible(false);

    const onDownload = img => {
        console.log('klik ondownload');

        // if (Platform.OS === 'ios') {
        //     _saveImage2(img);
        // } else {
        //     onLongPress(img);
        // }

        // _saveImage2(img); //ini bisa ya langsung save, cuman gak muncul alert aja sukses atau ngga savenya
        checkPermission(img);
    };

    const getExtention = filename => {
        //To get the file extension
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    };

    const checkPermission = async img => {
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission

        if (Platform.OS === 'ios') {
            //   downloadImage();
            _saveImage2(img);
        } else {
            try {
                const writed = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    },
                );
                const readed = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    },
                );
                if (
                    writed === PermissionsAndroid.RESULTS.GRANTED &&
                    readed === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    _saveImage2(img);
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };

    const _saveImage2 = async img => {
        // send http request in a new thread (using native code)
        const {
            dirs: {DownloadDir, DocumentDir},
        } = ReactNativeBlobUtil.fs;
        const {config} = ReactNativeBlobUtil;
        var ext = getExtention(img);
        ext = '.' + ext[0];
        const realURI = Platform.select({
            android: img,
            ios: decodeURI(img),
        });
        const fileDirPathAndroid = '/storage/emulated/0/Download';
        let newImgUri = realURI.lastIndexOf('/');
        let imageName = realURI.substring(newImgUri);
        let imageReplace = imageName.replace('/', '');
        const aPath = Platform.select({
            ios: DocumentDir,
            android: fileDirPathAndroid,
        });
        // const fPath = `${aPath}/Promo`;
        const fPath = `${aPath}/${imageReplace}`;
        const configOptions = Platform.select({
            ios: {
                fileCache: true,
                // path: fPath,
                notification: true,
            },
            android: {
                fileCache: false,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: fPath,
                    description: 'Downloading...',
                    title: 'Image Gallery Apps Paradise Mobiles',
                },
                indicator: true,
                IOSBackgroundTask: true,
                path: fPath,
            },
        });

        ReactNativeBlobUtil.config({
            fileCache: true,
            // by adding this option, the temp files will have a file extension
            appendExt: 'png',
        })
            .fetch('GET', realURI, {
                //some headers ..
            })
            .then(async res => {
                // the temp file path with file extension `png`
                // console.log('The file saved to ', res.path());
                const imagePath = res.path();
                // console.log('base64', res.readFile('base64'));
                const b64 = await ReactNativeBlobUtil.fs.readFile(
                    imagePath,
                    'base64',
                );
                console.log('base644', b64);

                if (Platform.OS === 'ios') {
                    {
                        const ShareResponse = await Share.open(
                            {
                                // message: 'This is the testing. Please check',
                                title: 'Image Gallery Apps Paradise Mobiles',
                                url: imagePath,
                                // url: `data:image/jpeg;base64,${imagePath}`,
                                type: 'image/jpeg',
                                activityItemSources: [
                                    {
                                        placeholderItem: {
                                            type: 'url',
                                            content: `data:image/jpeg;base64,${img}`,
                                        },
                                        // item: {
                                        //     default: {
                                        //         type: 'text',
                                        //         content: `Please check this out https://awesome.contents.com/`,
                                        //     },
                                        // },
                                        linkMetadata: {
                                            title: 'Image Gallery Apps Paradise Mobiles',
                                            icon: `data:image/jpeg;base64,${img}`,
                                        },
                                    },
                                ],
                            },
                            {
                                // Android only:
                                dialogTitle: 'Share',
                                // iOS only:
                                excludedActivityTypes: [
                                    'com.apple.UIKit.activity.PostToTwitter',
                                ],
                            },
                        );
                        console.log('Result =>', ShareResponse);
                        if (ShareResponse.success == true) {
                            Alert.alert('Success save image', [
                                {
                                    text: 'Close',
                                    onPress: () =>
                                        console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                // {
                                //     text: 'OK',
                                //     onPress: () => console.log('OK Pressed'),
                                // },
                            ]);
                        }
                        // setResult(JSON.stringify(ShareResponse, null, 2));
                    }
                } else {
                    config(configOptions)
                        .fetch('GET', realURI)
                        .then(res => {
                            console.log('res andro', res);
                            // ReactNativeBlobUtil.android.actionViewIntent(
                            //     res.path(),
                            // );
                            setTimeout(() => {
                                // Alert.alert('suukses save image');
                                setSuksesAlert(true);
                            }, 2000);
                        })
                        .catch((errorMessage, statusCode) => {
                            console.log(errorMessage);
                        });
                }
            });
    };

    const handleSaveSuccess = () => {
        setShowAlert(false);
    };

    const _saveImages = uri => {
        console.log('urii??', uri);
        let dirs = ReactNativeBlobUtil.fs.dirs;
        ReactNativeBlobUtil.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true,
            addAndroidDownloads: {
                path: dirs.DownloadDir + '/' + 'Promo',
                // path: dirs.DownloadDir + '/' + item.doc_no + '.' + extension, //ini pake extensi yang sama kayak url
                useDownloadManager: true,
                // Show notification when response data transmitted
                notification: true,
                // Title of download notification
                title: 'Image Gallery Apps Paradise Mobiles',
                // File description (not notification description)
                description: 'downloading content...',
                // mime: 'application/pdf',
                // Make the file scannable  by media scanner
                mediaScannable: true,
            },
        })
            .fetch('GET', uri, {
                //some headers ..
            })
            .then(res => {
                // the temp file path
                console.log('The file saved to ', res.path());
                imageView = (
                    <Image
                        source={{
                            uri:
                                Platform.OS === 'android'
                                    ? 'file://' + res.path()
                                    : '' + res.path(),
                        }}
                    />
                );
            });
    };

    const onLongPress = image => {
        // Alert.alert('url image', image.uri);
        setImagesAlert(image);
        setShowAlert(true);
        // Alert.alert(
        //   'Do you want to save the image?',
        //   'This image will be saved on your phone.',
        //   [
        //     {text: 'Yes', onPress: () => _saveImages(image.uri)},
        //     {text: 'Cancel', onPress: () => onRequestClose()},
        //   ],
        //   {cancelable: false},
        // );
    };

    return (
        <View
            style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
            }}>
            <Modal {...attrs} animationType="slide" transparent={false}>
                <View
                    style={[
                        styles.centeredView,
                        {
                            backgroundColor: BaseColor.whiteColor,
                            borderTopRightRadius: 25,
                            borderTopLeftRadius: 25,
                            paddingBottom: 40,
                        },
                    ]}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 20,
                                marginVertical: 20,
                            }}>
                            {icon}

                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontFamily: Fonts.type.LatoBold,
                                        color: BaseColor.corn70,
                                        fontSize: 16,
                                    }}>
                                    {t('plan_project')}
                                </Text>
                            </View>
                        </View>
                        {/* --- border  */}
                        <View
                            style={{
                                borderWidth: 0.3,
                                borderColor: BaseColor.corn70,
                                borderStyle: 'solid',
                            }}></View>
                        <ScrollView>
                            <View
                                style={[
                                    styles.centeredView,
                                    {
                                        backgroundColor: BaseColor.whiteColor,
                                        borderTopRightRadius: 25,
                                        borderTopLeftRadius: 25,
                                    },
                                ]}>
                                <View>
                                    {datas.map((item, index) => (
                                        <View
                                            style={{
                                                marginHorizontal: 10,
                                                marginVertical: 10,
                                                // backgroundColor: 'yellow',
                                                borderRadius: 10,
                                            }}
                                            key={index}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    zoomImage(datas, index)
                                                }>
                                                {/* <Text>{item.image}</Text> */}
                                                <Image
                                                    source={{
                                                        uri: item.plan_url,
                                                    }}
                                                    // source={require(item.image)}
                                                    // source={item.image}
                                                    // alt={item.image}
                                                    // source={require(`@assets/images/unitgalleries/gallery/PK-Principal-Antasari-Place-16-Sept-2022-1-1-35-scaled.jpg`)}
                                                    style={{
                                                        width: '100%',
                                                        height: 200,
                                                        resizeMode: 'contain',
                                                        borderRadius: 10,
                                                        // ...Platform.select({
                                                        //   android: {
                                                        //     elevation: 1,
                                                        //   },
                                                        //   default: {
                                                        //     shadowColor: BaseColor.corn90,
                                                        //     shadowOffset: {height: 0, width: 0},
                                                        //     shadowOpacity: 3,
                                                        //     shadowRadius: 3,
                                                        //   },
                                                        // }),
                                                    }}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <ImageViewing
                                images={dataImage}
                                imageIndex={currentImageIndex}
                                presentationStyle="overFullScreen"
                                visible={isVisible}
                                onRequestClose={onRequestClose}
                                // onLongPress={onLongPress}
                                HeaderComponent={
                                    //title ini tidak berfungsi karena
                                    datas === datas
                                        ? ({imageIndex}) => {
                                              const title = get(
                                                  datas,
                                                  `${imageIndex}.plan_title`,
                                              );
                                              const ima = get(
                                                  datas,
                                                  `${imageIndex}.plan_url`,
                                              );

                                              return (
                                                  <ImageHeader
                                                      title={title}
                                                      onRequestClose={
                                                          onRequestClose
                                                      }
                                                      dataImageDownload={ima}
                                                      onDownload={onDownload}
                                                  />
                                              );
                                          }
                                        : console.log('false')
                                }
                                FooterComponent={({imageIndex}) => (
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: '#000',
                                            ...Platform.select({
                                                android: {
                                                    paddingTop:
                                                        StatusBar.currentHeight,
                                                    marginLeft: 40,
                                                    bottom: 40,
                                                },
                                                ios: {
                                                    marginLeft: 40,
                                                    bottom: 40,
                                                },
                                            }),
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: Fonts.type.Lato,
                                                color: BaseColor.corn30,
                                            }}>{`${imageIndex + 1} / ${
                                            dataImage.length
                                        }`}</Text>
                                    </View>
                                    // <ImageFooter
                                    //   imageIndex={imageIndex}
                                    //   imagesCount={dataImage.length}
                                    // />
                                )}
                            />
                            <CustomAlert
                                {...props}
                                onRequestClose={() => {
                                    setShowAlert(false);
                                }}
                                visible={showAlert}
                                handleSaveSuccess={handleSaveSuccess}
                                icon={
                                    <TouchableOpacity
                                        onPress={() => setShowAlert(false)}>
                                        {/* <Icon
                            name={'arrow-left'}
                            size={18}
                            color={'red'}></Icon> */}
                                        <Text
                                            style={{
                                                fontFamily: Fonts.type.Lato,
                                                fontSize: 12,
                                                color: BaseColor.redStateColor,
                                            }}>
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                }
                                // text={}
                                datas={imagesAlert}></CustomAlert>
                            {suksesAlert && (
                                <Modal
                                    visible={suksesAlert}
                                    transparent={true}
                                    animationType="slide">
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            // marginTop: 22,
                                        }}>
                                        <View
                                            style={{
                                                // margin: 20,
                                                backgroundColor: 'white',
                                                borderRadius: 20,
                                                padding: 20,
                                                alignItems: 'center',
                                                shadowColor: '#000',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 4,
                                                elevation: 5,
                                            }}>
                                            <Text
                                                style={{
                                                    fontFamily: Fonts.type.Lato,
                                                    fontSize: 12,
                                                    color: BaseColor.corn70,
                                                }}>
                                                Success save image
                                            </Text>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginTop: 25,
                                                    justifyContent:
                                                        'space-between',
                                                }}>
                                                <View
                                                    style={{
                                                        marginHorizontal: 25,
                                                        alignItems: 'flex-end',
                                                        flex: 1,
                                                    }}>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            setSuksesAlert(
                                                                false,
                                                            )
                                                        }>
                                                        <Text
                                                            style={{
                                                                fontFamily:
                                                                    Fonts.type
                                                                        .Lato,
                                                                fontSize: 12,
                                                                color: BaseColor.redStateColor,
                                                            }}>
                                                            Close
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {/* <Text>ini akan jadi cutom modal</Text> */}
                                        </View>
                                    </View>
                                </Modal>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Floorplan;
