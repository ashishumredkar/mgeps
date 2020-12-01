import React, { Component } from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,SafeAreaView
  } from '@react-navigation/drawer';
import { Avatar, Divider, Icon, Overlay } from 'react-native-elements';
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

class CustomDrawerContentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
          userSelected: [],
          devModalVisible: false,
          confirmLogoutModal: false,
         
        };
      }
    
    
      toggleDevModal = () => {
        const { navigation } = this.props;
        const { devModalVisible } = this.state;
        navigation.closeDrawer();
        this.setState({ devModalVisible: !devModalVisible });
      }
    
      toggleLogoutModal = () => {
        const { navigation } = this.props;
        const { confirmLogoutModal } = this.state;
        navigation.closeDrawer();
        this.setState({ confirmLogoutModal: !confirmLogoutModal });
      }
    
      renderDeveleperModal = () => {}
    
      renderLogoutConfirmationModal = () => {
        const { logoutAUser, theme } = this.props;
        const { confirmLogoutModal } = this.state;
        return (
          <Overlay
            isVisible={confirmLogoutModal}
            height={120}
            windowBackgroundColor='rgba(0, 0, 0, .65)'
            onBackdropPress={this.toggleLogoutModal}
          >
            <View>
              <Text style={styles.headerText}>
                Are you sure you want to logout ?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.toggleLogoutModal}>
                  <Text style={[{ color: '#007f39' }, styles.actionText]}>CLOSE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logoutAUser}>
                  <Text style={[{ color: '#007f39' }, styles.actionText]}>Yes, LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        );
      }
    
      render() {
        const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
    
        return (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <SafeAreaView
                style={styles.container}
                forceInset={{ top: 'always', horizontal: 'never' }}
              >
                <View style={[ styles.containHeader, { backgroundColor: '#009145'}]}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
                    <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>test</Text>
                    <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>ashish</Text>
                  </View>
                </View>

                { this.renderDeveleperModal() }
                { this.renderLogoutConfirmationModal() }
    
                {/* <DrawerItems {...this.props} /> */}
                <DrawerItemList {...this.prop} labelStyle={{color:'black'}}/>

    
                <View>
                  <View style={{ marginTop: '2%' }}>
                    <Divider style={{ backgroundColor: '#777f7c90' }} />
                  </View>
                  <View style={{ marginTop: '3%' }}>
                    {/* <ColorPalette /> */}
                  </View>
                  <View style={{ marginTop: '5%' }}>
                    <Divider style={{ backgroundColor: '#777f7c90' }} />
                  </View>
                </View>
              </SafeAreaView>
            </ScrollView>
            <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
              <TouchableNativeFeedback onPress={this.toggleLogoutModal} background={ripple}>
                <View style={styles.containDrawerOption}>
                  <Icon
                    name='logout'
                    type='simple-line-icon'
                    size={20}
                    color={'#009145'}
                    containerStyle={{ marginRight: '10%' }}
                  />
                  <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.toggleDevModal} background={ripple}>
                <View style={styles.containDrawerOption}>
                  <Icon
                    name='user-secret'
                    type='font-awesome'
                    size={24}
                    color={'#009145'}
                    containerStyle={{ marginRight: '10%' }}
                  />
                  <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
                </View>
              </TouchableNativeFeedback>
    
            </View>
          </View>
        );
      }
    }
    export default CustomDrawerContentComponent;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      containHeader: {
        paddingTop: '4%',
        paddingBottom: '4%'
      },
      containDrawerOption: {
        paddingLeft: '6%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '1%',
        paddingBottom: '5%',
        backgroundColor: '#e6e6e6',
      },
      headerText: {
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontWeight: '600',
      },
      buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50
      },
      actionText: {
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontWeight: '600',
        marginRight: '3%',
        marginLeft: '3%',
      },
      closeBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 17,
      },
      closeText: {
        fontFamily: 'sans-serif-medium',
        fontWeight: '600',
        marginRight: '3%',
        marginLeft: '3%',
      }
    });
