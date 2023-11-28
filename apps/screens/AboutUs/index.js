import {Text, SafeAreaView, Header, Icon} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import data_about from './data_aboutus.json';
import {ScrollView} from 'react-native-gesture-handler';
const AboutUs = props => {
  const {t} = useTranslation();
  const systemFonts = [...defaultSystemFonts, global.fontRegular];
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const {width} = useWindowDimensions().width;
  console.log('descs', data_about.data_about[0].descs);
  //   const source = {
  //     // html: data_about.data_about[0].descs,
  //     html: data_about.data_about,
  //   };

  const source = data_about.data_about;
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('about_us')}
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
      <ScrollView>
        <View style={{marginHorizontal: 20, flex: 1}}>
          {source.map((item, index) => {
            console.log('item source', item.descs);
            return (
              <View>
                <RenderHtml
                  contentWidth={width}
                  source={{html: item.descs}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                    },
                  }}
                />

                <Text style={{fontFamily: Fonts.type.LatoBold, fontSize: 15}}>
                  Our Contact
                </Text>
                <RenderHtml
                  contentWidth={width}
                  source={{html: item.contact}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                    },
                  }}
                />

                <RenderHtml
                  contentWidth={width}
                  source={{html: item.email}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                    },
                  }}
                />

                <RenderHtml
                  contentWidth={width}
                  source={{html: item.phone}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                    },
                  }}
                />
              </View>
            );
            // (

            // )
          })}
          {/* <RenderHtml contentWidth={width} source={source}  /> */}
          {/* <Text style={{textAlign: 'justify'}}>
          Explore the archipelago`s most exciting and iconic properties,
          presented by Paradise Indonesia. For over 20 years, we have been
          change makers and purposeful pioneers. We take risks for a chance to
          better lives and impact communities by elevating spaces and
          experiences. Discover what we have to offer and how we are bringing
          Paradise`s unique brand of delight across Indonesia`s major urban
          cities. Since our humble beginnings in 2002, our journey has been
          guided by a passion for developing spaces that transcend the visual
          and the functional, towards finding new and exciting ways to deliver
          exceptional consumer satisfaction and market fit. Since then, we have
          established a reputation for visionary projects that successfully
          deliver elevated spaces, curated experiences, and lasting impressions
          that draw people to return again and again. Today, our imaginative
          lifestyle projects offer inspiring designs that invite, engage, and
          result in vibrant developments that become destinations and landmarks
          in their own right.
        </Text>
        <Text>Our Contact</Text>
        <Text>
          PT Indonesian Paradise Property Tbk & Subsidiaries Centennial Tower,
          30th Floor Jl. Gatot Subroto Kav. 24-25 Jakarta 12930, Indonesia
        </Text>
        <Text>
          info@paradiseindonesia.com corporate.secretary@paradiseindonesia.com
          investor.relations@paradiseindonesia.com
        </Text>
        <Text>Tel (62-21) 29880466 Fax (62-21) 29880460</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AboutUs;
