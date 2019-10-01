import React, { Component } from "react";
import { View, FlatList, RefreshControl, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    RateDetail,
    CommentItem,
    Button
} from "@components";
import styles from "./styles";

// Load sample data
import { ReviewData } from "@data";

import {
  SelectMultipleButton,
  SelectMultipleGroupButton
} from "react-native-selectmultiple-button";

export default class PostTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateDetail: {
                point: 4.7,
                maxPoint: 5,
                totalRating: 25,
                data: ["5%", "5%", "35%", "40%", "10%"]
            },
            reviewList: ReviewData,
            loading: false
        };
    }

    render() {
        const { navigation } = this.props;
        let { rateDetail, reviewList } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Post Test"
                    subTitle="Strengthening Courage"
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
                <ScrollView>
                    <FlatList
                        style={{ paddingHorizontal: 20 }}
                        data={reviewList}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => (
                            <CommentItem
                                style={{ marginTop: 10 }}
                                image={item.source}
                                name={item.name}
                                rate={item.rate}
                                date={item.date}
                                title={item.title}
                                comment={item.comment}
                            />
                        )}
                    />

                    <SelectMultipleGroupButton
                      multiple={true}
                      group={[
                        { value: 'XC40, this is one of car series' },
                        { value: 'XC60 is a Sports Utility Vehicle' },
                        { value: 'XC90 is a large SUV' },
                        { value: 'S90 is a business car' }]}
                      defaultSelectedIndexes={[0]}
                      textStyle={{ fontSize: 18 }}
                      buttonViewStyle={{ alignItems: 'flex-start', borderWidth: 0, margin: 0, borderRadius: 0 }}
                      highLightStyle={{
                        borderColor: 'transparent', textColor: 'green', backgroundColor: 'transparent',
                        borderTintColor: 'transparent', textTintColor: 'white', backgroundTintColor: 'green'
                      }}
                      containerViewStyle={{ flexDirection: 'column', height:150, justifyContent:'space-between'}}
                    />

                    <View style={{
                        alignItems: "center",
                        padding: 20,
                        width: "100%"
                    }}>
                        <View style={{ width: "100%" }}>
                            <Button
                                full
                                loading={this.state.loading}
                                style={{ marginTop: 20 }}
                                onPress={() => 
                                    navigation.navigate("PostTestResult")
                                }
                            >
                                Submit Your Answer
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
