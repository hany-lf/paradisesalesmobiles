import {Text, Button, Icon} from '@components';
import {View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';

const Features = props => {
  const {onPress, datas, visibleMod, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  console.log('visiblemodal', visibleMod);
  const [visibleModal, setVisibleModal] = useState(visibleMod);
  console.log('visiblemodaldifeature', visibleModal);

  const close = () => {
    setVisibleModal(false);
  };
  return (
    <Modal {...attrs} animationType="slide" transparent={true}>
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
                Feature
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

          <View style={{marginHorizontal: 30, marginVertical: 20}}>
            <Text style={{textAlign: 'justify', fontFamily: Fonts.type.Lato}}>
              Lorem ipsum dolor sit amet consectetur. Nibh scelerisque tristique
              facilisi lectus ullamcorper. Commodo sed egestas ut ullamcorper
              vulputate enim dui. Nec tristique venenatis euismod ut volutpat
              sapien consectetur eu. Ornare pharetra netus pellentesque sit at
              aliquam scelerisque. Non aliquet libero bibendum sagittis est
              sapien tempor. Viverra nullam mollis nulla lacus scelerisque. Est
              magna massa libero orci egestas. Nibh in et egestas odio platea
              sit. Nulla adipiscing aliquet ac hac aliquam nunc neque. Sed
              euismod leo adipiscing donec metus pretium fermentum in. Euismod
              turpis ullamcorper egestas lorem. Ut tellus posuere lacus pharetra
              orci et ac. Curabitur massa volutpat ac volutpat porttitor. Amet
              venenatis neque tempus dui ultrices viverra. Orci sit adipiscing
              congue lectus eu consectetur ornare. Dignissim ullamcorper lacinia
              eget porttitor volutpat dui faucibus. Dictum quam convallis in
              suspendisse diam volutpat diam. Rutrum tempus suspendisse nunc
              aliquam scelerisque mauris integer sit arcu. Egestas sagittis
              velit nunc dolor praesent. Diam sem maecenas eleifend ut. Tellus
              pretium vestibulum nisi ac urna neque viverra ac. Viverra fames
              scelerisque laoreet nisi ut viverra. Nunc nunc ipsum nisl mi
              facilisis mattis ac. Mi sed est ut non lobortis. Dignissim elit
              molestie vulputate pellentesque phasellus diam turpis leo.
            </Text>
          </View>
        </View>
      </View>

      {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
    </Modal>
  );
};

export default Features;
