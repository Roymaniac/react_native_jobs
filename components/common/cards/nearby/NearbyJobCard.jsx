import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style'
import { checkImageURL } from '../../../../utils'

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>

      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: checkImageURL(job.employer_logo) ? job.employer_logo : 'https://via.placeholder.com/450' }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
      <Text style={styles.companyName} numberOfLines={1}>{job.employer_name}</Text>
        <Text style={styles.jobName} numberOfLines={1}>{job.job_title}</Text>
        <Text style={styles.jobType} numberOfLines={1}>{job.job_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard