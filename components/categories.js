import {View,Text, ScrollView, TouchableOpacity,Image} from 'react-native'
import { categoryData } from '../utils'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated,{FadeInDown} from 'react-native-reanimated'
export default function Categories({categories,activeCategory,handleChangeCategory}){
    
    return(
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='space-x-4'
            contentContainerStyle={{paddingHorizontal:15}}>
             {
                categories.map((cat,index)=> {
                    let isActive = cat.strCategory==activeCategory
                    let activeButtonClass= isActive? 'bg-amber-400':'bg-black/10'
                    return(
                        <TouchableOpacity
                        key={index}
                        className='flex items-center space-y-2'
                        onPress={()=>handleChangeCategory(cat.strCategory)}>
                            <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                                <Image
                                source={{uri:cat.strCategoryThumb}}
                                className='rounded-full'
                                style={{
                                    height:hp(6),
                                    width:hp(6)
                                }}/>
                            </View>
                            <Text className='text-neutral-600' style={{fontSize:hp(1.6)}}>
                                {cat.strCategory}
                            </Text>

                        </TouchableOpacity>
                    )
                    })
             }   

            </ScrollView>
        </Animated.View>
    )
}