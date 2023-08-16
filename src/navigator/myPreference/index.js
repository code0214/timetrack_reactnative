import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { i18n } from "../../i18n";
import ProfileScreen from "../../screens/setting/profileScreen/ProfileScreen";
import ProfileEditScreen from "../../screens/setting/profileScreen/ProfileEditScreen";

const Stack = createNativeStackNavigator();

function ProfileNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        options={{ title: i18n.t("overview") }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="Edit"
        options={{ title: i18n.t("edit") }}
        component={ProfileEditScreen}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
