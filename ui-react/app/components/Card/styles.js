import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    imageBanner: { width: "100%", height: "100%", borderRadius: 8 },
    contentButtonLike: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    btnFavourite: {
        height: 25,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnFavouriteRemove: {
        height: 25,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5,
        opacity: 0.7
    }
});
