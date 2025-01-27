import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Head from './Head'

const Search = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Head title={"Search"}/>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                 <Text >Not Available Right  Now</Text>
               </View>
    </SafeAreaView>
  )
}

export default Search