import {Text, Button, Icon} from '@components';
// import Image from '../../../../components/Image';
import {
  View,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useIsFocused} from '@react-navigation/native';
import entities from 'entities';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
const Surrounding = props => {
  const {onPress, datas, icon, ...attrs} = props;
  const systemFonts = [...defaultSystemFonts, global.fontRegular];
  const {width} = useWindowDimensions().width;
  const {widthRender} = useWindowDimensions();
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);

  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  // const [setdatasFilter, setDataFilter] = useState([]);
  const isFocused = useIsFocused();

  let type = datas.map((item, i) => {
    return item.amenities_type;
  });
  console.log('type amen', type);
  const setDataFilter = [];
  const datasFilter = new Set(
    datas.reduce((all, foo) => [...all, ...foo.amenities_type], []),
  );
  setDataFilter.push(...datasFilter);
  console.log('cekk', ...datasFilter); //untuk memfilter amenities type aja dan jgn ada yang sama
  console.log('cekk tess', setDataFilter); //untuk memfilter amenities type aja dan jgn ada yang sama

  return (
    <ScrollView>
      <Modal {...attrs} animationType="slide" transparent={false}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: BaseColor.whiteColor,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingBottom: 30,
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
                  Surrounding Area
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

            <ScrollView
              style={{
                marginTop: 10,
                // backgroundColor: 'yellow',
              }}>
              <View style={{marginBottom: 10, marginLeft: 15}}>
                {setDataFilter.map((itemType, indexType) => (
                  <View key={indexType} style={{marginBottom: 10}}>
                    <View
                      style={[styles.badgeSurrounding, {marginVertical: 5}]}>
                      <Icon
                        name={
                          itemType == 'I'
                            ? 'bus'
                            : itemType == 'S'
                            ? 'school'
                            : itemType == 'H'
                            ? 'hospital'
                            : itemType == 'O'
                            ? 'store'
                            : 'time'
                        }
                        size={16}
                        color={BaseColor.corn70}
                        style={{margin: 5}}></Icon>

                      <View
                        style={{
                          borderBottomColor: BaseColor.corn70,
                          borderBottomWidth: 1,
                          borderStyle: 'solid',
                        }}>
                        <Text style={styles.textBold}>
                          {itemType == 'I'
                            ? 'INFRASTRUCTURE'
                            : itemType == 'S'
                            ? 'SCHOOL'
                            : itemType == 'H'
                            ? 'HOSPITAL'
                            : itemType == 'O'
                            ? 'SHOPPING'
                            : '.'}
                        </Text>
                      </View>
                    </View>
                    {datas.map((item, index) => (
                      <View style={{marginTop: 0}} key={index}>
                        {itemType === item.amenities_type ? (
                          <RenderHtml
                            contentWidth={widthRender}
                            source={{html: item.amenities_info}}
                            systemFonts={systemFonts}
                            tagsStyles={{
                              p: {
                                color: BaseColor.corn70,
                                fontSize: 12,
                                fontFamily: Fonts.type.LatoBold,
                                textAlign: 'justify',
                              },
                              img: {
                                paddingVertical: 20,
                              },
                              li: {
                                // color: isDarkMode ? 'blue' : 'red',
                                color: BaseColor.corn70,
                                fontSize: 12,
                                fontFamily: Fonts.type.LatoBold,
                              },
                            }}
                          />
                        ) : // <Text style={[styles.text, {marginLeft: 20}]}>
                        //   {hasATag(item.amenities_info)}
                        //   {/* {item.amenities_info.replace(
                        //     /<(?!a\s*\/?)[^>]+>/g,
                        //     '',
                        //   )} */}
                        //   {/* {item.amenities_info
                        //     // .replace(/(<([^>]+)>)/gi, '')
                        //     .replace(
                        //       /<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim,
                        //       '',
                        //     )
                        //     .replace(/(&nbsp;)/g, ' ')
                        //     .replace(/(&ndash;)/g, '-')
                        //     .replace(/(&amp;)/g, `&`)} */}
                        // </Text>
                        null}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
      </Modal>
    </ScrollView>
  );
};

export default Surrounding;
