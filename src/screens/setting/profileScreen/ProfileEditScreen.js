import * as React from "react";
import { ScrollView, View, SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  DataTable,
  ProgressBar,
  Text,
  HelperText,
  TextInput,
} from "react-native-paper";
import { commonStyles } from "../../../styles";
import { i18n } from "../../../i18n";
import { apis } from "../../../apis";
import { Controller, useForm } from "react-hook-form";
import useSnackbar from "../../../context/userSnackbar";
import SpeedDialForLocale from "../../../components/speedDials/SpeedDialForLocale";

export default function ProfileEditScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { dispatch: showSnackbar } = useSnackbar();
  const [openProjectListDialog, setOpenProjectListDialog] =
    React.useState(false);
  const [openDialog, setOpenDialog] = React.useState({ delete: false });

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
    },
  });

  React.useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setIsLoading(true);
      const data = await apis.getpreferences();
      setValue("username", data?.data.username);
      setValue("name", data?.data.name);
      setValue("email", data?.data.email);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await apis.updatePreference(data);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("profileUpdatedSuccessfully"),
        snackbarType: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("somethingWentWrong"),
        snackbarType: "error",
      });
    }
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {isLoading ? (
            <ProgressBar indeterminate />
          ) : (
            <View style={commonStyles.container}>
              <View style={commonStyles.mb20}>
                <Text variant="titleLarge">{i18n.t("editUser")}</Text>
              </View>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: i18n.t("thisIsRequired"),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={i18n.t("username")}
                      onChangeText={onChange}
                      value={value}
                      disabled={true}
                      error={errors.username}
                    />
                  )}
                  name="username"
                />
                <HelperText type="error" visible={!!errors.username}>
                  {errors?.username?.message}
                </HelperText>

                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: i18n.t("thisIsRequired"),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={i18n.t("name")}
                      onChangeText={onChange}
                      value={value}
                      error={errors.name}
                    />
                  )}
                  name="name"
                />
                <HelperText type="error" visible={!!errors.name}>
                  {errors?.name?.message}
                </HelperText>

                <Controller
                  control={control}
                  // rules={{
                  //   required: {
                  //     value: true,
                  //     message: i18n.t("thisIsRequired"),
                  //   },
                  // }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={i18n.t("email")}
                      onChangeText={onChange}
                      value={value}
                      error={errors.email}
                    />
                  )}
                  name="email"
                />
                <HelperText type="error" visible={!!errors.email}>
                  {errors?.email?.message}
                </HelperText>

                <Button
                  mode="contained-tonal"
                  onPress={handleSubmit(handleUpdate)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {i18n.t("update")}
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      {/* <SpeedDialForLocale /> */}
    </>
  );
}
