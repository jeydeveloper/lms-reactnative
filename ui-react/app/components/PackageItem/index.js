import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon, Button } from "@components";
import { BaseColor } from "@config";
import styles from "./styles";
import PropTypes from "prop-types";

export default class PackageItem extends Component {
    constructor(props) {
        super(props);
    }

    renderPackage() {
        const {
            style,
            packageName,
            price,
            type,
            description,
            onPress,
            onPressIcon
        } = this.props;
        return (
            <View style={[styles.contain, style]}>
                <View style={styles.packageTitleContent}>
                    <Text title2 semibold>
                        {packageName}
                    </Text>
                    <TouchableOpacity onPress={onPressIcon} activeOpacity={0.9}>
                        <Icon
                            name="angle-down"
                            size={36}
                            color={BaseColor.primaryColor}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentPrice}>
                    <Text title1 primaryColor semibold>
                        {price}
                    </Text>
                    <Text
                        footnote
                        accentColor
                        style={{
                            marginLeft: 10,
                            alignSelf: "flex-end"
                        }}
                    >
                        {type}
                    </Text>
                </View>
                <Text body2 numberOfLines={5} style={{ marginTop: 10 }}>
                    {description}
                </Text>
                <Button full style={{ marginTop: 10 }} onPress={onPress}>
                    Book Now
                </Button>
            </View>
        );
    }

    renderPackageIcon() {
        const {
            style,
            packageName,
            price,
            type,
            services,
            onPress
        } = this.props;
        return (
            <View style={style}>
                <View style={styles.contentTopIcon}>
                    <View style={styles.icon}>
                        <Icon
                            name="tag"
                            style={{
                                fontSize: 32,
                                color: "white"
                            }}
                        />
                    </View>
                    <View style={styles.lineIcon} />
                    <Text title2 semibold>
                        {packageName}
                    </Text>
                </View>
                <View style={styles.serviceContentIcon}>
                    {services.map((item, index) => (
                        <Text
                            body2
                            grayColor
                            style={{
                                marginBottom: 20
                            }}
                            key={item.package}
                        >
                            {item.detail}
                        </Text>
                    ))}
                </View>
                <View style={styles.priceContentIcon}>
                    <Text title1 semibold primaryColor>
                        {price}
                    </Text>
                    <Text
                        footnote
                        accentColor
                        style={{
                            marginLeft: 10,
                            alignSelf: "flex-end"
                        }}
                    >
                        {type}
                    </Text>
                </View>
                <View>
                    <Button full onPress={onPress}>
                        Book Now
                    </Button>
                </View>
            </View>
        );
    }

    renderPackageDetail() {
        const {
            style,
            packageName,
            price,
            type,
            description,
            services,
            onPress
        } = this.props;
        return (
            <View style={[styles.contain, style]}>
                <View style={styles.packageTitleContent}>
                    <Text title2 semibold>
                        Congratulations!
                    </Text>
                </View>
                <Text body2 numberOfLines={5} style={{ marginVertical: 10 }}>
                    You have done the test.
                </Text>
                <View style={styles.containItem}>
                    <Text headline accentColor style={{ marginBottom: 6 }}>
                        80%
                    </Text>
                    <Text body2 grayColor>
                        Your Score
                    </Text>
                </View>
                <View style={styles.containItem}>
                    <Text headline accentColor style={{ marginBottom: 6 }}>
                        70%
                    </Text>
                    <Text body2 grayColor>
                        Minimum Score
                    </Text>
                </View>

                <Button full style={{ marginTop: 10 }} onPress={onPress}>
                    Done
                </Button>
            </View>
        );
    }

    render() {
        const { icon, detail } = this.props;
        if (icon) return this.renderPackageIcon();
        else if (detail) return this.renderPackageDetail();
        else return this.renderPackage();
    }
}

PackageItem.propTypes = {
    icon: PropTypes.bool,
    detail: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    packageName: PropTypes.string,
    price: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    services: PropTypes.array,
    onPress: PropTypes.func,
    onPressIcon: PropTypes.func
};

PackageItem.defaultProps = {
    icon: false,
    detail: false,    
    packageName: "",
    description: "",
    price: "",
    type: "",    
    services: [],
    style: {},
    onPress: () => {},
    onPressIcon: () => {}
};
