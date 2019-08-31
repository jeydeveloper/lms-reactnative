import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    TouchableOpacity,
    Platform
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    TourItem,
    FilterSort,
    Button
} from "@components";
import Modal from "react-native-modal";
import styles from "./styles";
import * as Utils from "@utils";

// Load sample data
import { TourData } from "@data";

export default class Tour extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            refreshing: false,
            modeView: "block",
            tours: TourData,
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            ),
            filter: [
                {
                    value: "low_price",
                    icon: "sort-amount-up",
                    text: "Lowest Price",
                    checked: true
                },
                {
                    value: "hight_price",
                    icon: "sort-amount-down",
                    text: "Hightest Price"
                },
                {
                    value: "low_rate",
                    icon: "sort-amount-up",
                    text: "Hightest Rating"
                },
                {
                    value: "hight_rate",
                    icon: "sort-amount-down",
                    text: "Popularity"
                }
            ],
            filterSort: {
                sortIcon: "sort-amount-down",
                sortTitle: "Hightest Rating",
                filterIcon: "filter",
                filterTitle: "Filter",
                modeViewIcon: "th-list"
            }
        };
        this.onChangeView = this.onChangeView.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }

    /**
     * @description Open modal when filterring mode is pressed
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {*} modal
     */
    openModal(modal) {
        this.setState({
            modalVisible: modal
        });
    }

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onChangeFilter() {
        const { navigation } = this.props;
        navigation.navigate("Filter");
    }

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onCheckFilter(check) {
        this.setState({
            filter: this.state.filter.map(item => {
                if (item.value == check.value) {
                    return { ...item, checked: true };
                } else {
                    return { ...item, checked: false };
                }
            })
        });
    }

    /**
     * @description Open modal when view mode is pressed
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onChangeView() {
        let { modeView } = this.state;
        Utils.enableExperimental();
        switch (modeView) {
            case "block":
                this.setState({
                    modeView: "grid",
                    filterSort: {
                        ...this.state.filterSort,
                        modeViewIcon: "th-large"
                    }
                });
                break;
            case "grid":
                this.setState({
                    modeView: "list",
                    filterSort: {
                        ...this.state.filterSort,
                        modeViewIcon: "th-list"
                    }
                });
                break;
            case "list":
                this.setState({
                    modeView: "block",
                    filterSort: {
                        ...this.state.filterSort,
                        modeViewIcon: "square"
                    }
                });
                break;
            default:
                this.setState({
                    modeView: "block",
                    filterSort: {
                        ...this.state.filterSort,
                        modeViewIcon: "square"
                    }
                });
                break;
        }
    }

    /**
     * @description Load modal container
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    renderModal() {
        let { modalVisible, filter, loading } = this.state;
        return (
            <Modal
                isVisible={modalVisible === "bottom"}
                onSwipeComplete={() => this.setState({ modalVisible: false })}
                swipeDirection={["right", "down"]}
                style={styles.bottomModal}
            >
                <View style={styles.contentFilterBottom}>
                    <View style={styles.contentSwipeDown}>
                        <View style={styles.lineSwipeDown} />
                    </View>
                    {filter.map((item, index) => (
                        <TouchableOpacity
                            style={styles.contentActionModalBottom}
                            key={item.value}
                            onPress={() => this.onCheckFilter(item)}
                        >
                            <Text body2 semibold primaryColor={item.checked}>
                                {item.text}
                            </Text>
                            {item.checked && (
                                <Icon
                                    name="check"
                                    size={14}
                                    color={BaseColor.primaryColor}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                    <Button
                        full
                        loading={loading}
                        style={{ marginTop: 10, marginBottom: 20 }}
                        onPress={() => {
                            this.setState(
                                {
                                    loading: true
                                },
                                () => {
                                    setTimeout(() => {
                                        const sortItem = filter.filter(
                                            item => item.checked
                                        );
                                        this.setState({
                                            loading: false,
                                            modalVisible: false,
                                            filterSort: {
                                                ...this.state.filterSort,
                                                sortTitle: sortItem[0].text,
                                                sortIcon: sortItem[0].icon
                                            }
                                        });
                                    }, 500);
                                }
                            );
                        }}
                    >
                        Apply
                    </Button>
                </View>
            </Modal>
        );
    }

    /**
    * @description Render container view
    * @author Passion UI <passionui.com>
    * @date 2019-08-03
    * @returns
    */
    renderContent() {
        const {
            modeView,
            tours,
            refreshing,
            filterSort,
            clampedScroll
        } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        const androidMargin = Platform.OS === "android" ? 50 : 0;
        switch (modeView) {
            case "block":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentInset={{ top: 50 }}
                            contentContainerStyle={{
                                marginTop: androidMargin
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => { }}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={tours}
                            key={"block"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    block
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() => {
                                        navigation.navigate("TourDetail");
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    travelTime={item.location}
                                    startTime={item.startTime}
                                    price={item.price}
                                    rate={item.rate}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                sortIcon={filterSort.sortIcon}
                                sortTitle={filterSort.sortTitle}
                                filterIcon={filterSort.filterIcon}
                                filterTitle={filterSort.filterTitle}
                                modeViewIcon={filterSort.modeViewIcon}
                                onChangeSort={() => this.openModal("bottom")}
                                onChangeView={this.onChangeView}
                                onChangeFilter={this.onChangeFilter}
                            />
                        </Animated.View>
                    </View>
                );
            case "grid":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentInset={{ top: 50 }}
                            columnWrapperStyle={{
                                marginHorizontal: 20,
                                marginTop: androidMargin
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => { }}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={tours}
                            key={"gird"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    grid
                                    style={{
                                        marginBottom: 10,
                                        marginLeft: index % 2 ? 15 : 0
                                    }}
                                    onPress={() => {
                                        navigation.navigate("TourDetail");
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    travelTime={item.travelTime}
                                    startTime={item.startTime}
                                    price={item.price}
                                    rate={item.rate}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                sortIcon={filterSort.sortIcon}
                                sortTitle={filterSort.sortTitle}
                                filterIcon={filterSort.filterIcon}
                                filterTitle={filterSort.filterTitle}
                                modeViewIcon={filterSort.modeViewIcon}
                                onChangeSort={() => this.openModal("bottom")}
                                onChangeView={this.onChangeView}
                                onChangeFilter={this.onChangeFilter}
                            />
                        </Animated.View>
                    </View>
                );

            case "list":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentInset={{ top: 50 }}
                            contentContainerStyle={{
                                marginTop: androidMargin
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => { }}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={tours}
                            key={"list"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    list
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() => {
                                        navigation.navigate("TourDetail");
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    travelTime={item.travelTime}
                                    startTime={item.startTime}
                                    price={item.price}
                                    rate={item.rate}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                sortIcon={filterSort.sortIcon}
                                sortTitle={filterSort.sortTitle}
                                filterIcon={filterSort.filterIcon}
                                filterTitle={filterSort.filterTitle}
                                modeViewIcon={filterSort.modeViewIcon}
                                onChangeSort={() => this.openModal("bottom")}
                                onChangeView={this.onChangeView}
                                onChangeFilter={this.onChangeFilter}
                            />
                        </Animated.View>
                    </View>
                );
            default:
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentInset={{ top: 50 }}
                            contentContainerStyle={{ marginTop: androidMargin }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => { }}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={tours}
                            key={"block"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    block
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() => {
                                        navigation.navigate("TourDetail");
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    travelTime={item.travelTime}
                                    startTime={item.startTime}
                                    price={item.price}
                                    rate={item.rate}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                sortIcon={filterSort.sortIcon}
                                sortTitle={filterSort.sortTitle}
                                filterIcon={filterSort.filterIcon}
                                filterTitle={filterSort.filterTitle}
                                modeViewIcon={filterSort.modeViewIcon}
                                onChangeSort={() => this.openModal("bottom")}
                                onChangeView={this.onChangeView}
                                onChangeFilter={this.onChangeFilter}
                            />
                        </Animated.View>
                    </View>
                );
                break;
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Tours"
                    subTitle="24 Dec 2018, 2 Nights, 1 Room"
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
                                name="search"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />
                {this.renderModal()}
                {this.renderContent()}
            </SafeAreaView>
        );
    }
}
