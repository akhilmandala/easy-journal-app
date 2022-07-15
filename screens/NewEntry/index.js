import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';
import { NewEntryWidgetForm } from '../../components/NewEntryForm';

export const NewEntryWidget = () => {

  const [visible, setVisible] = React.useState(false);

  return (
    <Layout style={styles.container} level='1'>

      <Button onPress={() => setVisible(true)} style={styles.widgetButtonContainer}>
        New Entry
      </Button>


      <Modal visible={visible} style={styles.newEntryFormContainer}>
          <NewEntryWidgetForm setVisible={() => setVisible(!visible)}/>
      </Modal>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "5%",
    paddingTop: 10,
    width: "90%",
  },
  widgetButtonContainer: {
    borderRadius: 15
  },
  newEntryFormContainer: {
    height: "80%",
    width: "80%"
  }
});