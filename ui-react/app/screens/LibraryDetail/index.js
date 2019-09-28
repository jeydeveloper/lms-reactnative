import React, { Component } from "react";
import { RefreshControl, FlatList } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    PostItem,
    ProfileAuthor,
    Icon
} from "@components";
import styles from "./styles";

// Load sample data
import { PostDetailData } from "@data";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            posts: PostDetailData
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Enhancement"
                    subTitle="What do you want to learn today"
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
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={[BaseColor.primaryColor]}
                            tintColor={BaseColor.primaryColor}
                            refreshing={this.state.refreshing}
                            onRefresh={() => { }}
                        />
                    }
                    data={this.state.posts}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <PostItem
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            onPress={() => navigation.navigate("PostDetail")}
                            onPressLike={() => {}}
                            onPressFavouriteRemove={() => {}}
                            buttonTitle="Add Favourite"
                        >
                        </PostItem>
                    )}
                />
            </SafeAreaView>
        );
    }
}
