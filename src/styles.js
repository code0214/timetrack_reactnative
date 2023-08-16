import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
  },
  pagination: {
    position: "absolute",
    bottom: 6,
    right: "2%",
    padding: 10,
    height: 50,
    width: "96%",
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
  },
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
  },
  fabCreate: {
    position: "absolute",
    bottom: 50,
    right: 0,
    margin: 20,
  },
  mv20: {
    marginVertical: 20,
  },
  mv10: {
    marginVertical: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mh20: {
    marginHorizontal: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  mb60: {
    marginBottom: 60,
  },
  mb120: {
    marginBottom: 120,
  },
});
