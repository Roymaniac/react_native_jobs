import React from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'

import { useState, useCallback } from 'react'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hooks/useFetch'

const tabs = ["About", "Qualifications", "Responsibilities"]

const JobDetails = () => {
    const params = useLocalSearchParams()
    const router = useRouter()
    const { data, loading, error, ref } = useFetch('job-details', { job_id: params.id })

    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])

    const onRefresh = useCallback(() => {})

    const displayTabContent = () => {
        switch (activeTab) {
            case "About":
                return <JobAbout 
                        info={data[0].job_description ?? "No description available"}
                    />
            case "Qualifications":
                return <Specifics 
                    title="Qualifications"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                    />
            case "Responsibilities":
                return <Specifics 
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                    />
            default:
                break;
        }
    }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerTitle: '',
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={ () => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension="60%"
                    />  
                )
            }}
        />

          <>
              <ScrollView showsVerticalScrollIndicator={false} 
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              >
                  {loading ? (<ActivityIndicator size="large" colors={COLORS.primary} />)
                      : error ? (<Text>An error occurred</Text>)
                          : data.length === 0 ? (<Text>No data</Text>) :
                              (<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                  <Company
                                      companyLogo={data[0].employer_logo}
                                      companyName={data[0].employer_name}
                                      jobTitle={data[0].job_title}
                                      location={data[0].job_country}
                                  />
                                  <JobTabs 
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                  />

                                  {displayTabContent()}
                              </View>
                              )}
              </ScrollView>
                <JobFooter 
                    url={data[0]?.job_google_link}
                />
          </>

    </SafeAreaView>
  )
}

export default JobDetails