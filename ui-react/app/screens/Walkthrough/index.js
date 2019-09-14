import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image, Header, Icon } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";

class Walkthrough extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            scrollEnabled: true,
            slide: [
                { key: 1, image: Images.trip2 },
                { key: 2, image: Images.trip1 },
                { key: 3, image: Images.trip3 },
                { key: 4, image: Images.trip4 }
            ],
            id: "",
            password: "",
            success: {
                id: true,
                password: true
            }
        };
    }

    /**
     * @description Simple authentication without call any APIs 
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    authentication() {
        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(true, response => {
                    if (response.success) {
                        this.props.navigation.navigate("Loading");
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        );
    }

    onLogin() {
        const { id, password, success } = this.state;
        const { navigation } = this.props;
        if (id == "" || password == "") {
            this.setState({
                success: {
                    ...success,
                    id: false,
                    password: false
                }
            });
        } else {
            this.setState(
                {
                    loading: true
                },
                () => {
                    this.props.actions.authentication(true, response => {
                        if (
                            response.success &&
                            id == "test" &&
                            password == "123456"
                        ) {
                            navigation.navigate("Loading");
                        } else {
                            this.setState({
                                loading: false
                            });
                        }
                    });
                }
            );
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <ScrollView
                    style={styles.contain}
                    scrollEnabled={this.state.scrollEnabled}
                    onContentSizeChange={(contentWidth, contentHeight) =>
                        this.setState({
                            scrollEnabled: Utils.scrollEnabled(
                                contentWidth,
                                contentHeight
                            )
                        })
                    }
                >
                    <View style={styles.wrapper}>
                        {/* Images Swiper */}
                        <Swiper
                            dotStyle={{
                                backgroundColor: BaseColor.textSecondaryColor
                            }}
                            activeDotColor={BaseColor.primaryColor}
                            paginationStyle={styles.contentPage}
                            removeClippedSubviews={false}
                        >
                            {this.state.slide.map((item, index) => {
                                return (
                                    <View style={styles.slide} key={item.key}>
                                        <Image
                                            source={item.image}
                                            style={styles.img}
                                        />
                                        <Text body1 style={styles.textSlide}>
                                            Welcome to LMS V3
                                        </Text>
                                    </View>
                                );
                            })}
                        </Swiper>
                    </View>
                    <TextInput
                        style={[BaseStyle.textInput, { marginTop: 10 }]}
                        onChangeText={text => this.setState({ id: text })}
                        onFocus={() => {
                            this.setState({
                                success: {
                                    ...this.state.success,
                                    id: true
                                }
                            });
                        }}
                        autoCorrect={false}
                        placeholder="Username"
                        placeholderTextColor={
                            this.state.success.id
                                ? BaseColor.grayColor
                                : BaseColor.primaryColor
                        }
                        value={this.state.id}
                        selectionColor={BaseColor.primaryColor}
                    />
                    <TextInput
                        style={[BaseStyle.textInput, { marginTop: 10 }]}
                        onChangeText={text =>
                            this.setState({ password: text })
                        }
                        onFocus={() => {
                            this.setState({
                                success: {
                                    ...this.state.success,
                                    password: true
                                }
                            });
                        }}
                        autoCorrect={false}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor={
                            this.state.success.password
                                ? BaseColor.grayColor
                                : BaseColor.primaryColor
                        }
                        value={this.state.password}
                        selectionColor={BaseColor.primaryColor}
                    />
                    <View style={{ width: "100%" }}>
                        <Button
                            full
                            loading={this.state.loading}
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                this.onLogin();
                            }}
                        >
                            Sign In
                        </Button>
                        <View style={styles.contentActionBottom}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text body1 grayColor>
                                    Haven’t registered yet?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.authentication()}
                            >
                                <Text body1 primaryColor>
                                    Join Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
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
)(Walkthrough);
