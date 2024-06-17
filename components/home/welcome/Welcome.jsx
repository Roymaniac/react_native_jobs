import  { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import { COLORS, icons, SIZES } from '../../../constants'

import styles from './welcome.style'

const Welcome = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("Full-time")

  return (
    <View>
     <View style={styles.container}>
        <Text style={styles.userName}>Welcome back, John</Text>
        <Text style={styles.welcomeMessage}>Find your dream job</Text>
      </View>

      <View style={styles.searchContainer}>
       <View style={styles.searchWrapper}>
          <TextInput
            placeholder="What are you looking for?"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => { setSearchQuery(text) }}
          />
       </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
          data={["Full-time", "Part-time", "Contract", "Remote", "Internship", "Freelance"]}
          keyExtractor={(item) => item }
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.small }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab(selectedTab, item)} 
              onPress={() => {
                setSelectedTab(item)
                router.push(`/search/${item}`)
              }}>
              <Text style={styles.tabText(selectedTab, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
       </View>

    </View>
  )
}

export default Welcome