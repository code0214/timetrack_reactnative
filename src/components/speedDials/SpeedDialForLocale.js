import * as React from "react";
import { FAB, Portal, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { i18n } from "../../i18n";
import { useNavigation } from "@react-navigation/native";

export default function SpeedDialForLocale() {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();
  const theme = useTheme();

  const onToggleSpeedDialForHome = () => {
    setOpen(!open);
  };

  return (
    <FAB.Group
      open={open}
      color={theme.colors.primary}
      icon={open ? "close" : "format-list-bulleted"}
      actions={[
        {
          icon: "translate",
          label: i18n.t("english"),
          //   onPress: () => {},
        },
        {
          icon: "google-translate",
          label: i18n.t("norsk"),
          //   onPress: () => {},
        },
      ]}
      onStateChange={({ open }) => setOpen(open)}
      onPress={onToggleSpeedDialForHome}
      style={styles.fab}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 0,
    right: 0,
    bottom: 0,
  },
});
