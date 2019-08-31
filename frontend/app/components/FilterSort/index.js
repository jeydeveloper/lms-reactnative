import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Icon, Text } from "@components";
import PropTypes from "prop-types";
import { BaseColor } from "@config";

export default class FilterSort extends Component {
    render() {
        const {
            style,
            sortIcon,
            filterIcon,
            modeViewIcon,
            sortTitle,
            filterTitle
        } = this.props;
        return (
            <View style={[styles.contain, style]}>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={this.props.onChangeSort}
                >
                    <Icon
                        name={sortIcon}
                        size={16}
                        color={BaseColor.grayColor}
                        solid
                    />
                    <Text headline grayColor style={{ marginLeft: 5 }}>
                        {sortTitle}
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={this.props.onChangeView}
                        style={{
                            width: 30,
                            alignItems: "flex-end"
                        }}
                    >
                        <Icon
                            name={modeViewIcon}
                            size={16}
                            color={BaseColor.grayColor}
                            solid
                        />
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity
                        onPress={this.props.onChangeFilter}
                        style={styles.contentFilter}
                    >
                        <Icon
                            name={filterIcon}
                            size={16}
                            color={BaseColor.grayColor}
                            solid
                        />
                        <Text headline grayColor style={{ marginLeft: 5 }}>
                            {filterTitle}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

FilterSort.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    sortIcon: PropTypes.string,
    sortTitle: PropTypes.string,
    filterIcon: PropTypes.string,
    filterTitle: PropTypes.string,
    modeView: PropTypes.string,
    onChangeSort: PropTypes.func,
    onChangeView: PropTypes.func,
    onChangeFilter: PropTypes.func
};

FilterSort.defaultProps = {
    style: {},
    sortIcon: "sort-amount-down",
    sortTitle: "",
    filterIcon: "filter",
    filterTitle: "",
    modeViewIcon: "th-list",
    onChangeSort: () => {},
    onChangeView: () => {},
    onChangeFilter: () => {}
};
