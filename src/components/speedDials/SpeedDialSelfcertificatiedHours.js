import * as React from "react";
import { FAB, Portal, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { i18n } from "../../i18n";
import { useNavigation } from "@react-navigation/native";

export default function SpeedDialSelfcertificatiedHours({
  handleDelete,
  id,
  showDeleteBtn,
}) {
  const [open, setOpen] = React.useState(false);
  const [actions, setActions] = React.useState([]);
  const navigation = useNavigation();
  const theme = useTheme();
  const onToggleSpeedDialForHome = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (showDeleteBtn)
      setActions([
        {
          icon: "circle-edit-outline",
          label: i18n.t("editSelfcertificatiedHours"),
          onPress: () => {
            navigation.navigate("Edit", {
              params: { id },
            });
          },
        },
        {
          icon: "delete",
          label: i18n.t("deleteSelfcertificatiedHours"),
          onPress: handleDelete,
        },
      ]);
    else
      setActions([
        {
          icon: "circle-edit-outline",
          label: i18n.t("editSelfcertificatiedHours"),
          onPress: () => {
            navigation.navigate("Edit", {
              params: { id },
            });
          },
        },
      ]);
  }, [showDeleteBtn]);

  return (
    <FAB.Group
      open={open}
      color={theme.colors.primary}
      icon={open ? "close" : "format-list-bulleted"}
      actions={actions}
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
