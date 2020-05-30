import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';

export default createStackNavigator({
    Main,
},
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#DA552F",
                
            },
            headerTitleStyle:{
                textAlign:"center",
                flex: 1
            },
            headerTintColor: "#FFF",
        },
    });