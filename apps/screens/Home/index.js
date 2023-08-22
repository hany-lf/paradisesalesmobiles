import {View} from 'react-native';
import {Button, Text} from '@components';
import {BaseColor} from '@config';
import {useDispatch, useSelector} from 'react-redux';
import {UserAuth} from '@actions';
import getUser from '../../selectors/UserSelectors';
import React, {useState, useEffect} from 'react';
const Home = props => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {authentication} = UserAuth;
  const {navigation} = props;
  const user = useSelector(state => getUser(state));

  useEffect(() => {
    if (user == null) {
      props.navigation.navigate('SignIn');
    }
  }, [user]);

  const onLogOut = () => {
    setLoading(true);
    dispatch(
      authentication(false, response => {
        setLoading(false);
      }),
    );
  };
  return (
    <View>
      <Text>ini home ya</Text>
      <Button onPress={() => onLogOut()} outline style={{borderRadius: 24}}>
        <Text style={{color: BaseColor.green90}}>Logout</Text>
      </Button>
    </View>
  );
};
export default Home;
