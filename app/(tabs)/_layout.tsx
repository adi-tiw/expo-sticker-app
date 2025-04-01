import {Tabs} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return(
        <Tabs screenOptions={{ 
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#061b3d'
            },
            headerShadowVisible: false,
            tabBarStyle : {
                backgroundColor: '#061b3d'
            }
            }}>

            <Tabs.Screen name='index'
            options={{
                title:'Home',
                tabBarIcon: ({color , focused}) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                )
            }}
            />
            <Tabs.Screen name='about' 
            options={{
                title:'About',
                tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
                )
            }} />
        </Tabs>
    )
}