import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { DataTable, FAB, ProgressBar, Text } from "react-native-paper";
import { commonStyles } from "../../styles";
import { i18n } from "../../i18n";
import { ScrollView } from "react-native-gesture-handler";
import { getHourRegs } from "../../redux/actions/hourRegsActions";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { stringToDropDownList } from "../../utils/stringToDropDownList";
import Pagination, { perPageOptions } from "../../components/Pagination";
import { apis } from "../../apis";

export default function HourRegistrationOverviewScreen({ route, navigation }) {
  const [max, setMax] = React.useState(1000);
  const [currentPage, setCurrentPage] = React.useState(0);
  const { isLoading } = useSelector((state) => state.common);
  const { hourRegs } = useSelector((state) => state.hours);
  const {
    myConfig: {
      keys: { HoursShownewhourregistration, HoursHourstatus },
    },
  } = useSelector((state) => state.common);

  const handleNavigateToDetailsScreen = (id) => {
    navigation.navigate("HourRegistrations", {
      screen: "Details",
      params: { id },
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getHourRegs(perPageOptions[1], currentPage);
    }, [currentPage])
  );

  React.useEffect(() => {
    async function init() {
      const { data: hourRegs } = await apis.getHourRegs(100000, 0);
      setMax(hourRegs.length);
    }
    init();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {isLoading ? (
            <ProgressBar indeterminate />
          ) : (
            <View style={commonStyles.container}>
              <Text variant="titleLarge" style={commonStyles.mv20}>
                {i18n.t("hourRegistrationList")}
              </Text>
              <DataTable style={commonStyles.mb120}>
                <DataTable.Header>
                  <DataTable.Title style={{ minWidth: 50 }}>
                    {i18n.t("date")}
                  </DataTable.Title>
                  <DataTable.Title>{i18n.t("when")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("to")}</DataTable.Title>
                  <DataTable.Title numeric style={commonStyles.mh20}>
                    {i18n.t("hoursTotal")}
                  </DataTable.Title>
                  <DataTable.Title numeric style={commonStyles.mh20}>
                    {i18n.t("status")}
                  </DataTable.Title>
                  {/* <DataTable.Title>{i18n.t("comments")}</DataTable.Title> */}
                </DataTable.Header>

                {hourRegs.map((e) => (
                  <DataTable.Row
                    key={e.id}
                    onPress={() => handleNavigateToDetailsScreen(e.id)}
                  >
                    <DataTable.Cell style={{ minWidth: 50 }}>
                      {new Date(e.hDate)
                        .toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace("/", "-")}
                    </DataTable.Cell>
                    <DataTable.Cell>{e.startTime}</DataTable.Cell>
                    <DataTable.Cell>{e.endTime}</DataTable.Cell>
                    <DataTable.Cell numeric style={commonStyles.mh20}>
                      <Text style={commonStyles.bold}>{e.hoursTotal}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={commonStyles.mh20}>
                      <Text style={commonStyles.bold}>
                        {
                          stringToDropDownList(HoursHourstatus).filter(
                            (item) => item.value == String(e.status)
                          )[0].label
                        }
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      {HoursShownewhourregistration && (
        <FAB
          icon="plus"
          label={i18n.t("create")}
          style={commonStyles.fabCreate}
          onPress={() => {
            navigation.navigate("HourRegistrations", {
              screen: "Create",
            });
          }}
        />
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPage={perPageOptions[1]}
        max={max}
      />
    </>
  );
}
