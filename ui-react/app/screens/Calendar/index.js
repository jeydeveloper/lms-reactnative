import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Text, Button, SafeAreaView, Header, Icon } from "@components";
import { Calendar } from "react-native-calendars";
import styles from "./styles";
import { Images, BaseColor, BaseStyle } from "@config";

export default class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currentDate: ''
        };
    }

    componentDidMount() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        if(month < 10) month = '0'+month;

        this.setState({
            currentDate: (year + '-' + month + '-' + date)
        });
    }

    render() {
        const { navigation } = this.props;
        const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
        const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
        const workout = {key:'workout', color: 'green'};
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Calendar"
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
                <View
                    style={{
                        paddingHorizontal: 20
                    }}
                >
                    <Calendar
                      markedDates={{
                        [this.state.currentDate]: {selected: true, selectedColor: 'blue'},
                        '2019-09-30': {dots: [vacation, massage, workout]}
                      }}
                      markingType={'multi-dot'}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
