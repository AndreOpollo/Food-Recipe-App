import { useNavigation, useRoute } from '@react-navigation/native'
import{View,Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon, UsersIcon } from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/loading'
import YoutubeIframe from 'react-native-youtube-iframe'
export default function RecipeDetailsScreen(){
    const route= useRoute()
    const item =route.params
   // console.log(item)
   const [isFavorite,setIsFavorite]=useState(false)
   const [meal,setMeal]=useState(null)
   const[loading,setLoading]=useState(true)
   const navigation = useNavigation()
   const getMealData = async(id)=>{
    const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    if(response && response.data){
        setMeal(response.data.meals[0])
        setLoading(false)
    }
   }
   useEffect(()=>{
     getMealData(item.idMeal)
     

   },[])
   const ingredientIndexes = (meal)=>{
    if(!meal) return []
    let indexes = []
    for(let i=1;i<=20;i++){
        if(meal['strIngredient'+i]){
            indexes.push(i)
        }
        
    }
    return indexes
   }
   const getYoutubeVideoId = (url)=>{
    const regex = /[?&]v=([^&]+)/
    const match = url.match(regex)
    if(match && match[1]){
        return match[1]
    }
    return null

   }
    return(
     <ScrollView
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{paddingBottom:30}}
     className='flex-1 bg-white'>
        {/* Recipe Image */}
        <View className='flex-row justify-center'>
            <Image
            source={{uri:item.strMealThumb}}
            style={{height:hp(50),width:wp(98),borderRadius:53, borderBottomLeftRadius:40,borderBottomRightRadius:40,margin:4}}/>
        </View>
        {/* Icons */}
        <View className='w-full flex-row justify-between items-center absolute pt-6'>
            <TouchableOpacity className='bg-white p-2 rounded-full ml-4' onPress={()=>navigation.goBack()}>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24'/>
            </TouchableOpacity>
            <TouchableOpacity className='bg-white p-2 rounded-full mr-4' onPress={()=>setIsFavorite(!isFavorite)}>
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite?'red':'gray'}/>
            </TouchableOpacity>

        </View>
        {/* description */}
        {
            loading?(
                <Loading size='large' className='mt-16' color='yellow'/>
            ):(
                <View className='px-4 flex justify-between space-y-4 pt-8 '>
                    {/* name */}
                    <View className='space-y-2'>
                        <Text style={{fontSize:hp(3)}} className='font-bold flex-1 text-neutral-700'>
                            {meal?.strMeal}
                        </Text>
                        <Text style={{fontSize:hp(2)}} className='font-medium flex-1 text-neutral-500'>
                            {meal?.strArea}
                        </Text>
                    </View>
                    <View className='flex-row justify-around'>
                        <View className='rounded-full bg-amber-300 p-2 flex'>
                            <View 
                            className='bg-white rounded-full flex items-center justify-center'
                            style={{height:hp(6.5), width:hp(6.5)}}>
                                <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>

                            </View>
                            <View className='flex items-center py-2 space-y-1'>
                                <Text style={{fontSize:hp(2)}}className='font-bold text-neutral-700'>
                                    35

                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
                                    Mins

                                </Text>
                            </View>

                        </View>
                        <View className='flex rounded-full bg-amber-300 p-2'>
                            <View className='bg-white rounded-full flex items-center justify-center'
                            style={{height:hp(6.5),width:hp(6.5)}}>
                                <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                                
                            </View>
                            <View className='flex items-center py-2 space-y-2'>
                                <Text style={{fontSize:hp(2)}} className='font-bold text-neutral-700' >
                                    03
                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
                                    Servings
                                </Text>
                            </View>

                        </View>
                        <View className='rounded-full flex bg-amber-300 p-2'>
                            <View className='bg-white rounded-full justify-center items-center'
                            style={{height:hp(6.5),width:hp(6.5)}}>
                                <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>

                            </View>
                            <View className='flex items-center py-2 space-y-2'>
                                <Text style={{fontSize:hp(2)}} className='font-bold text-neutral-700'>
                                    103
                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
                                    Calories
                                </Text>
                            </View>
                        </View>
                        <View className='flex rounded-full p-2 bg-amber-300'>
                            <View style={{height:hp(6.5),width:hp(6.5)}}
                             className='bg-white rounded-full justify-center items-center'>
                                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                            </View>
                            <View className='flex items-center py-2 space-y-2'>
                                <Text style={{fontSize:hp(2)}} className='font-bold text-neutral-700'>
                                    90%
                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
                                    Easy
                                </Text>
                            </View>

                        </View>


                    </View>
                    {/* ingredients */}
                    <View className='space-y-4'>
                        <Text style={{fontSize:hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                            Ingredients
                        </Text>
                        <View className='space-y-2 ml-3'>

                            {
                                ingredientIndexes(meal).map(i=>{
                                    return(
                                        <View key={i}className='flex-row space-x-4'>
                                        <View style={{height:hp(1.5),width:hp(1.5)}}
                                        className='bg-amber-400 rounded-full'/>
                                          <View className='flex-row space-x-2'>
                                            <Text style={{fontSize:hp(1.7)}}className='font-extrabold text-neutral-700'>
                                                {meal['strMeasure'+i]}
                                            </Text>
                                            <Text style={{fontSize:hp(1.7)}} className='font-medium text-neutral-600'>
                                                {meal['strIngredient'+i]}
                                            </Text>
                                            </View>

                                         </View>

                                    )
                                    })

                            }
                        </View>

                    </View>
                     {/* instructions */}
                     <View className='space-y-4'>
                        <Text style={{fontSize:hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                            Instructions
                        </Text>
                        <View className='space-y-2 ml-3'>

                        <Text style={{fontSize:hp(1.6)}} className='text-neutral-700'>
                            {
                            meal?.strInstructions
                            }

                        </Text>
                        </View>

                    </View>
                    {/* recipe video */}
                    {
                        meal.strYoutube && (
                            <View className='space-y-4'>
                                <Text style={{fontSize:hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                                    Recipe Video
                                </Text>
                                <View>
                                    <YoutubeIframe
                                    height={hp(30)}
                                    videoId={getYoutubeVideoId(meal.strYoutube)}/>

                                </View>

                           </View>
                        
                        )
                    }

                    
                </View>
            )
        }

     </ScrollView>
    )
   
}