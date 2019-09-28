import React from "react";
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import { BaseColor, BaseStyle } from "@config";
import { Icon } from "@components";
import * as Utils from "@utils";

/* Bottom Screen */
import Home from "@screens/Home";
import MyLearning from "@screens/MyLearning";
import Library from "@screens/Library";
import Calendar from "@screens/Calendar";
import Profile from "@screens/Profile";
/* Modal Screen only affect iOS */
import Filter from "@screens/Filter";
import Search from "@screens/Search";
import SearchHistory from "@screens/SearchHistory";
import PreviewImage from "@screens/PreviewImage";
import Notification from "@screens/Notification";
import Walkthrough from "@screens/Walkthrough";
import SignUp from "@screens/SignUp";
import HotelDetail from "@screens/LibraryDetail";

import PostDetail from "@screens/PostDetail";
import Post from "@screens/Post";
import Coupons from "@screens/Coupons";

// Transition for navigation by screen name
const handleCustomTransition = ({ scenes }) => {
    const nextScene = scenes[scenes.length - 1].route.routeName;
    switch (nextScene) {
        case "PreviewImage":
            Utils.enableExperimental();
            return Utils.zoomIn();
        default:
            return false;
    }
};

// Config for bottom navigator
const bottomTabNavigatorConfig = {
    initialRouteName: "Home",
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: BaseColor.primaryColor,
        inactiveTintColor: BaseColor.grayColor,
        style: BaseStyle.tabBar,
        labelStyle: {
            fontSize: 12
        }
    }
};

// Tab bar navigation 
const routeConfigs = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: "Home",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="home" size={20} solid />;
            }
        })
    },
    MyLearning: {
        screen: MyLearning,
        navigationOptions: ({ navigation }) => ({
            title: "MyLearning",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        color={tintColor}
                        name="tasks"
                        size={20}
                        solid
                    />
                );
            }
        })
    },
    Library: {
        screen: Library,
        navigationOptions: ({ navigation }) => ({
            title: "Library",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        solid
                        color={tintColor}
                        name="book"
                        size={20}
                        solid
                    />
                );
            }
        })
    },
    Calendar: {
        screen: Calendar,
        navigationOptions: ({ navigation }) => ({
            title: "Calendar",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="calendar" size={20} solid />;
            }
        })
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: "Profile",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon solid color={tintColor} name="user" size={20} />
                );
            }
        })
    }
};

// Define bottom navigator as a screen in stack
const BottomTabNavigator = createBottomTabNavigator(
    routeConfigs,
    bottomTabNavigatorConfig
);

// Main Stack View App
const StackNavigator = createStackNavigator(
    {
        BottomTabNavigator: {
            screen: BottomTabNavigator
        },
        Profile: {
            screen: Profile
        },
        Notification: {
            screen: Notification
        },
        Walkthrough: {
            screen: Walkthrough
        },
        SignUp: {
            screen: SignUp
        },
        HotelDetail: {
            screen: HotelDetail
        },
        PostDetail: {
            screen: PostDetail
        },
        Post: {
            screen: Post
        },
        Coupons: {
            screen: Coupons
        },
    },
    {
        headerMode: "none",
        initialRouteName: "BottomTabNavigator"
    }
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
    {
        Filter: {
            screen: Filter
        },
        Search: {
            screen: Search
        },
        SearchHistory: {
            screen: SearchHistory
        },
        PreviewImage: {
            screen: PreviewImage
        },
        StackNavigator: {
            screen: StackNavigator
        }
    },
    {
        mode: "modal",
        headerMode: "none",
        initialRouteName: "StackNavigator",
        transitionConfig: screen => {
            return handleCustomTransition(screen);
        }
    }
);

export default RootStack;
