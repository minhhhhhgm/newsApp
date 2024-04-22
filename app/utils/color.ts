export const headBlackColor ='#180E19'

export const COLOR = {
    backgroundColor: 'white',
    darkBlack : '#000000',
    white :'#FFFFFF',
    buttonColorInactive :'#EEEEEE',
    buttonColorActive : '#180E19',
    fogotPassColor :'#180E19',
    focusColor :'#180E19',
    authorColor :'#909090',
    textTypeColor:'#69BDFD',
    black:'black',
    colorSwitchOn:'#180E19',
    colorSwitchOff:'#767577',
    defaulColor : '#000000'
}

export const COLOR_MODE = (mode: boolean) => {
    if (mode) {
        //COLOR DARK MODE
        return {
            backgroundColor: 'black',
            titleText : '#FFFFFF',
            authorText : '#909090',
            typeText : '#69BDFD',
            dotColor : '#FFFFFF',
            divider : '#909090',
            textColor : '#FFFFFF',
            logoColor : 'white' ,
            textNewsColor : '#FFFFFF' ,
            textActive:'white',
            textInActive:'gray'
            
        }
    } else {
        //COLOR LIGHT MODE
        return {
            backgroundColor: 'white',
            titleText : '#180E19',
            authorText : '#909090',
            typeText : '#69BDFD',
            dotColor : '#180E19',
            divider : '#EEEEEE',
            textColor : '#000000'  ,
            logoColor : 'black'  ,
            textNewsColor : '#180E19',
            textActive:'#180E19',
            textInActive:'#EEEEEE'
           
        }
    }
}