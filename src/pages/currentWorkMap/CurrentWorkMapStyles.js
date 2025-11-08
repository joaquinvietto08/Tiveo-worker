import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/globalStyles";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  currentWorkMap__container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  currentWorkMap__map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height,
  },
  currentWorkMap__header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  currentWorkMap__backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 2,
  },
  currentWorkMap__title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.black,
  },
  currentWorkMap__clientPin: {
    alignItems: "center",
    justifyContent: "center",
  },
  currentWorkMap__workerDotOuter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(66,135,245,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(66,135,245,0.5)",
  },
  currentWorkMap__workerDotInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4287f5",
    borderWidth: 2,
    borderColor: colors.white,
  },
  currentWorkMap__emptyState: {
    position: "absolute",
    top: "40%",
    left: 32,
    right: 32,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
  },
  currentWorkMap__emptyTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: colors.black,
    marginTop: 8,
    marginBottom: 4,
  },
  currentWorkMap__emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: colors.gray,
    textAlign: "center",
  },
});
