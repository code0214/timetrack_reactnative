import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { commonStyles } from "../styles";
import { i18n } from "../i18n";

export const perPageOptions = [10, 20, 30];

const Pagination = ({
  perPage = perPageOptions[2],
  currentPage = 0,
  setCurrentPage,
  max = 0,
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        commonStyles.pagination,
        { backgroundColor: theme.colors.elevation.level5 },
      ]}
    >
      <IconButton
        icon="chevron-double-left"
        size={20}
        disabled={currentPage === 0}
        onPress={() => {
          setCurrentPage(0);
        }}
      />
      <IconButton
        icon="chevron-left"
        size={20}
        disabled={currentPage === 0}
        onPress={() => {
          if (currentPage > 0) setCurrentPage(currentPage - 1);
        }}
      />
      <Text variant="bodyLarge">{`${i18n.t("page")} ${currentPage + 1}`}</Text>
      <IconButton
        icon="chevron-right"
        size={20}
        disabled={currentPage === Math.floor(max / perPage)}
        onPress={() => setCurrentPage(currentPage + 1)}
      />
      <IconButton
        icon="chevron-double-right"
        size={20}
        disabled={currentPage === Math.floor(max / perPage)}
        onPress={() => setCurrentPage(Math.floor(max / perPage))}
      />
    </View>
  );
};

export default Pagination;
