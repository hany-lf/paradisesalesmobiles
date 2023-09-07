import {View} from 'react-native';
import {Text, Header, Icon, Button} from '@components';
import {BaseStyle, BaseColor, BaseSetting} from '@config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {TextInput, TextInputNumber} from '@components';
import {Fonts} from '@config';
import React, {useCallback, useEffect, useState, useRef} from 'react';

const CalculatorScreen = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  const [credit_total, setCreditTotal] = useState(0);
  const [bank_rate, setBankRate] = useState(0);
  const [time_years, setTimeYears] = useState('');
  const [isCount, setIsCount] = useState(false);
  const [angsuran, setAngsuran] = useState(0);
  const count = () => {
    //  const {totalCredit, bunga, time} = this.state;
    let kredit = unFormat(credit_total);
    let bunga1 = bank_rate / 1200;
    let waktu = time_years * 12;

    const angsuran1 = Math.round(
      kredit * bunga1 * (1 / (1 - 1 / Math.pow(1 + bunga1, waktu))),
    );

    console.log('angsuran ', angsuran1);
    setIsCount(true);
    setAngsuran(format(angsuran1));
    //  this.setState({isCount: true, angsuran: this.format(angsuran1)});
  };

  const format = angka => {
    const data = Math.floor(angka);
    if (angka == null) {
      return '-';
    }
    let val = unFormat(angka);
    return val.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  };

  const unFormat = value => {
    let a = value.toString().replace(/^0+/, '').replace(/\D/g, '');
    return a;
  };
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('calculator') + ' KPA/R'}
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

      <View>
        {/* <TextInput ></TextInput> */}
        <View style={{marginHorizontal: 15}}>
          <TextInputNumber
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={text => setCreditTotal(format(text))}
            autoCorrect={false}
            placeholder={t('credit_total') + ' ( IDR )'}
            value={credit_total}
            keyboardType="numeric"
            selectionColor={BaseColor.corn70}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            alignSelf: 'center',
            // width: '100%',
            // flex: 1,
          }}>
          <TextInputNumber
            style={[
              BaseStyle.textInput,
              {marginBottom: 0, width: '45%', margin: 5},
            ]}
            onChangeText={text => setBankRate(text)}
            autoCorrect={false}
            placeholder={t('bank_rate') + ' ( % )'}
            value={bank_rate}
            keyboardType="numeric"
            selectionColor={BaseColor.corn70}
          />

          <TextInput
            style={[
              BaseStyle.textInput,
              {marginBottom: 0, width: '45%', margin: 5},
            ]}
            onChangeText={text => setTimeYears(text)}
            autoCorrect={false}
            placeholder={t('time') + ' ( Years )'}
            value={time_years}
            selectionColor={BaseColor.corn70}
          />
        </View>

        <View>
          <Button
            onPress={() => count()}
            style={{
              backgroundColor: BaseColor.yellowColor,
              marginHorizontal: 15,
              marginVertical: 25,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: Fonts.type.Lato,
                color: BaseColor.whiteColor,
              }}>
              Count
            </Text>
          </Button>
        </View>
      </View>
      {isCount ? (
        <View
          style={{
            // flex: 1,
            marginHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 5,
            backgroundColor: '#f3f3f3',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#999',
              flexWrap: 'wrap',
              //   flex: 1,
              textAlign: 'center',
            }}>
            jumlah angsuran
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              flexWrap: 'wrap',
              //   flex: 1,
              textAlign: 'center',
            }}>
            {angsuran}
          </Text>
        </View>
      ) : null}
      <View
        style={{
          marginHorizontal: 35,
          justifyContent: 'center',
          marginTop: 100,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 13,
            color: BaseColor.corn50,
            fontFamily: Fonts.type.Lato,
          }}>
          * The rate above are estimated rate, for more accuracy please contact
          the relevant bank.
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default CalculatorScreen;
