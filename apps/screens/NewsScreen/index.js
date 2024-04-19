import {Text, Header, Icon} from '@components';

import {
    useWindowDimensions,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    RefreshControl,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
import NewsModal from './Modal/NewsModal';
import moment from 'moment';

import dummy_news from './dummy_news.json';
const NewsScreen = props => {
    const {navigation} = props;
    const {t} = useTranslation();
    const user = useSelector(state => getUser(state));
    const [loading, setLoading] = useState(true);
    const [showNews, setShowNews] = useState(false);
    const [dataNews, setDataNews] = useState([]);
    const [dataProject, setDataProject] = useState([]);
    const [paramsData, setParamsData] = useState(props.route.params);
    console.log('params data', paramsData);
    const {width} = useWindowDimensions();
    const [itemsParams, setItemsParams] = useState();
    const [dummyNews, setDummyNews] = useState(dummy_news.Data);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getProject();

        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getProject();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    const getProject = () => {
        try {
            const config = {
                method: 'get',
                // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
                url: API_URL + '/project/index',
                headers: {
                    'content-type': 'application/json',
                    // 'X-Requested-With': 'XMLHttpRequest',
                    Authorization: `Bearer ${user.Token}`,
                },
                // params: {approval_user: user.userIDToken.UserId},
                // params: {entity_cd: entity_cd, project_no: project_no},
                params: {email: user.user},
            };
            // console.log('formdaata get lot type', config);
            axios(config)
                .then(result => {
                    // const pasing = dummy_news;
                    const pasing = result.data.Data;
                    const newDataArray = []; // Membuat array baru untuk menyimpan data baru

                    pasing.forEach(item => {
                        // Untuk setiap item, buat objek baru yang hanya berisi entity_cd dan project_no
                        const newDataItem = {
                            entity_cd: item.entity_cd,
                            project_no: item.project_no,
                            rowID: item.rowID,
                            project_descs: item.project_descs,
                        };
                        // Tambahkan objek baru ke dalam array newDataArray
                        newDataArray.push(newDataItem);
                    });

                    // console.log('newDataArray:', newDataArray);
                    // Anda sekarang memiliki newDataArray yang hanya berisi entity_cd dan project_no dari setiap item dalam pasing
                    // Anda dapat menggunakan newDataArray sesuai kebutuhan, misalnya, menetapkannya ke setDataProject
                    setDataProject(newDataArray);

                    getDataNews(newDataArray);
                    // setDataProject(pasing);
                })
                .catch(error =>
                    console.log('error getdata project error', error),
                );
        } catch (error) {
            console.log('ini konsol eror project', error);
        }
    };

    const getDataNews = dataFilter => {
        try {
            const config = {
                method: 'get',
                // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
                url: API_URL + '/news/index',
                headers: {
                    'content-type': 'application/json',
                    // 'X-Requested-With': 'XMLHttpRequest',
                    Authorization: `Bearer ${user.Token}`,
                },
                // params: {approval_user: user.userIDToken.UserId},
                // params: {entity_cd: entity_cd, project_no: project_no},
                params: {},
            };
            // console.log('formdaata get lot type', config);
            axios(config)
                .then(result => {
                    // const pasing = dummy_news;
                    const pasing = result.data.Data;
                    // console.log('passinngg', pasing);
                    var detail = [];
                    pasing.filter(entity => {
                        let array = Array.isArray(entity.detail);
                        if (array === true) {
                            entity.detail.forEach(x => {
                                //----- Filter dibawah ini berfungsi untuk memfilter berdasarkan status dan type news..
                                // if (
                                //   x.status === 'Active' &&
                                //   (x.type == entity.project_no || x.type === 'General')
                                // ) {
                                //   console.log('nilai x', x);
                                //   detail.push(x);
                                // }
                                // Penggunaan operator ternary untuk validasi dan push data ke dalam array
                                x.status === 'Active' &&
                                (x.type === entity.project_no ||
                                    x.type === 'General')
                                    ? // (x.type === entity.project_no || x.type === 'General')
                                      detail.push(x)
                                    : null;
                                // console.log('xxx', x);
                                // console.log('x detail', detail);
                            });
                        }
                    });

                    // console.log('detail doang', detail);

                    var filteredData = pasing;

                    // ----- Syntax seperti diatas ini adalah untuk menampilkan semua object array Data, jika ini diganti dengan yang bawah, berarti yang tidak memiliki detail array akan hilang dari object array
                    // pasing.filter(entity => Array.isArray(entity.detail) && entity.detail.some(detail => detail.status === 'Active' && (detail.type === 'General' || detail.type === '0321')));

                    //  ----
                    const filteredDataDetail = []; // Untuk menyimpan data yang telah difilter
                    let count = 0; // Menghitung jumlah data yang sudah difilter

                    // Melakukan looping pada data dan menerapkan validasi

                    // ----
                    filteredData.forEach(element => {
                        let array = Array.isArray(element.detail);
                        // console.log('array di filterforeach', array);
                        // console.log('detail yang mau dimasukin', detail);
                        if (array) {
                            // Menghapus semua elemen dari element.detail dan menambahkan elemen dari variabel detail
                            // element.detail.splice(0, element.detail.length, ...detail);
                            // element.detail = detail; // Mengganti isi element.detail dengan nilai dari variabel detail

                            for (let i = 0; i < element.detail.length; i++) {
                                const item = element.detail[i];
                                // Validasi status dan tipe yang diinginkan
                                if (
                                    item.status === 'Active' &&
                                    (element.type === item.type ||
                                        item.type === 'General')
                                ) {
                                    filteredDataDetail.push(item); // Menambahkan item ke dalam array filteredData
                                    count++; // Menambah jumlah data yang sudah difilter
                                }
                                // Berhenti jika sudah mencapai jumlah maksimal 3 data
                                if (count === 3) {
                                    break;
                                }
                            }
                        }
                    });

                    console.log('filteredDataDetail', filteredDataDetail);
                    // Dalam contoh di atas, kami melakukan looping pada topData menggunakan for loop. Setiap item diperiksa apakah memenuhi kriteria validasi yang diinginkan (status 'Active' dan tipe '0321' atau 'General'). Jika memenuhi kriteria, item tersebut ditambahkan ke dalam array filteredData. Kami juga menggunakan variabel count untuk menghitung jumlah data yang sudah difilter. Proses dihentikan jika jumlah data yang difilter sudah mencapai maksimal 3.

                    setDataNews(filteredData);
                })
                .catch(error => console.log('error getdata news error', error));
        } catch (error) {
            console.log('ini konsol eror news', error);
        }
    };

    const showModalNews = item => {
        console.log('item modal news', item);
        setShowNews(true);
        setItemsParams(item);
    };

    const closeShowModalNews = () => {
        setShowNews(false);
    };

    const DetailNews = (item, key) => {
        // console.log('keyy', item.length);

        return (
            <TouchableOpacity
                key={item.rowID}
                onPress={() => showModalNews(item)}
                style={{marginVertical: 10}}>
                <View
                    style={{
                        backgroundColor: BaseColor.corn10,
                        borderRadius: 15,
                        // width: '100%',
                        marginHorizontal: 20,
                        // flex: 1,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // justifyContent: 'space-evenly',
                            justifyContent: 'space-around',
                            // width: '100%',
                            marginHorizontal: 5,
                        }}>
                        <View
                            style={{
                                width: '50%',
                                marginVertical: 10,
                                marginHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: Fonts.type.LatoBold,
                                    color: BaseColor.corn70,
                                    // textAlign: 'justify',
                                }}>
                                {item.news_title}
                            </Text>

                            <Text
                                numberOfLines={4}
                                style={{
                                    marginTop: 5,
                                    fontSize: 12,
                                    fontFamily: Fonts.type.Lato,
                                    color: BaseColor.corn70,
                                    // textAlign: 'justify',
                                }}>
                                {item.news_descs
                                    .replace(
                                        /<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim,
                                        '',
                                    )
                                    .replace(/(&nbsp;)/g, ' ')
                                    .replace(/(&ndash;)/g, '-')
                                    .replace(/(&amp;)/g, `&`)}
                            </Text>

                            <View
                                style={{
                                    justifyContent: 'flex-end',
                                    flex: 1,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontFamily: Fonts.type.Lato,
                                        color: BaseColor.corn50,
                                    }}>
                                    {moment(item.date_created).format(
                                        'MMMM Do YYYY',
                                    )}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                marginVertical: 10,
                                marginHorizontal: 10,
                            }}>
                            <Image
                                source={{
                                    uri: item.url_image,
                                }}
                                // source={require('@assets/images/promonews/promo2.png')}
                                style={{
                                    width: 150,
                                    height: 150,
                                    resizeMode: 'cover',
                                    borderRadius: 15,
                                }}></Image>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    // console.log(
    //   'dataNews : ',
    //   dataNews.map(x =>
    //     x.detail != '' || undefined
    //       ? x.detail
    //           .slice(0, 3)
    //           .map(y =>
    //             x.project_no == y.type
    //               ? console.log('y descs : ', y.entity_cd)
    //               : null,
    //           )
    //       : null,
    //   ),
    // );

    // const dataNews = [{title: 'tes', descs: 'ini decs', date: '27 agustus 2023'}];
    return (
        <SafeAreaView
            edges={['right', 'top', 'left']}
            style={[
                BaseStyle.safeAreaView,
                {
                    backgroundColor: BaseColor.whiteColor,
                },
            ]}>
            <Header
                title={t('news')}
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
                style={{marginBottom: 20}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {dataNews.length != 0 ? (
                    dataNews.map((item, index) => (
                        <View key={index}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    padding: 10,
                                }}>
                                <Icon
                                    name={'city'}
                                    size={18}
                                    color={BaseColor.corn70}
                                    style={{
                                        marginRight: 10,
                                    }}></Icon>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: Fonts.type.LatoBold,
                                        color: BaseColor.corn70,
                                    }}>
                                    {item.descs}
                                </Text>
                            </View>

                            {item.detail != '' || undefined ? (
                                item.detail.length > 3 ? (
                                    <>
                                        {item.detail.map(tops =>
                                            tops.status == 'Active' &&
                                            (item.project_no == tops.type ||
                                                tops.type == 'General') ? (
                                                <>
                                                    {/* <Text>{tops.project_no}</Text> */}
                                                    <>{DetailNews(tops)}</>
                                                </>
                                            ) : // <Text>ini tidak sesuai kriteria?</Text>
                                            null,
                                        )}

                                        <View
                                            style={{
                                                alignItems: 'center',
                                            }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    item.detail != '' ||
                                                    undefined
                                                        ? item.detail.map(
                                                              eachDetail =>
                                                                  eachDetail.status ==
                                                                      'Active' &&
                                                                  (item.project_no ==
                                                                      eachDetail.type ||
                                                                      eachDetail.type ==
                                                                          'General')
                                                                      ? navigation.navigate(
                                                                            'MoreDetailNews',
                                                                            {
                                                                                project_no:
                                                                                    item.project_no,
                                                                                detail: item.detail,
                                                                            },
                                                                        )
                                                                      : null,
                                                          )
                                                        : null
                                                }>
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            Fonts.type.Lato,
                                                        fontSize: 14,
                                                        color: BaseColor.corn50,
                                                    }}>
                                                    More...
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : (
                                    item.detail.map(y =>
                                        (y.status == 'Active' &&
                                            item.project_no == y.type) ||
                                        (y.status == 'Active' &&
                                            y.type == 'General')
                                            ? DetailNews(y)
                                            : null,
                                    )
                                )
                            ) : (
                                <View
                                    style={{
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: Fonts.type.Lato,
                                            color: BaseColor.corn70,
                                        }}>
                                        Please come back later for the latest
                                        news
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))
                ) : (
                    <View
                        style={{
                            backgroundColor: BaseColor.corn10,
                            borderRadius: 15,
                            // width: '100%',
                            marginHorizontal: 20,
                            // flex: 1,
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: Fonts.type.Lato,
                                color: BaseColor.corn70,
                            }}>
                            Data not available
                        </Text>
                    </View>
                )}
            </ScrollView>

            <NewsModal
                onRequestClose={() => {
                    setShowNews(false);
                }}
                visible={showNews}
                icon={
                    <TouchableOpacity onPress={() => setShowNews(false)}>
                        <Icon
                            name={'arrow-left'}
                            size={18}
                            color={BaseColor.corn90}></Icon>
                    </TouchableOpacity>
                }
                datas={itemsParams}></NewsModal>
        </SafeAreaView>
    );
};

export default NewsScreen;
