import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StatsParamList } from "../../types";
import { Layout, Text } from "@ui-kitten/components";

interface Props {
  navigation: StackNavigationProp<StatsParamList>;
}

export default function Edit({ navigation }: Props) {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">Edit</Text>
    </Layout>
  );
}
