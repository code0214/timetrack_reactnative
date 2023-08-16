import * as React from "react";
import { ScrollView, View, SafeAreaView, StyleSheet } from "react-native";
import { Button, DataTable, ProgressBar, Text } from "react-native-paper";
import { commonStyles } from "../../../styles";
import { i18n } from "../../../i18n";
import { apis } from "../../../apis";

export default function ProfileScreen({ navigation }) {
  const [preferences, setPreferences] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setIsLoading(true);
      const myPreferences = await apis.getpreferences();
      setPreferences(myPreferences.data);
      console.log(preferences);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <ProgressBar indeterminate />
        ) : (
          <View style={commonStyles.container}>
            <View style={commonStyles.mb20}>
              <Text variant="titleLarge">{i18n.t("myPreferences")}</Text>
            </View>
            <DataTable style={commonStyles.mb20}>
              <DataTable.Header>
                <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                <DataTable.Title>{i18n.t("value")}</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("username")}</DataTable.Cell>
                <DataTable.Cell>{preferences.username}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("name")}</DataTable.Cell>
                <DataTable.Cell>{preferences.name}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("email")}</DataTable.Cell>
                <DataTable.Cell>{preferences.email}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("secret")}</DataTable.Cell>
                <DataTable.Cell>{preferences.secret}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("locale")}</DataTable.Cell>
                <DataTable.Cell>{preferences.locale}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("enabled")}</DataTable.Cell>
                <DataTable.Cell>
                  {String(preferences.enabled)[0].toUpperCase() +
                    String(preferences.enabled).slice(1)}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <Button
              mode="contained-tonal"
              style={styles.buttonStyle}
              onPress={() => {
                navigation.navigate("Edit");
              }}
            >
              {i18n.t("edit")}
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 16,
  },
});
