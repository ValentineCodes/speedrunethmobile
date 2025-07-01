import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { COLORS } from '../../utils/constants';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/styles';
import DebugContracts from '../DebugContracts';
import Events from '../Events';
import Home from '../Home';
import Settings from '../Settings';
import Wallet from '../Wallet';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          paddingBottom: 0,
          height: WINDOW_HEIGHT * 0.07
        },
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarItemStyle: { marginVertical: 5 }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Ionicons
                  name="home"
                  color={COLORS.primary}
                  size={WINDOW_WIDTH * 0.06}
                />
              ) : (
                <Ionicons
                  name="home-outline"
                  color={'grey'}
                  size={WINDOW_WIDTH * 0.06}
                />
              )}
            </>
          )
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Ionicons
                  name="flash"
                  color={COLORS.primary}
                  size={WINDOW_WIDTH * 0.06}
                />
              ) : (
                <Ionicons
                  name="flash-outline"
                  color={'grey'}
                  size={WINDOW_WIDTH * 0.06}
                />
              )}
            </>
          )
        }}
      />
      <Tab.Screen
        name="DebugContracts"
        component={DebugContracts}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Ionicons
                  name="bug"
                  color={COLORS.primary}
                  size={WINDOW_WIDTH * 0.06}
                />
              ) : (
                <Ionicons
                  name="bug-outline"
                  color={'grey'}
                  size={WINDOW_WIDTH * 0.06}
                />
              )}
            </>
          )
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Ionicons
                  name="wallet"
                  color={COLORS.primary}
                  size={WINDOW_WIDTH * 0.06}
                />
              ) : (
                <Ionicons
                  name="wallet-outline"
                  color={'grey'}
                  size={WINDOW_WIDTH * 0.06}
                />
              )}
            </>
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Ionicons
                  name="settings"
                  color={COLORS.primary}
                  size={WINDOW_WIDTH * 0.06}
                />
              ) : (
                <Ionicons
                  name="settings-outline"
                  color={'grey'}
                  size={WINDOW_WIDTH * 0.06}
                />
              )}
            </>
          )
        }}
      />
    </Tab.Navigator>
  );
}
