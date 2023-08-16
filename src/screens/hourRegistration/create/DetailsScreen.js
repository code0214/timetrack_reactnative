import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  HelperText,
  ProgressBar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { commonStyles } from "../../../styles";
import { useSelector } from "react-redux";
import { i18n } from "../../../i18n";
import DropDown from "react-native-paper-dropdown";
import { Controller, useForm } from "react-hook-form";
import { DatePickerInput } from "react-native-paper-dates";
import { labelToDropdownList } from "../../../utils/labelToDropdownList";
import { stringToDropDownList } from "../../../utils/stringToDropDownList";
import { Autocomplete } from "@telenko/react-native-paper-autocomplete";
import { store } from "../../../redux/store";
import { SET_CREATE_HOUR_REG } from "../../../redux/actionTypes";
import ProjectListDialog from "../../../components/ProjectListDialog";
import { storage } from "../../../utils/storage";

export default function DetailsScreen({ navigation }) {
  const { createHourReg } = useSelector((state) => state.hours);
  const [reHoursTimeslots, setReHoursTimeslots] = React.useState([]);
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    setValue,
    formState: { isSubmitting, errors },
    clearErrors,
    setError,
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
      projectNumber: createHourReg?.projectNumber,
      hDate: createHourReg?.hDate ? new Date(createHourReg?.hDate) : new Date(),
      startTime: null,
      endTime: null,
      activityCode: createHourReg?.activityCode,
      username: createHourReg?.username,
      subProject: createHourReg?.subProject,
    },
  });
  const [openProjectListDialog, setOpenProjectListDialog] =
    React.useState(false);
  const [subProjectList, setSubProjectList] = React.useState([]);
  const [showDropDown, setShowDropDown] = React.useState({
    projects: false,
    subProjects: false,
    startTime: false,
    endTime: false,
    activityCode: false,
  });
  const {
    myConfig: {
      username,
      keys: {
        HoursShowActivity,
        HoursShowProject,
        HoursActivitycodes,
        HoursTimeslots,
        HoursTimestart,
        HoursTimeend,
        HoursAllowchangedate,
        HoursMandatorysubproject,
      },
      projects,
    },
  } = useSelector((state) => state.common);

  const handleNext = async (data) => {
    data.hDate = data.hDate.toISOString();
    data.username = username;
    await storage.setItem("last_selected_project", data.projectNumber.value);
    store.dispatch({
      type: SET_CREATE_HOUR_REG,
      payload: { ...createHourReg, ...data },
    });
    navigation.push("Hours");
  };

  React.useEffect(() => {
    setValue("startTime", createHourReg?.startTime || HoursTimestart);
    setValue("endTime", createHourReg?.endTime || HoursTimeend);
  }, [createHourReg]);

  React.useEffect(() => {
    projects.forEach((e) => {
      if (e.key == watch("projectNumber")) setSubProjectList(e.subProjects);
    });
  }, [watch("projectNumber")]);

  React.useEffect(() => {
    // setIsLoading(true);
    init();
    // setIsLoading(false);
  }, []);

  const init = async () => {
    const last_selected_project = await storage.getItem(
      "last_selected_project"
    );
    projects.forEach((e) => {
      if (String(e.key) === String(last_selected_project))
        setValue("projectNumber", { value: e.key, label: e.label });
    });
  };

  React.useEffect(() => {
    const watchStartTime = watch("startTime");
    const reHoursTimeslots = HoursTimeslots.filter(
      (item) => item > watchStartTime
    );
    setReHoursTimeslots(reHoursTimeslots);
  }, [watch("startTime")]);
  return (
    <SafeAreaView>
      <ScrollView>
        {/* {isLoading ? ( */}
        {/* <ProgressBar indeterminate /> */}
        {/* ) : ( */}
        <View style={commonStyles.container}>
          <ProjectListDialog
            setValue={setValue}
            open={openProjectListDialog}
            setOpen={setOpenProjectListDialog}
            defaultValue={watch("projectNumber")}
          />
          <Text variant="titleLarge">{i18n.t("whoWhereAndWhen")}</Text>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: i18n.t("thisIsRequired") },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePickerInput
                locale="en"
                onBlur={onBlur}
                label={i18n.t("date")}
                value={value}
                onChange={onChange}
                inputMode="start"
                style={commonStyles.mt20}
                disabled={!HoursAllowchangedate}
              />
            )}
            name="hDate"
          />

          <HelperText type="error" visible={!!errors.hDate}>
            {errors?.hDate?.message}
          </HelperText>

          <View>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDown
                  label={i18n.t("startTime")}
                  visible={showDropDown.startTime}
                  showDropDown={() =>
                    setShowDropDown({ ...showDropDown, startTime: true })
                  }
                  onDismiss={() =>
                    setShowDropDown({ ...showDropDown, startTime: false })
                  }
                  value={value}
                  setValue={onChange}
                  list={labelToDropdownList(HoursTimeslots)}
                  dropDownItemTextStyle={{ color: theme.colors.onBackground }}
                />
              )}
              name="startTime"
            />
            <HelperText type="error" visible={!!errors.startTime}>
              {errors?.startTime?.message}
            </HelperText>
          </View>
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDown
                  label={i18n.t("endTime")}
                  visible={showDropDown.endTime}
                  showDropDown={() =>
                    setShowDropDown({ ...showDropDown, endTime: true })
                  }
                  onDismiss={() =>
                    setShowDropDown({ ...showDropDown, endTime: false })
                  }
                  value={value}
                  setValue={onChange}
                  list={labelToDropdownList(reHoursTimeslots)}
                  dropDownItemTextStyle={{ color: theme.colors.onBackground }}
                />
              )}
              name="endTime"
            />
            <HelperText type="error" visible={!!errors.endTime}>
              {errors?.endTime?.message}
            </HelperText>
          </View>
          {HoursShowProject && (
            <View>
              <TextInput
                value={watch("projectNumber")?.label}
                label={i18n.t("selectProject")}
                onFocus={() => setOpenProjectListDialog(true)}
                // right={<TextInput.Icon icon="close" onPress={() => setValue("projectNumber", "")}/>}
              />
              <HelperText type="error" visible={!!errors.projectNumber}>
                {errors?.projectNumber?.message}
              </HelperText>
            </View>
          )}

          {subProjectList.length > 0 && (
            <View>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: HoursMandatorysubproject,
                    message: i18n.t("thisIsRequired"),
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <DropDown
                    label={i18n.t("subProjects")}
                    visible={showDropDown.subProjects}
                    showDropDown={() =>
                      setShowDropDown({ ...showDropDown, subProjects: true })
                    }
                    onDismiss={() =>
                      setShowDropDown({ ...showDropDown, subProjects: false })
                    }
                    value={value}
                    setValue={onChange}
                    list={labelToDropdownList(subProjectList)}
                    dropDownItemTextStyle={{
                      color: theme.colors.onBackground,
                    }}
                  />
                )}
                name="subProject"
              />
              <HelperText type="error" visible={!!errors.subProject}>
                {errors?.subProject?.message}
              </HelperText>
            </View>
          )}

          {HoursShowActivity && (
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDown
                    label={i18n.t("activityCode")}
                    visible={showDropDown.activityCode}
                    showDropDown={() =>
                      setShowDropDown({ ...showDropDown, activityCode: true })
                    }
                    onDismiss={() =>
                      setShowDropDown({
                        ...showDropDown,
                        activityCode: false,
                      })
                    }
                    value={value}
                    setValue={onChange}
                    list={stringToDropDownList(HoursActivitycodes)}
                    dropDownItemTextStyle={{
                      color: theme.colors.onBackground,
                    }}
                  />
                )}
                name="activityCode"
              />
              <HelperText type="error" visible={!!errors.activityCode}>
                {errors?.activityCode?.message}
              </HelperText>
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit(handleNext)}
            style={commonStyles.mt20}
          >
            {i18n.t("next")}
          </Button>
        </View>
        {/* )} */}
      </ScrollView>
    </SafeAreaView>
  );
}
