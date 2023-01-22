import React, { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const handleTask = () => {
    if (task != null) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  };
  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    setCompletedTasks([...completedTasks, taskItems[index]]);
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  };
  return (
    <ImageBackground
      source={require("./images/feybongo.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.tasksWarper}>
          <Text style={styles.title}>Today's tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask()}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTextWarper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          ></TextInput>
          <TouchableOpacity onPress={() => handleTask()}>
            <View style={styles.addWarper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: "0%",
  },
  title: {
    color: "#FFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: "10%",
  },
  items: {
    marginTop: 30,
  },
  writeTextWarper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    width: 250,
    borderRadius: 60,
    borderBottomColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWarper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    alignContent: "center",
  },
});
