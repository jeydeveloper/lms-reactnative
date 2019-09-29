import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, PackageItem } from "@components";
import styles from "./styles";

// Load sample data
import { PackageData } from "@data";

export default class PostTestResult extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            packageItem: PackageData[0],
            packageItemDetail: PackageData[1]
        };
    }
    render() {
        const { navigation } = this.props;
        const { packageItem, packageItemDetail } = this.state;

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Post Test Result"
                    subTitle="Strengthening Courage"
                />
                <ScrollView>
                    <View style={styles.contain}>
                        <PackageItem
                            detail
                            packageName={packageItemDetail.packageName}
                            price={packageItemDetail.price}
                            type={packageItemDetail.type}
                            description={packageItemDetail.description}
                            services={packageItemDetail.services}
                            onPress= {() => {
                                navigation.navigate("Home")
                            }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
