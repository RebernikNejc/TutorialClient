import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import Popover, { Rect } from 'react-native-popover-view';
import { useHeaderHeight } from '@react-navigation/stack';

const TutorialScreen = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [showPopover, setShowPopover] = useState(false);
    const [index, setIndex] = useState(0);
  
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
            if (index < data.hintsById.length - 1) {
                console.log("inside next slide");
              
                setTimeout(() => {
                    setIndex(index + 1);
                    setShowPopover(true);
                }, 1000);
            }
        }}
                      placement={"bottom"}>
              <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>{data.hintsById[index].content}</Text>
                <Button title={index < data.hintsById.length - 1 ? "Naprej" : "OK"} onPress={() => setShowPopover(false)} />
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
