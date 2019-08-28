import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList
} from "react-native";
import {
    Image,
    Text,
    Icon,
    HotelItem,
    Card,
    Button,
    SafeAreaView
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

// Load sample data
import { PromotionData, TourData, HotelData } from "@data";

export default class Home extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            icons: [
                { icon: "calendar-alt", name: "Hotel" },
                { icon: "map-marker-alt", name: "Tour" },
                { icon: "car-alt", name: "Car" },
                { icon: "plane", name: "Flight" },
                { icon: "ship", name: "Cruise" }
            ],
            promotion: PromotionData,
            tours: TourData,
            hotels: HotelData,
            heightHeader: Utils.heightHeader()
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
        const { promotion, tours, hotels, heightHeader } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = heightImageBanner - heightHeader;
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
                                            What're you looking for ?
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.contentServiceIcon}>
                                    {this.renderIconService()}
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text
                                title3
                                semibold
                                style={{ marginLeft: 20, marginVertical: 10 }}
                            >
                                Promos Today
                            </Text>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={promotion}
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
                                    >
                                        <Text subhead whiteColor>
                                            {item.title1}
                                        </Text>
                                        <Text title2 whiteColor semibold>
                                            {item.title2}
                                        </Text>
                                        <View
                                            style={styles.contentCartPromotion}
                                        >
                                            <Button
                                                style={styles.btnPromotion}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "PreviewBooking"
                                                    );
                                                }}
                                            >
                                                <Text body2 semibold whiteColor>
                                                    Book Now
                                                </Text>
                                            </Button>
                                        </View>
                                    </Card>
                                )}
                            />
                        </View>
                        {/* Hiking */}
                        <View>
                            <View style={styles.contentHiking}>
                                <Text title3 semibold>
                                    Tours
                                </Text>
                                <Text body2 grayColor>
                                    Let find out what most interesting things
                                </Text>
                            </View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={tours}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Card
                                        style={[
                                            styles.tourItem,
                                            index == 0
                                                ? { marginHorizontal: 20 }
                                                : { marginRight: 20 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("TourDetail")
                                        }
                                    >
                                        <Text headline whiteColor semibold>
                                            {item.name}
                                        </Text>
                                    </Card>
                                )}
                            />
                        </View>
                        {/* Promotion */}
                        <View
                            style={{
                                padding: 20
                            }}
                        >
                            <Text title3 semibold>
                                Promotion
                            </Text>
                            <Text body2 grayColor>
                                What’s the Worst That Could Happen
                            </Text>
                            <Image
                                source={Images.banner1}
                                style={styles.promotionBanner}
                            />
                            <View style={styles.line} />
                            <FlatList
                                columnWrapperStyle={{ marginBottom: 20 }}
                                numColumns={2}
                                data={hotels}
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
                                            index % 2 ? { marginLeft: 15 } : {}
                                        }
                                        onPress={() =>
                                            navigation.navigate("HotelDetail")
                                        }
                                    />
                                )}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
