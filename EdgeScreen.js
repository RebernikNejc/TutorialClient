import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { Text } from 'react-native-elements';
import Popover from 'react-native-popover-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const EdgeScreen = ({navigation, route}) => {
  const b1 = useRef();
  const b2 = useRef();
  const b3 = useRef();
  const b4 = useRef();
  const b5 = useRef();
  const b6 = useRef();
  const b7 = useRef();
  const b8 = useRef();
  const b9 = useRef();
  const refs = new Map();
  refs.set("b1", b1);
  refs.set("b2", b2);
  refs.set("b3", b3);
  refs.set("b4", b4);
  refs.set("b5", b5);
  refs.set("b6", b6);
  refs.set("b7", b7);
  refs.set("b8", b8);
  refs.set("b9", b9);
  const [showPopover, setShowPopover] = useState(false);
  const [reference, setReference] = useState();
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("https://tutorial-guide.herokuapp.com/v1/tutorial/3/page/1")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(json);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setTimeout(() => {
        console.log(data);
        console.log("showing popover");
        setShowPopover(true);
      }, 700)
    });
  }, []);

  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between"}}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Button title="Button" ref={b1} icon={<Icon name="arrow-right" />}></Button>
            <Button title="Button" ref={b2}></Button>
            <Button title="Button" ref={b3}></Button>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Button title="Button" ref={b4}></Button>
            <Button title="Button" ref={b5}></Button>
            <Button title="Button" ref={b6}></Button>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Button title="Button" ref={b7}></Button>
            <Button title="Button" ref={b8}></Button>
            <Button title="Button" ref={b9}></Button>
          </View>
        </View>
        

        {data == null ?
        <View></View> : 
        <Popover
          popoverStyle={{padding: 8}}
          from={refs.get(data.hintsById[index].ref)}
          isVisible={showPopover}
          onRequestClose={() => {
            setShowPopover(false);
          }}
          onCloseStart={() => {
            if (direction == 0 || index == 0 && direction == -1 || index == data.hintsById.length - 1 && direction == 1)
              return;
            setTimeout(() => {
              setIndex(index + direction);
              setShowPopover(true);
            }, 700);
          }}
          onOpenStart={() => {
            setDirection(0);
          }}
        >
          <Text>{data.hintsById[index].content}</Text>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Button
              title="Nazaj"
              color="gray"
              onPress={() => {
                setDirection(-1);
                setShowPopover(false);
              }} />
            <Button
              title="Naprej"
              onPress={() => {
                setDirection(1);
                setShowPopover(false);
              }} />
          </View>
        </Popover>}
      </SafeAreaView>
  );
}

export default EdgeScreen;