import { StatusBar } from "expo-status-bar";
import {  ScrollView, Text, View ,Image, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "../components/recipes";



export default function HomeScreen(){

    const[activeCategory,setActiveCategory]=useState('Beef')
    const[categories,setCategories]=useState([])
    const[meals,setMeals]=useState([])

    const handleChangeCategory = (category)=>{
        getRecipes(category)
        setActiveCategory(category)
        setMeals([])
    }

    const getCategories = async()=>{
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            if(response && response.data){
                setCategories(response.data.categories)
            }
            
        } catch (error) {
            console.log("Error",error)
            
        }
    }
    const getRecipes = async(category='Beef')=>{
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            //console.log(response.data)
            if(response,response.data){
                setMeals(response.data.meals)
            }
            
        } catch (error) {
            
            console.log("Error",error)
        }
    }

    useEffect(()=>{
        getCategories()
        getRecipes()

    },[])
    
    return(

        
     <SafeAreaView className='flex-1 bg-white'>
            <StatusBar style="dark" translucent={false} hidden={false}/>
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:50}}
            className='space-y-6 pt-4'>
            <View className='flex-row justify-between items-center mb-2 mx-4'>
                <Image
                source={require('../assets/images/nelly.jpeg')}
                style={{
                    height:hp(5),
                    width:hp(5.5),
                    borderRadius:999
                }}/>
                <BellIcon size={hp(5)} color='gray'/>
                

            </View>
            {/* avatar and bell icon */}
            <View className='mx-4 mb-2 space-y-1'>
                <Text style={{fontSize:hp(2.5)}} className='text-neutral-600'>Hello Andre!</Text>
                <View>
                    <Text style={{fontSize:hp(3.8)}} className='font-semibold text-neutral-600'>
                        Make your own food,
                    </Text>
                </View>
                <Text style={{fontSize:hp(3.8)}} className='font-semibold text-neutral-600'>
                    stay at <Text className='text-amber-500'>home</Text>
                </Text>
            </View>
            {/* search bar */}
            <View className='mx-4 bg-black/5 flex-row rounded-full p-[6px]'>
                <TextInput
                style={{fontSize:hp(1.7)}}
                className='flex-1 pl-3 text-base tracking-wider mb-1'
                placeholder="Search any recipe"
                placeholderTextColor='gray'/>
                <View className='bg-white rounded-full p-3'>
                    <MagnifyingGlassIcon size={hp(2.5)} color={'gray'}/>
                </View>

            </View>
            {/* categories */}
            <View>
            {categories && <Categories categories={categories}activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
            </View>
            {/* recipes */}
            <View>
                <Recipes meals={meals} categories={categories}/>
            </View>
            </ScrollView>
            
     </SafeAreaView>

        
      
    )
}