import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    FlatList,
    Switch,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Tag, HotelItem, Button, Coupon, PostListItem } from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import { UserData, HotelData, CouponsData } from "@data";
import * as Utils from "@utils";
import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";

export default class MyLearning extends Component {
    constructor(props) {
        super();
        this.state = {
            scrollY: new Animated.Value(0),
            index: 0,
            routes: [
                { key: "myAssignment", title: "My Assignment" },
                { key: "continueLearning", title: "Continue Learning" },
            ],
            userData: UserData[0],
            loading: false,
        };
    }

    _handleIndexChange = index =>
        this.setState({
            index
        });

    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            inactiveColor={BaseColor.grayColor}
            activeColor={BaseColor.textPrimaryColor}
            renderLabel={({ route, focused, color }) => (
                <View
                    style={{
                        flex: 1,
                        width: Utils.getWidthDevice() / 2,
                        alignItems: "center"
                    }}
                >
                    <Text headline semibold={focused} style={{ color }}>
                        {route.title}
                    </Text>
                </View>
            )}
        />
    );

    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "continueLearning":
                return (
                    <PaymentTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "myAssignment":
                return (
                    <ProfileTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
        }
    };

    render() {
        const { navigation } = this.props;
        const { userData } = this.state;
        const imageScale = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0.5],
            extrapolate: "clamp"
        });
        const imageTranslateY = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [-5, 50],
            extrapolate: "clamp"
        });
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="My Learning"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <View style={{ flex: 1 }}>
                    <TabView
                        lazy
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

class ProfileTab extends Component {
    constructor(props) {
        super();
        this.state = {
            reminders: false,
            refreshing: false,
            coupons: CouponsData
        };
    }

    renderItem(item) {
        return (
            <Coupon
                style={{
                    marginVertical: 10,
                    marginHorizontal: 20
                }}
                name={item.name}
                code={item.code}
                description={item.description}
                assignedBy={item.assignedBy}
                valid={item.valid}
                remain={item.remain}
                onPress={() => {
                    this.props.navigation.navigate("PostDetail");
                }}
            />
        );
    }

    render() {
        const { navigation } = this.props;
        const { refreshing, coupons } = this.state;
        return (
            <ScrollView>
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                colors={[BaseColor.primaryColor]}
                                tintColor={BaseColor.primaryColor}
                                refreshing={refreshing}
                                onRefresh={() => { }}
                            />
                        }
                        data={coupons}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => this.renderItem(item)}
                    />
                </View>
            </ScrollView>
        );
    }
}
class PaymentTab extends Component {
    constructor(props) {
        super();
    }

    render() {
        const { navigation } = this.props;
        return (
            <ScrollView>
                <View
                    style={{paddingHorizontal: 20, paddingVertical: 10}}
                >
                    <PostListItem
                        title="See The Unmatched"
                        description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada."
                        style={{ width: '100%' }}
                        image={Images.trip9}
                        onPress={() => {
                            navigation.navigate("PostDetail");
                        }}
                    />
                    <PostListItem
                        description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada"
                        title="Top 15 Things Must To Do"
                        style={{ marginTop: 10, width: '100%' }}
                        image={Images.trip8}
                        onPress={() => {
                            navigation.navigate("PostDetail");
                        }}
                    />
                    <PostListItem
                        description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada"
                        title="Things Must To Do"
                        style={{ marginVertical: 10, width: '100%' }}
                        image={Images.trip8}
                        onPress={() => {
                            navigation.navigate("PostDetail");
                        }}
                    />
                    <PostListItem
                        title="See The Unmatched"
                        description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada."
                        style={{ width: '100%' }}
                        image={Images.trip9}
                        onPress={() => {
                            navigation.navigate("PostDetail");
                        }}
                    />
                    <PostListItem
                        description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada"
                        title="Top 15 Things Must To Do"
                        style={{ marginTop: 10, width: '100%' }}
                        image={Images.trip8}
                        onPress={() => {
                            navigation.navigate("PostDetail");
                        }}
                    />
                    <PostListItem
                        description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada"
                        title="Things Must To Do"
                        style={{ marginVertical: 10, width: '100%' }}
                        image={Images.trip8}
                        onPress={() => {
                            navigation.navigate("PostDetail");
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}
