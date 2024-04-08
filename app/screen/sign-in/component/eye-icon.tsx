import React from 'react';
import { TouchableOpacity } from 'react-native';
import EyeIcon from '../../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../../icons/svg-component/eyeOffIcon';
interface IRighticon {
    password: string,
    handleShowPass: () => void,
    isShowPassword: boolean,
    paddingRight?: number

}
export const Righticon = (props: IRighticon) => {
    const { password, handleShowPass, isShowPassword , paddingRight} = props
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
                !isShowPassword ? <EyeIcon /> : <EyeOffIcon />
            }
        </TouchableOpacity>
    )
}