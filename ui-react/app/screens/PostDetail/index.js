import React, { Component } from "react";
import { View, ScrollView, Animated } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._deltaY = new Animated.Value(0);
    }

    render() {
        const heightHeader = Utils.heightHeader();
        const heightImageBanner = Utils.scaleWithPixel(250);
        const marginTopBanner = heightImageBanner - heightHeader - 30;
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    source={Images.room6}
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(195),
                                    Utils.scaleWithPixel(195)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                />
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title="Lorem Ipsum Dolor"
                        renderLeft={() => {
                            return (
                                <Icon
                                    name="arrow-left"
                                    size={20}
                                    color={BaseColor.primaryColor}
                                />
                            );
                        }}
                        renderRight={() => {
                            return (
                                <Icon
                                    name="bookmark"
                                    solid
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                        onPressRight={() => { }}
                    />
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        scrollEventThrottle={8}
                    >
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 20,
                                marginTop: marginTopBanner
                            }}
                        >
                            <Text
                                headline
                                semibold
                                whiteColor
                                numberOfLines={1}
                            >
                                Ready Fast For Fall Leaf Viewing Trips?
                            </Text>
                            <ProfileAuthor
                                image={Images.profile2}
                                name="Steve Garrett"
                                description="5 hours ago | 100k views"
                                textRight="Jun 2018"
                                style={{
                                    marginTop: 20
                                }}
                            />
                            <Text body2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec rutrum congue leo eget
                                malesuada. Nulla porttitor accumsan tincidunt.
                                Donec rutrum congue leo eget malesuada. Nulla
                                porttitor accumsan tincidunt. Nulla porttitor
                                accumsan tincidunt. Quisque velit nisi, pretium
                                ut lacinia in, elementum id enim. Donec rutrum
                                congue leo eget malesuada. Praesent sapien
                                massa, convallis a pellentesque nec, egestas non
                                nisi. Vestibulum ac diam sit amet quam vehicula
                                elementum sed sit amet dui Donec rutrum congue
                                leo eget malesuada. Vivamus suscipit tortor eget
                                felis porttitor volutpat. Sed porttitor lectus
                                nibh. Nulla quis lorem ut libero malesuada
                                feugiat. Quisque velit nisi, pretium ut lacinia
                                in, elementum id enim.
                            </Text>
                            <Text
                                headline
                                semibold
                                style={{
                                    marginTop: 20
                                }}
                            >
                                User Following
                            </Text>
                            <ProfileGroup
                                name="Steve, Lincoln, Harry"
                                detail="and 15 people like this"
                                users={[
                                    { image: Images.profile1 },
                                    { image: Images.profile3 },
                                    { image: Images.profile4 }
                                ]}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
