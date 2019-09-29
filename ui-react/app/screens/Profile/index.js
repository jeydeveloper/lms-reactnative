import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    FlatList,
    Switch,
    TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Tag, HotelItem, Button, PostListItem } from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import { UserData, HotelData } from "@data";
import * as Utils from "@utils";
import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";

class Profile extends Component {
    constructor(props) {
        super();
        this.state = {
            scrollY: new Animated.Value(0),
            index: 0,
            routes: [
                { key: "profile", title: "History" },
                { key: "booking", title: "Recent" },
                { key: "payment", title: "Certificate" }
            ],
            userData: UserData[0],
            loading: false
        };
    }

    /**
     * @description Simple logout with Redux 
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onLogOut() {
        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(false, response => {
                    if (response.success) {
                        this.props.navigation.navigate("Loading");
                    } else {
                        this.setState({ loading: false });
                    }
                });
            }
        );
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
                        width: Utils.getWidthDevice() / 3,
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
            case "booking":
                return (
                    <ProfileTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "profile":
                return (
                    <ProfileTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "payment":
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
                    title="Profile"
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
                <View style={styles.containField}>
                    <View style={styles.contentLeftItem}>
                        <Text title2 semibold>
                            {userData.performance[2].value}
                        </Text>
                        <Text caption1 grayColor>
                            {userData.performance[2].title}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            alignItems: "center",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Animated.Image
                            source={Images.profile2}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                position: "absolute",
                                alignSelf: "center",
                                bottom: 70,
                                transform: [
                                    {
                                        scale: imageScale
                                    },
                                    {
                                        translateY: imageTranslateY
                                    }
                                ]
                            }}
                        />
                        <Text headline semibold numberOfLines={1}>
                            {userData.name}
                        </Text>
                        <View style={{ width: 130, margin: 10 }}>
                            <Button
                                full
                                loading={this.state.loading}
                                style={{ height: 30 }}
                                onPress={() => this.onLogOut()}
                            >
                                Sign Out
                            </Button>
                        </View>
                    </View>
                    <View style={styles.contentLeftItem}>
                        <Text title2 semibold>
                            {userData.performance[1].value}
                        </Text>
                        <Text caption1 grayColor>
                            {userData.performance[1].title}
                        </Text>
                    </View>
                </View>
                <TabView
                    lazy
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                />
            </SafeAreaView>
        );
    }
}

class BookingTab extends Component {
    constructor(props) {
        super();
        this.state = {
            hotels: HotelData
        };
    }

    render() {
        return (
            <View style={{ padding: 20 }}>
                <FlatList
                    numColumns={2}
                    data={this.state.hotels}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <HotelItem
                            grid
                            image={item.image}
                            name={item.name}
                            location={item.location}
                            price={item.price}
                            available={item.available}
                            rate={item.rate}
                            rateStatus={item.rateStatus}
                            numReviews={item.numReviews}
                            services={item.services}
                            style={
                                index % 2
                                    ? {
                                          marginLeft: 15,
                                          marginBottom: 20
                                      }
                                    : { marginBottom: 20 }
                            }
                            image={item.image}
                            onPress={() =>
                                this.props.navigation.navigate("HotelDetail")
                            }
                        />
                    )}
                />
            </View>
        );
    }
}

class ProfileTab extends Component {
    constructor(props) {
        super();
        this.state = {
            reminders: false
        };
    }

    toggleSwitch = value => {
        this.setState({ reminders: value });
    };

    render() {
        const { navigation } = this.props;
        return (
            <ScrollView>
                <View
                    style={{paddingHorizontal: 20, paddingTop: 20}}
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
                </View>
            </ScrollView>
        );
    }
}
class PaymentTab extends Component {
    render() {
        return <View style={{ marginTop: 20 }} />;
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
