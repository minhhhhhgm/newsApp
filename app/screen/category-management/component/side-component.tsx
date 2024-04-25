
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import EyeOffIcon from '../../../icons/svg-component/eyeOffIcon';
import { COLOR } from '../../../utils/color';
import { DataInterests } from '../category-management';
import EyeIcon from '../../../icons/svg-component/eyeIcon';

interface IRightSwipeActions {
    isShow: boolean,
    action: () => void
}

export const rightSwipeActions = (props: IRightSwipeActions) => {
    const { isShow, action } = props
    return (
        <View
            style={{ backgroundColor: COLOR.authorColor, justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 30 }}>
            <TouchableOpacity activeOpacity={1} onPress={action} style={{padding: 10}}>
                {isShow ? <EyeOffIcon /> : <EyeIcon width={20} height={20} />}
            </TouchableOpacity>
        </View>
    );
};

export const LeftSwipeActions = (item: DataInterests, index: number) => {
    return (
        <View style={{ backgroundColor: COLOR.authorColor, justifyContent: 'center', paddingHorizontal: 30 }}>
            <TouchableOpacity activeOpacity={1}>
                <EyeIcon width={20} height={20} />
            </TouchableOpacity>
        </View>
    );
};