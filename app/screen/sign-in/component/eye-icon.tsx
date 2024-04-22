import React from 'react';
import { TouchableOpacity } from 'react-native';
import EyeIcon from '../../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../../icons/svg-component/eyeOffIcon';
import { COLOR } from '../../../utils/color';
interface IRighticon {
    password: string,
    handleShowPass: () => void,
    isShowPassword: boolean,
    paddingRight?: number
    mode: boolean

}
export const Righticon = (props: IRighticon) => {
    const { password, handleShowPass, isShowPassword , paddingRight,mode} = props
    const stroke = mode ? COLOR.white : null

    return (
        password &&
        <TouchableOpacity
            onPress={handleShowPass}
            style={{
                justifyContent: 'center',
                paddingTop: 25,
                paddingRight: paddingRight? paddingRight :0
            }}>
            {
                !isShowPassword ? <EyeIcon stroke={stroke}/> : <EyeOffIcon stroke={stroke}/>
            }
        </TouchableOpacity>
    )
}