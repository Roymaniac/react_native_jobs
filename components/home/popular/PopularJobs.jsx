import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'


import { COLORS, SIZES } from '../../../constants'
import styles from './popularjobs.style'
import PopularJobCard  from '../../common/cards/popular/PopularJobCard'
import useFetch  from '../../../hooks/useFetch'

const PopularJobs = () => {
  const router = useRouter();
  const { data, loading, error } = useFetch('search', { query: 'React Developer', num_pages: 1, page: 1})

  const handleCardPress = (item) => {
    console.log(item.job_id)
    router.push(`/job-details/${item.job_id}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? (<ActivityIndicator size="large" colors={COLORS.primary} />) 
        : error ? (<Text>An error occurred</Text>)
        : (
          <FlatList 
            data={data}
            // use index as key for now
            keyExtractor={(_, index) => index.toString() }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ columnGap: SIZES.small }}
            renderItem={({ item }) => (
              <PopularJobCard item={item}
                selectedJob={item.selected}
                handleCardPress={handleCardPress}
               />
            )}
          />
        )}
      </View>

    </View>
  )
}

export default PopularJobs