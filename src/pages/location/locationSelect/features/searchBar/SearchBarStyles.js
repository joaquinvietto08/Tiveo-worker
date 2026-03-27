import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    locationSelect__searchBar__addressContainer: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#C8C8C8",
        flexDirection: "row",
        flex: 1,
    },
    locationSelect__searchBar__iconContainer:{
        width: 20,
        alignItems: "center"
    },
    locationSelect__searchBar__subContainer:{
        marginLeft: 10,
    },
    locationSelect__searchBar__addressName: {
        fontFamily: "Inter-Medium",
        fontSize: 15,
    },
    google_inputContainer: {
        marginTop: 15,
        paddingHorizontal: 20,
        flex: 0,
    },
})