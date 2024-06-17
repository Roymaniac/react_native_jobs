import { useState } from 'react'; 
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';  // Importing constants
import { NearByJobs, PopularJobs, ScreenHeaderBtn, Welcome } from '../components';  // Importing components

const Home = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.menu}
                            dimension="60%"
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={images.profile}
                            dimension="100%"
                        />
                    )
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={() => {
                            if (searchQuery) router.push(`/search/${searchQuery}`);
                        }}
                     />
                    <PopularJobs />
                    <NearByJobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;