import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'


import { COLORS } from '../../../constants'

import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hooks/useFetch'

const NearByJobs = () => {
  const router = useRouter();
  const { data, loading, error } = useFetch('search', { query: 'React Developer', num_pages: 1, page: 1 })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Near By Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? (<ActivityIndicator size="large" colors={COLORS.primary} />)
          : error ? (<Text>An error occurred</Text>)
            : (
              data?.map((job) => (
                <NearbyJobCard 
                job={job} 
                key={`nearby-job-${job?.job_id}`} 
                handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
                />
              ))
            )}
      </View>

    </View>
  )
}

export default NearByJobs