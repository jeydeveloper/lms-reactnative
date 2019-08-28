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
import Hotel from "@screens/Hotel";
import Tour from "@screens/Tour";
import Car from "@screens/Car";
import More from "@screens/More";
/* Modal Screen only affect iOS */
import Filter from "@screens/Filter";
import Search from "@screens/Search";
import SearchHistory from "@screens/SearchHistory";
import PreviewImage from "@screens/PreviewImage";
/* Stack Screen */
import Profile from "@screens/Profile";
import Profile1 from "@screens/Profile1";
import Profile2 from "@screens/Profile2";
import Profile3 from "@screens/Profile3";
import Profile4 from "@screens/Profile4";
import Profile5 from "@screens/Profile5";
import Profile6 from "@screens/Profile6";
import Profile7 from "@screens/Profile7";
import Profile8 from "@screens/Profile8";
import Messenger from "@screens/Messenger";
import Review from "@screens/Review";
import Feedback from "@screens/Feedback";
import Messages from "@screens/Messages";
import Notification from "@screens/Notification";
import Walkthrough from "@screens/Walkthrough";
import SignUp from "@screens/SignUp";
import SignIn from "@screens/SignIn";
import ResetPassword from "@screens/ResetPassword";
import ChangePassword from "@screens/ChangePassword";
import ProfileEdit from "@screens/ProfileEdit";
import ProfileExample from "@screens/ProfileExample";
import ChangeLanguage from "@screens/ChangeLanguage";
import HotelInformation from "@screens/HotelInformation";
import CheckOut from "@screens/CheckOut";
import Currency from "@screens/Currency";
import Coupons from "@screens/Coupons";
import Booking from "@screens/Booking";
import HotelDetail from "@screens/HotelDetail";
import ContactUs from "@screens/ContactUs";
import PreviewBooking from "@screens/PreviewBooking";
import PricingTable from "@screens/PricingTable";
import PricingTableIcon from "@screens/PricingTableIcon";
import BookingDetail from "@screens/BookingDetail";
import PostDetail from "@screens/PostDetail";
import Post from "@screens/Post";
import TourDetail from "@screens/TourDetail";
import CarList from "@screens/CarList";
import CarDetail from "@screens/CarDetail";
import AboutUs from "@screens/AboutUs";
import OurService from "@screens/OurService";

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
    Hotel: {
        screen: Hotel,
        navigationOptions: ({ navigation }) => ({
            title: "Hotel",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        color={tintColor}
                        name="calendar-alt"
                        size={20}
                        solid
                    />
                );
            }
        })
    },
    Tour: {
        screen: Tour,
        navigationOptions: ({ navigation }) => ({
            title: "Tour",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        solid
                        color={tintColor}
                        name="map-marker-alt"
                        size={20}
                        solid
                    />
                );
            }
        })
    },
    Car: {
        screen: Car,
        navigationOptions: ({ navigation }) => ({
            title: "Car",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="car" size={20} solid />;
            }
        })
    },
    More: {
        screen: More,
        navigationOptions: ({ navigation }) => ({
            title: "More",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon solid color={tintColor} name="ellipsis-v" size={20} />
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
        ProfileExample: {
            screen: ProfileExample
        },
        Profile: {
            screen: Profile
        },
        Profile1: {
            screen: Profile1
        },
        Profile2: {
            screen: Profile2
        },
        Profile3: {
            screen: Profile3
        },
        Profile4: {
            screen: Profile4
        },
        Profile5: {
            screen: Profile5
        },
        Profile6: {
            screen: Profile6
        },
        Profile7: {
            screen: Profile7
        },
        Profile8: {
            screen: Profile8
        },
        Review: {
            screen: Review
        },
        Feedback: {
            screen: Feedback
        },
        Post: {
            screen: Post
        },
        Messages: {
            screen: Messages
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
        SignIn: {
            screen: SignIn
        },
        ResetPassword: {
            screen: ResetPassword
        },
        ChangePassword: {
            screen: ChangePassword
        },
        ProfileEdit: {
            screen: ProfileEdit
        },
        ChangeLanguage: {
            screen: ChangeLanguage
        },
        HotelInformation: {
            screen: HotelInformation
        },
        CheckOut: {
            screen: CheckOut
        },
        Currency: {
            screen: Currency
        },
        Coupons: {
            screen: Coupons
        },
        BookingHistory: {
            screen: Booking
        },
        HotelDetail: {
            screen: HotelDetail
        },
        ContactUs: {
            screen: ContactUs
        },
        PreviewBooking: {
            screen: PreviewBooking
        },
        PricingTable: {
            screen: PricingTable
        },
        PricingTableIcon: {
            screen: PricingTableIcon
        },
        BookingDetail: {
            screen: BookingDetail
        },
        PostDetail: {
            screen: PostDetail
        },
        TourDetail: {
            screen: TourDetail
        },
        CarList: {
            screen: CarList
        },
        CarDetail: {
            screen: CarDetail
        },
        Messenger: {
            screen: Messenger
        },
        AboutUs: {
            screen: AboutUs
        },
        OurService: {
            screen: OurService
        }
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
