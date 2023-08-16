import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, DataTable } from "react-native-paper";
import { commonStyles } from "../../styles";
import { ScrollView } from "react-native-gesture-handler";
import { i18n } from "../../i18n";
import {
  name,
  web,
  supportEmail,
  buildDate,
  version,
} from "../../../package.json";

export default function AboutScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={commonStyles.container}>
          <Text variant="titleLarge" style={commonStyles.mv20}>
            {i18n.t("applicationStatus")}
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>{i18n.t("key")}</DataTable.Title>
              <DataTable.Title>{i18n.t("value")}</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>{i18n.t("name")}</DataTable.Cell>
              <DataTable.Cell>{name.toUpperCase()}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>{i18n.t("appVersion")}</DataTable.Cell>
              <DataTable.Cell>{version}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>{i18n.t("buildDate")}</DataTable.Cell>
              <DataTable.Cell>{buildDate}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>{i18n.t("web")}</DataTable.Cell>
              <DataTable.Cell>{web}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>{i18n.t("supportEmail")}</DataTable.Cell>
              <DataTable.Cell>{supportEmail}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
