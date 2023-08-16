import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text, ProgressBar, DataTable, FAB } from "react-native-paper";
import { commonStyles } from "../../styles";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { i18n } from "../../i18n";
import { useEffect } from "react";
import { getSickLeaves } from "../../redux/actions/hourRegsActions";
import Pagination, { perPageOptions } from "../../components/Pagination";
import { apis } from "../../apis";

export default function SickLeaveOverviewScreen({ navigation }) {
  const [max, setMax] = React.useState(1000);
  const [currentPage, setCurrentPage] = React.useState(0);
  const { isLoading } = useSelector((state) => state.common);
  const { sickLeaves } = useSelector((state) => state.hours);

  useFocusEffect(
    React.useCallback(() => {
      getSickLeaves(perPageOptions[1], currentPage);
    }, [currentPage])
  );

  useEffect(() => {
    async function init() {
      const { data } = await apis.getSickLeaves(100000, 0);
      setMax(data.length);
    }
    init();
  }, []);

  const handleNavigateToSickDetailsScreen = (id) => {
    navigation.navigate("Details", {
      params: { id },
    });
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {isLoading ? (
            <ProgressBar indeterminate />
          ) : (
            <View style={commonStyles.container}>
              <Text variant="titleLarge" style={commonStyles.mv20}>
                {i18n.t("sickLeaveList")}
              </Text>
              <DataTable style={commonStyles.mb120}>
                <DataTable.Header>
                  <DataTable.Title style={{ minWidth: 50 }}>
                    {i18n.t("date")}
                  </DataTable.Title>
                  <DataTable.Title style={commonStyles.mh20}>
                    {i18n.t("project")}
                  </DataTable.Title>
                  <DataTable.Title style={commonStyles.mh20}>
                    {i18n.t("hours")}
                  </DataTable.Title>
                  <DataTable.Title style={commonStyles.mh20}>
                    {i18n.t("status")}
                  </DataTable.Title>
                </DataTable.Header>
                {sickLeaves.map((e) => (
                  <DataTable.Row
                    key={e.id}
                    onPress={() => handleNavigateToSickDetailsScreen(e.id)}
                  >
                    <DataTable.Cell style={{ minWidth: 50 }}>
                      {new Date(e.hDate)
                        .toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace("/", "-")}
                    </DataTable.Cell>
                    <DataTable.Cell style={commonStyles.mh20}>
                      {e.projectNumber}
                    </DataTable.Cell>
                    <DataTable.Cell style={commonStyles.mh20}>
                      {e.hoursTotal}
                    </DataTable.Cell>
                    <DataTable.Cell style={commonStyles.mh20}>
                      {e.status}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <FAB
        icon="plus"
        label={i18n.t("create")}
        style={commonStyles.fabCreate}
        onPress={() => {
          navigation.navigate("Create");
        }}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPage={perPageOptions[1]}
        max={max}
      />
    </>
  );
}
