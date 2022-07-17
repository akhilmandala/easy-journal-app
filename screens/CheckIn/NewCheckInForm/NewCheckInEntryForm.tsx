import { useState } from "react";
import { Button, Card, Text } from "@ui-kitten/components";
import { connect as connectRedux, useDispatch, useSelector } from "react-redux";
import { addCheckIn, CheckIn, selectLatestEntryOrder } from "../../../redux/store";
import uuid from "react-native-uuid";
import dayjs from "dayjs";
import { Formik } from "formik";
import { CheckInOptionSelection } from "./CheckInOptionSelection";


export const NewCheckInFormScreen = ({ setVisible }) => {
    const dispatch = useDispatch();
    const [checkInDraft, setCheckInDraft] = useState({
      id: String(uuid.v4()),
      emotion: "",
      date: dayjs().unix(),
      order: useSelector(selectLatestEntryOrder) + 1,
    } as CheckIn);
  
    let [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const onLayout = ({ nativeEvent }) => {
      let { width, height } = nativeEvent.layout;
      setDimensions({
        width,
        height,
      });
    };
  
    return (
      <Formik
        initialValues={{ emotion: "", iconName: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Card
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onLayout={onLayout}
          >
            <Text
              style={{
                fontSize: 24,
                alignSelf: "center",
              }}
            >
              How are you doing?
            </Text>
            <CheckInOptionSelection
              dimensions={dimensions}
              handleChange={handleChange}
            />
            <Button
              onPress={() => {
                if (values.emotion !== "") {
                  dispatch(
                    addCheckIn({ newCheckIn: { ...checkInDraft, ...values } })
                  );
                }
                setVisible(false);
              }}
            >
              Check In
            </Button>
          </Card>
        )}
      </Formik>
    );
  };