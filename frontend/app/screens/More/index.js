import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text } from "@components";
import styles from "./styles";

export default class More extends Component {
    constructor(props) {
        super(props);

        // Define list more screens
        this.state = {
            refreshing: false,
            screen: [
                {
                    id: "1",
                    screen: "Profile",
                    icon: "cog",
                    title: "Profile Settings"
                },
                {
                    id: "2",
                    screen: "ProfileExample",
                    icon: "users",
                    title: "8 User Profiles"
                },
                {
                    id: "3",
                    screen: "Post",
                    icon: "copy",
                    title: "Simple Blog"
                },
                {
                    id: "4",
                    screen: "AboutUs",
                    icon: "home",
                    title: "About Us"
                },
                {
                    id: "5",
                    screen: "ContactUs",
                    icon: "phone-square",
                    title: "ContactUs"
                },
                {
                    id: "6",
                    screen: "OurService",
                    icon: "cubes",
                    title: "Our Service"
                },
                {
                    id: "7",
                    screen: "PricingTable",
                    icon: "dollar-sign",
                    title: "Pricing Table"
                },
                {
                    id: "8",
                    screen: "Review",
                    icon: "comments",
                    title: "User Reviews"
                },
                {
                    id: "9",
                    screen: "Notification",
                    icon: "paper-plane",
                    title: "Notification List"
                },
                {
                    id: "10",
                    screen: "Messenger",
                    icon: "envelope",
                    title: "Message List"
                },
                {
                    id: "1",
                    screen: "Messages",
                    icon: "comment",
                    title: "Messenger"
                },
                {
                    id: "11",
                    screen: "BookingHistory",
                    icon: "bookmark",
                    title: "Booking History"
                },
                {
                    id: "12",
                    screen: "Coupons",
                    icon: "barcode",
                    title: "Coupons"
                }
            ]
        };
    }

    render() {
        const { navigation } = this.props;
        let { screen } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header title="More" subTitle="Profile 8 Screens and More" />
                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        marginTop: 10
                    }}
                    refreshControl={
                        <RefreshControl
                            colors={[BaseColor.primaryColor]}
                            tintColor={BaseColor.primaryColor}
                            refreshing={this.state.refreshing}
                            onRefresh={() => { }}
                        />
                    }
                    data={screen}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name={item.icon}
                                    color={BaseColor.primaryColor}
                                    size={18}
                                    solid
                                    style={{ marginRight: 10 }}
                                />
                                <Text body1>{item.title}</Text>
                            </View>
                            <Icon
                                name="angle-right"
                                size={18}
                                color={BaseColor.primaryColor}
                            />
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        );
    }
}
