import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, SafeAreaView, Button } from 'react-native';
import Popover, { Rect } from 'react-native-popover-view';
import { useHeaderHeight } from '@react-navigation/stack';
import { Button as ElementsButton } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const TutorialScreen = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [showPopover, setShowPopover] = useState(false);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
  
    const wWidth = Dimensions.get("window").width;
    const wHeight = Dimensions.get("window").height;
    const imageWidth = wWidth * 0.5;
    const imageHeight = imageWidth * 16 / 9;
    const headerHeight = useHeaderHeight();
    let loaded = 2;
  
    useEffect(() => {
      fetch("https://tutorial-guide.herokuapp.com/v1/tutorial/" + route.params.tutorialId + "/page/" + route.params.pageNumber)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
        setShowPopover(true);
      });
    }, []);
  
    return (
      <SafeAreaView style={{flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        {isLoading ? <View></View> : (
          data.hintsById.length == 0 ? <View></View> : (
            <Popover  popoverStyle={{padding: 10}}
                      from={new Rect(wWidth * 0.25 + data.hintsById[index].x / 750 * imageWidth,
                                    data.hintsById[index].y / 1334 * imageHeight + headerHeight,
                                    0,
                                    0)}
                      isVisible={showPopover}
        onRequestClose={() => {
            console.log("closing");
            setShowPopover(false);
        }}
        onCloseStart={() => {
          console.log("closing start");
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
                      placement={"bottom"}>
              <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text>{data.hintsById[index].content}</Text>
                  <ElementsButton
                    icon={<Icon name="times" size={16}></Icon>}
                    type="clear" 
                    buttonStyle={{padding: 0, paddingLeft: 8}}
                    onPress={() => setShowPopover(false)} />
                </View>
                <View style={{flexDirection: "row"}}>
                  <Button title="Nazaj" type="clear" onPress={() => {
                    setDirection(-1);
                    setShowPopover(false);
                  }} />
                  <Button title="Naprej" onPress={() => {
                    setDirection(1);
                    setShowPopover(false);
                  }} />
                </View>
                
              </View>
              
            </Popover>
          )
        )}
        
        <View style={{width: "100%", flexDirection: "row", justifyContent: "center"}}>
          <Image source={{uri: data.image}} style={{width: imageWidth, height: imageHeight}} />
        </View>
  
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          
        </View>
  
        <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", paddingBottom: 16, paddingHorizontal: 16}}>
          <Button title="Nazaj" onPress={() => navigation.goBack()} />
          {isLoading ? <Text></Text> : <Button title={data.next != null ? "Naprej" : "Končaj"} onPress={() => {data.next != null ? navigation.push("Tutorial", {
            tutorialId: route.params.tutorialId,
            pageNumber: route.params.pageNumber + 1
          }) : navigation.popToTop()}} />}
        </View>
      </SafeAreaView>
    );
}

export default TutorialScreen;
