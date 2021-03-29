import React, { useEffect, useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { Input, Text, Button as ElementsButton } from 'react-native-elements';
import Popover from 'react-native-popover-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const FormScreen = ({navigation, route}) => {
  const ime = useRef();
  const email = useRef();
  const starost = useRef();
  const refs = new Map();
  refs.set("ime", ime);
  refs.set("email", email);
  refs.set("starost", starost);
  const [showPopover, setShowPopover] = useState(false);
  const [reference, setReference] = useState();
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetch("https://tutorial-guide.herokuapp.com/v1/tutorial/2/page/1")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(json);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setTimeout(() => {
        console.log("data", data);
        setShowPopover(true);
      }, 700)
    });
  }, []);

  return (
    <View>
      <Text h1 style={{padding: 8, paddingBottom: 16}}>Vnosna polja</Text>
      <Input placeholder="Ime" ref={ime} keyboardType="default" />
      <Input placeholder="Email" ref={email} keyboardType="email-address" />
      <Input placeholder="Starost" ref={starost} keyboardType="number-pad"/>
      <Button title="Potrdi" onPress={() => navigation.popToTop()}></Button>

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
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text>{data.hintsById[index].content}</Text>
            <ElementsButton
              icon={<Icon name="times" size={16}></Icon>}
              type="clear" 
              buttonStyle={{padding: 0, paddingLeft: 8}}
              onPress={() => setShowPopover(false)} />
          </View>
        <View style={{flexDirection: "row"}}>
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
    </View>
  );
}

export default FormScreen;