 import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'
 
 export default function activity() {
   return (
     <View style={styles.container}>
       <Card.Title title="账号信息" />
     </View>
   )
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
 })
