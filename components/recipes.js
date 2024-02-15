import { Image, Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from "../utils";
import { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { useNavigation } from "@react-navigation/native";
 


export default function Recipes({meals,categories}){
    const navigation = useNavigation()
    return(
        <View className='mx-4 space-y-3'>
            <Text style={{fontSize:hp(3)}}className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
                {
                    categories.length==0||meals.length==0 ?(
                        <Loading size='large' color='yellow'className='mt-20'/>
                    ) :(
                        <MasonryList
                        data={meals}
                        keyExtractor={(item)=> item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item,i}) => <RecipeCard item={item} index={i} navigation={navigation}/>}
                        onEndReachedThreshold={0.1}
                        
                     />

                    )
                }
           
            </View>
        </View>
    )
}
const RecipeCard = ({item,index,navigation})=>{
    let isEven = index%2==0
    let isOdd = index%3==0 
    
    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(200).springify().damping(12)}>
            <Pressable
            className='flex justify-center mb-4 space-y-1'
            style={{width:"100%" ,paddingLeft:isEven?0:8,paddingRight:isEven?8:0}}
            onPress={()=>navigation.navigate('Recipe-Details',{...item})}>
                <Image
                source={{uri:item.strMealThumb}}
                style={{
                    width:"100%",
                    height: isOdd ? hp(25):hp(35),
                    borderRadius:35
                    
                }}
                className="bg-black/5"
                />
                <Text style={{fontSize:hp(1.5)}} className='font-semibold ml-2 text-neutral-600'>
                    {
                        item.strMeal.length>20?item.strMeal.slice(0,20):item.strMeal
                    }
                </Text>

            </Pressable>
        </Animated.View>
    )
}