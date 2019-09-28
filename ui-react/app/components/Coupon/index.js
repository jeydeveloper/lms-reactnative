import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";

export default class Coupon extends Component {
    render() {
        const { style, name, code, description, valid, remain, onPress, assignedBy} = this.props;
        return (
            <TouchableOpacity style={[styles.contain, style]}
                onPress={onPress}
            >
                <View style={styles.nameContent}>
                    <Text body2 whiteColor semibold>
                        {name}
                    </Text>
                </View>
                <View style={styles.mainContent}>
                    <Text headline whiteColor>
                        {code}
                    </Text>
                    <Text body2 whiteColor>
                        {description}
                    </Text>
                    <Text 
                        caption2
                        whiteColor
                    >
                        {assignedBy}
                    </Text>
                </View>
                <View style={styles.validContent}>
                    <Text overline semibold>
                        {valid}
                    </Text>
                    <Text overline semibold>
                        {remain}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

Coupon.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    code: PropTypes.string,
    assignedBy: PropTypes.string,
    description: PropTypes.string,
    valid: PropTypes.string,
    remain: PropTypes.string,
    onPress: PropTypes.func
};

Coupon.defaultProps = {
    style: {},
    name: "",
    code: "",
    assignedBy: "",
    description: "",
    valid: "",
    remain: "",
    onPress: () => {}
};
