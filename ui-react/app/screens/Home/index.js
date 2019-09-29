import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList
} from "react-native";
import {
    Header,
    Image,
    Text,
    Icon,
    PostListItem,
    Card,
    Button,
    SafeAreaView
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

// Load sample data
import { 
    FavouriteData, 
    EnhancementData, 
    MandatoryData, 
    TourData, 
    HotelData } from "@data";

export default class Home extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            icons: [
                { icon: "gamepad", name: "Game" },
                { icon: "graduation-cap", name: "Interactive" },
                { icon: "desktop", name: "Video" },
                { icon: "book", name: "Book" },
                { icon: "headphones", name: "Audio" },
                { icon: "question", name: "Quiz" }
            ],
            favourite: FavouriteData,
            enhancement: EnhancementData,
            mandatory: MandatoryData,
            tours: TourData,
            hotels: HotelData,
            heightHeader: Utils.heightHeader(),
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ],
        };
        this._deltaY = new Animated.Value(0);
    }

    /**
     * @description Show icon services on form searching
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    renderIconService() {
        return this.state.icons.map((icon, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={{ alignItems: "center" }}
                    activeOpacity={0.9}
                >
                    <View key={icon.name} style={styles.iconContent}>
                        <Icon
                            name={icon.icon}
                            size={18}
                            color={BaseColor.primaryColor}
                            solid
                        />
                    </View>
                    <Text caption1 grayColor>
                        {icon.name}
                    </Text>
                </TouchableOpacity>
            );
        });
    }

    render() {
        const { navigation } = this.props;
        const { favourite, enhancement, mandatory, tours, hotels, heightHeader, todo } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = (heightImageBanner - heightHeader) - 50;
        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    source={Images.trip3}
                    style={[
                        styles.imageBackground,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(100),
                                    Utils.scaleWithPixel(100)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    0
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
                        title="LMS V3"
                        leftArrowShow={false}
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
                                    name="bell"
                                    size={24}
                                    color={BaseColor.primaryColor}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                        onPressRight={() => {
                            navigation.navigate("Notification");
                        }}
                        onPressRightSecond={() => {
                            navigation.navigate("Messenger");
                        }}
                    />
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        onContentSizeChange={() =>
                            this.setState({
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
                    >
                        <View style={{ alignItems: "center" }}>
                            <View
                                style={[
                                    styles.searchForm,
                                    { marginTop: marginTopBanner }
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("Search")
                                    }
                                    activeOpacity={0.9}
                                >
                                    <View style={BaseStyle.textInput}>
                                        <Text body1 grayColor>
                                            What are you looking for ?
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.contentServiceIcon}>
                                    {this.renderIconService()}
                                </View>
                            </View>
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}
                            >
                                <Text
                                    headline
                                    semibold
                                    style={{ marginLeft: 20, marginVertical: 10 }}
                                >
                                    My Assignment
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Coupons");
                                    }}
                                >
                                    <Text 
                                    caption1 
                                    grayColor
                                    style={{ marginRight: 20, marginVertical: 10 }}
                                    >
                                        Show More
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={todo}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <PostListItem
                                        style={[
                                            styles.myAssignmentItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        title="Strengthening Courage"
                                        date="Past Due : 30/09/2019"
                                        description="A short course on Risk Taking"
                                        assignedBy="Assigned By: Wisman Tjiardy"
                                        image={item.image}
                                        onPress={() => {
                                            navigation.navigate("PostDetail");
                                        }}
                                    />
                                )}
                            />
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}
                            >
                                <Text
                                    headline
                                    semibold
                                    style={{ marginLeft: 20, marginVertical: 10 }}
                                >
                                    Recently Viewed
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("HotelDetail");
                                    }}
                                >
                                    <Text 
                                    caption1 
                                    grayColor
                                    style={{ marginRight: 20, marginVertical: 10 }}
                                    >
                                        Show More
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={favourite}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.promotionItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("PostDetail")
                                        }
                                        onPressLike={() => {}}
                                        onPressFavouriteRemove={() => {}}
                                        title1={item.title1}
                                        title2={item.title2}
                                        buttonTitle="Add Favourite"
                                    >
                                    </Card>
                                )}
                            />
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}
                            >
                                <Text
                                    headline
                                    semibold
                                    style={{ marginLeft: 20, marginVertical: 10 }}
                                >
                                    My Favourite
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("HotelDetail");
                                    }}
                                >
                                    <Text 
                                    caption1 
                                    grayColor
                                    style={{ marginRight: 20, marginVertical: 10 }}
                                    >
                                        Show More
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={mandatory}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.promotionItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("HotelDetail")
                                        }
                                        onPressLike={() => {}}
                                        onPressFavourite={() => {}}
                                        title1={item.title1}
                                        title2={item.title2}
                                        buttonTitle="Removed Favourite"
                                    >
                                    </Card>
                                )}
                            />
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}
                            >
                                <Text
                                    headline
                                    semibold
                                    style={{ marginLeft: 20, marginVertical: 10 }}
                                >
                                    Business Planning & Analysis
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("HotelDetail");
                                    }}
                                >
                                    <Text 
                                    caption1 
                                    grayColor
                                    style={{ marginRight: 20, marginVertical: 10 }}
                                    >
                                        Show More
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={favourite}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.promotionItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("PostDetail")
                                        }
                                        onPressLike={() => {}}
                                        onPressFavouriteRemove={() => {}}
                                        title1={item.title1}
                                        title2={item.title2}
                                        buttonTitle="Add Favourite"
                                    >
                                    </Card>
                                )}
                            />
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}
                            >
                                <Text
                                    headline
                                    semibold
                                    style={{ marginLeft: 20, marginVertical: 10 }}
                                >
                                    Human Resources
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("HotelDetail");
                                    }}
                                >
                                    <Text 
                                    caption1 
                                    grayColor
                                    style={{ marginRight: 20, marginVertical: 10 }}
                                    >
                                        Show More
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={favourite}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.promotionItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("PostDetail")
                                        }
                                        onPressLike={() => {}}
                                        onPressFavouriteRemove={() => {}}
                                        title1={item.title1}
                                        title2={item.title2}
                                        buttonTitle="Add Favourite"
                                    >
                                    </Card>
                                )}
                            />
                        </View>
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end"
                                }}
                            >
                                <Text
                                    headline
                                    semibold
                                    style={{ marginLeft: 20, marginVertical: 10 }}
                                >
                                    Recommended For You
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("HotelDetail");
                                    }}
                                >
                                    <Text 
                                    caption1 
                                    grayColor
                                    style={{ marginRight: 20, marginVertical: 10 }}
                                    >
                                        Show More
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{paddingHorizontal: 20}}
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
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
