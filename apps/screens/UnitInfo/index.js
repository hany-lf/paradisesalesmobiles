import {Text, Header, Icon, Button} from '@components';

import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Animated,
    Platform,
    StatusBar,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import Share from 'react-native-share';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
import UnitInfoModal from './Modal/UnitInfoModal';

import ReactNativeBlobUtil from 'react-native-blob-util';
import UnitInfoDetailsModal from './Modal/UnitInfoDetailsModal';

import ImageViewing from 'react-native-image-viewing';
import get from 'lodash/get';

import {CustomAlert} from '@components';
import {ImageHeader} from '@components';

const UnitInfo = props => {
    const {navigation} = props;
    const {t} = useTranslation();
    const user = useSelector(state => getUser(state));
    const [showPromo, setShowPromo] = useState(false);
    const [modalVisibile, setModalVisible] = useState(false);
    const [paramsData, setParamsData] = useState(props.route.params.paramsData);
    const [itemsData, setItemsData] = useState(props.route.params.item);
    const [dataImage, setDataImage] = useState([]);
    const [showImage, setShowImage] = useState(false);
    let [toggled, setToggled] = useState(false);
    const height = useRef(new Animated.Value(1)).current;
    const insets = useSafeAreaInsets();

    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, setImageIndex] = useState(0);

    const [showAlert, setShowAlert] = useState(false);
    const [imagesAlert, setImagesAlert] = useState([]);
    const [suksesAlert, setSuksesAlert] = useState(false);

    console.log('params data untuk unit info', paramsData);
    console.log('items data untuk unit info', itemsData);

    const dataPromo = [
        {title: 'tes', descs: 'ini decs', date: '27 agustus 2023'},
    ];

    const zoomImage = image => {
        console.log('array image zoom', image);
        setImageIndex(0);
        const data = [{uri: image}];

        console.log('arr url', data);

        setDataImage(data);
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
                title: 'Image News Apps Paradise Mobiles',
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

    // useEffect(() => {}, [toggled]);

    const toggledShowMore = () => {
        Animated.timing(height, {
            toValue: toggled ? 2 : 0,
            duration: 600,
        }).start();

        setToggled(toggled => !toggled);
    };

    const dataDummyDetails =
        'Lokasi terbaik, berada di Jantung Jakarta Selatan, di Perempatan Pangeran Antasari dan TB Simatupang. Akses mudah, dengan Akses JORR 1 dan 2, sehingga mudah menuju ke berbagai area sekitar lainnya. Semua yang kamu butuhkan tersedia, Fitness Center, kolam renang, serta fasilitas untuk anak-anak seperti sekolah, area playground dalam satu area tempat tinggal. Konsultasi kelas dunia, dalam merancang dan merencanakan produknya INPP berorientasi pada pendekatan yang berfokus pada konsumen. yang dihasilkan harus sesuai kebutuhan, Kebiasaan, dan kapabilitas konsumen. Tipe unit smart dan modern, selalu konsisten dalam mengimplementasikan startegi bisnis yang kreatif dan inovatifuntuk menghasilkan Iconic Lifestyle Destination.';

    return (
        <SafeAreaView
            edges={['right', 'top', 'left']}
            style={[
                BaseStyle.safeAreaView,
                {backgroundColor: BaseColor.whiteColor},
            ]}>
            <Header
                title={t('unit_info')}
                renderLeft={() => {
                    return (
                        <Icon
                            // name="angle-left"
                            name="arrow-left"
                            size={18}
                            color={BaseColor.corn70}
                            enableRTL={true}
                        />
                    );
                }}
                style={{height: 80}}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView
                style={{
                    marginHorizontal: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                        justifyContent: 'space-around',
                        // width: '100%',
                        marginHorizontal: 5,
                    }}>
                    <TouchableOpacity
                        onPress={() => zoomImage(paramsData.picture_url)}>
                        <View
                            style={{marginVertical: 10, marginHorizontal: 10}}>
                            <Image
                                // source={require('@assets/images/promonews/promo2.png')}
                                source={{uri: paramsData.picture_url}}
                                style={{
                                    width: 150,
                                    height: 150,
                                    resizeMode: 'cover',
                                    borderRadius: 15,
                                }}></Image>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: '50%',
                            marginVertical: 10,
                            marginHorizontal: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: Fonts.type.LatoBold,
                                color: BaseColor.corn70,
                            }}>
                            {paramsData.property_cd}
                        </Text>

                        <Text
                            numberOfLines={4}
                            style={{
                                marginTop: 5,
                                fontSize: 16,
                                fontFamily: Fonts.type.Lato,
                                color: BaseColor.corn70,
                            }}>
                            Unit {itemsData.lot_no}
                        </Text>
                        <View
                            style={{
                                marginVertical: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Icon
                                    style={{marginRight: 5}}
                                    name={'bed'}
                                    size={12}
                                    color={BaseColor.corn70}></Icon>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: Fonts.type.Lato,
                                        color: BaseColor.corn70,
                                    }}>
                                    {paramsData.qty_bedroom} Bedroom
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Icon
                                    style={{marginRight: 5}}
                                    name={'shower'}
                                    size={12}
                                    color={BaseColor.corn70}></Icon>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: Fonts.type.Lato,
                                        color: BaseColor.corn70,
                                    }}>
                                    {paramsData.qty_bathroom} Bathroom
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                }}>
                                {itemsData.build_up_area} SQM Nett /{' '}
                                {itemsData.land_area} SQM Semi gross
                            </Text>
                        </View>

                        {/* ----- di comment dulu karena data nya masih bingung ngambil yg mana  */}
                        {/* <Button
              onPress={() => setShowPromo(true)}
              style={{
                backgroundColor: BaseColor.corn50,
                height: 40,
                marginTop: 15,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: BaseColor.whiteColor,
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                }}>
                See gallery
              </Text>
            </Button> */}
                    </View>
                </View>

                {/* --- border  */}
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: BaseColor.corn30,
                        marginVertical: 20,
                    }}></View>

                <View>
                    <Text
                        style={{
                            fontFamily: Fonts.type.LatoBold,
                            color: BaseColor.corn70,
                            fontSize: 14,
                            //   marginVertical: 10,
                            marginTop: 5,
                            marginBottom: 15,
                        }}>
                        {t('unit_details')}
                    </Text>
                    {/* <Animated.View
            style={{
              // backgroundColor: 'blue',
              height: height.interpolate({
                inputRange: [0, 1],
                outputRange: [70, 200],
              }),
            }}>
            {console.log('togle', toggled)} */}
                    <Text
                        numberOfLines={4}
                        style={{
                            fontFamily: Fonts.type.Lato,
                            color: BaseColor.corn70,
                            fontSize: 14,
                            textAlign: 'justify',
                        }}>
                        {dataDummyDetails}
                    </Text>
                    {/* </Animated.View> */}

                    {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
                     */}
                    <TouchableOpacity onPress={() => setModalVisible()}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginVertical: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn90,
                                    marginBottom: 2,
                                    marginRight: 5,
                                    alignSelf: 'center',
                                    // alignContent: 'center',
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: BaseColor.corn90,
                                }}>
                                Show more
                            </Text>
                            <Icon
                                name="chevron-right"
                                size={14}
                                color={BaseColor.corn70}
                                enableRTL={true}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* --- border  */}
                <View
                    style={{
                        borderWidth: 0.3,
                        borderColor: BaseColor.corn30,
                        borderStyle: 'solid',
                        marginVertical: 20,
                    }}></View>

                <View>
                    <Text
                        style={{
                            fontFamily: Fonts.type.LatoBold,
                            color: BaseColor.corn70,
                            fontSize: 14,
                            //   marginVertical: 10,
                            marginTop: 5,
                            marginBottom: 15,
                        }}>
                        Room facility
                    </Text>

                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                            }}>
                            <Icon
                                style={{marginRight: 10}}
                                name={'bed'}
                                size={13}
                                color={BaseColor.corn70}></Icon>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                }}>
                                {paramsData.qty_bedroom} Bedroom
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                            }}>
                            <Icon
                                style={{marginRight: 15}}
                                name={'shower'}
                                size={13}
                                color={BaseColor.corn70}></Icon>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                }}>
                                {paramsData.qty_bathroom} Bathroom
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                            }}>
                            <Icon
                                style={{marginRight: 15}}
                                name={'archive'}
                                size={13}
                                color={BaseColor.corn70}></Icon>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                }}>
                                Kitchen table top & lower cabinet
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                            }}>
                            <Icon
                                style={{marginRight: 15}}
                                name={'fire-alt'}
                                size={13}
                                color={BaseColor.corn70}></Icon>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                }}>
                                Stove
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                            }}>
                            <Icon
                                style={{marginRight: 15}}
                                name={'fax'}
                                size={13}
                                color={BaseColor.corn70}></Icon>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                }}>
                                Telephone & Internet outlet
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                            }}>
                            <Icon
                                style={{marginRight: 15}}
                                name={'pager'}
                                size={13}
                                color={BaseColor.corn70}></Icon>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                }}>
                                Air Conditioner
                            </Text>
                        </View>
                    </View>
                </View>

                {/* --- border  */}
                <View
                    style={{
                        borderWidth: 0.3,
                        borderColor: BaseColor.corn30,
                        borderStyle: 'solid',
                        marginVertical: 20,
                    }}></View>

                {/* <View>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              fontSize: 14,
              //   marginVertical: 10,
              marginTop: 5,
              marginBottom: 15,
            }}>
            Unit Plan
          </Text>
          <TouchableOpacity
            onPress={() =>
              zoomImage(require('@assets/images/floorplan/STD-1.jpg'))
            }>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'contain',
              width: '100%',
              height: 200,
            }}
            source={require('@assets/images/floorplan/STD-1.jpg')}></Image>
          </TouchableOpacity>
        </View> */}
            </ScrollView>
            <ImageViewing
                images={dataImage}
                imageIndex={currentImageIndex}
                presentationStyle="overFullScreen"
                visible={isVisible}
                onRequestClose={onRequestClose}
                onLongPress={onLongPress}
                HeaderComponent={
                    paramsData === paramsData
                        ? ({imageIndex}) => {
                              //   const title = get(
                              //       dataImage,
                              //       `${imageIndex}.title`,
                              //   );
                              const title = paramsData.property_cd;
                              const ima = paramsData.picture_url;

                              console.log('title header', title);
                              console.log('ima header', ima);

                              return (
                                  <ImageHeader
                                      title={title}
                                      onRequestClose={onRequestClose}
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
                                    paddingTop: StatusBar.currentHeight,
                                    marginLeft: 40,
                                    bottom: 40,
                                },
                                ios: {marginLeft: 40, bottom: 40},
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

            <UnitInfoModal
                onRequestClose={() => {
                    setShowPromo(false);
                }}
                visible={showPromo}
                icon={
                    <TouchableOpacity onPress={() => setShowPromo(false)}>
                        <Icon
                            name={'arrow-left'}
                            size={18}
                            color={BaseColor.corn90}></Icon>
                    </TouchableOpacity>
                }
                datas={dataPromo}></UnitInfoModal>
            <UnitInfoDetailsModal
                onRequestClose={() => {
                    setModalVisible(false);
                }}
                visible={modalVisibile}
                icon={
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Icon
                            name={'arrow-left'}
                            size={18}
                            color={BaseColor.corn90}></Icon>
                    </TouchableOpacity>
                }
                datas={dataDummyDetails}></UnitInfoDetailsModal>
            <CustomAlert
                {...props}
                onRequestClose={() => {
                    setShowAlert(false);
                }}
                visible={showAlert}
                handleSaveSuccess={handleSaveSuccess}
                icon={
                    <TouchableOpacity onPress={() => setShowAlert(false)}>
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
                                    justifyContent: 'space-between',
                                }}>
                                <View
                                    style={{
                                        marginHorizontal: 25,
                                        alignItems: 'flex-end',
                                        flex: 1,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => setSuksesAlert(false)}>
                                        <Text
                                            style={{
                                                fontFamily: Fonts.type.Lato,
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
        </SafeAreaView>
    );
};

export default UnitInfo;
