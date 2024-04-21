import { StyleSheet } from 'react-native';
import { COLOR } from '../../utils/color';


export const useHomeStyles = (mode : boolean) => {
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: !mode ? COLOR.backgroundColor : COLOR.black,
        },
        button: {
            marginTop: 30,
            justifyContent: 'center',
            paddingVertical: 4,
            paddingHorizontal: 15,
            borderRadius: 30,
            alignSelf: 'flex-start',
            marginRight: 10,
        },
    });
    return styles;
}
