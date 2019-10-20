import React, { Component } from "react";
import { View, ScrollView, Animated, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem,
    Button
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";

import YouTube from 'react-native-youtube';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: '',
            status: '',
            quality: '',
            error: ''
        };
        this._deltaY = new Animated.Value(0);
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title="Strengthening Courage"
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
                    <ScrollView>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 20,
                                marginTop: 10
                            }}
                        >
                            <YouTube
                              videoId="ya7g6eoNmS8"
                              apiKey="AIzaSyAxy1-3hfh4-E8ghuQ5RvgzG8rkYcedOyM"
                              onReady={e => this.setState({ isReady: true })}
                              onChangeState={e => this.setState({ status: e.state })}
                              onChangeQuality={e => this.setState({ quality: e.quality })}
                              onError={e => this.setState({ error: e.error })}
                              style={{ alignSelf: 'stretch', height: 300 }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 10,
                                    borderBottomColor: BaseColor.textSecondaryColor,
                                    borderBottomWidth: 1,
                                    paddingVertical: 10
                                }}
                            >
                                <View>
                                    <Button
                                        style={{
                                            height: 25,
                                            borderRadius: 3,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5
                                        }}
                                        onPress={() => {}}
                                    >
                                        <Text body2 semibold whiteColor>
                                            Add Favourite
                                        </Text>
                                    </Button>
                                </View>
                                <View 
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {}}
                                        activeOpacity={0.9}
                                    >
                                        <Icon name="heart" size={18} />
                                    </TouchableOpacity>
                                    <Text
                                        caption1
                                        grayColor
                                        style={{
                                            marginLeft: 3
                                        }}
                                        numberOfLines={1}
                                    >
                                        100
                                    </Text>
                                </View>
                            </View>
                            <Text
                                headline
                                semibold
                                style={{
                                    marginTop: 10
                                }}
                            >
                                About This:
                            </Text>
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
                                    marginTop: 10
                                }}
                            >
                                Prerequisites:
                            </Text>
                            <Text body2>
                                None
                            </Text>
                            <Text
                                headline
                                semibold
                                style={{
                                    marginTop: 10
                                }}
                            >
                                Expertise:
                            </Text>
                            <Text body2>
                                Everyone
                            </Text>
                            <Text
                                headline
                                semibold
                                style={{
                                    marginTop: 10
                                }}
                            >
                                Objectives:
                            </Text>
                            <Text body2>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec rutrum congue leo eget
                                malesuada.
                            </Text>
                        </View>
                    </ScrollView>
                    <View style={styles.contentButtonBottom}>
                        <View
                            style={{
                                justifyContent: "space-between"
                            }}
                        >
                            <Button
                                style={{ height: 30 }}
                                onPress={() =>
                                    navigation.navigate("PostTest")
                                }
                            >
                                Pre Test
                            </Button>
                        </View>
                        <Button
                            style={{ height: 30, backgroundColor: BaseColor.lightPrimaryColor }}
                            onPress={() =>
                                navigation.navigate("PostTest")
                            }
                        >
                            Post Test
                        </Button>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
