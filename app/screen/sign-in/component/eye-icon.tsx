import React from 'react';
import { TouchableOpacity } from 'react-native';
import EyeIcon from '../../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../../icons/svg-component/eyeOffIcon';
interface IRighticon {
    password: string,
    handleShowPass: () => void,
    isShowPassword : boolean
}
export const Righticon = (props: IRighticon) => {
    const { password, handleShowPass, isShowPassword } = props
    return (
        password &&
        <TouchableOpacity
            onPress={handleShowPass}
            style={{
                justifyContent: 'center',
                paddingTop: 25,
            }}>
            {
                !isShowPassword ? <EyeIcon /> : <EyeOffIcon />
            }
        </TouchableOpacity>
    )
}