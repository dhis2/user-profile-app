import {
    blue500,
    blue700,
    blue100,
    orange500,
    grey100,
    grey500,
    darkBlack,
    white,
    grey400,
} from 'material-ui/styles/colors.js'
import getMuiTheme from 'material-ui/styles/getMuiTheme.js'
import Spacing from 'material-ui/styles/spacing.js'
import { fade } from 'material-ui/utils/colorManipulator.js'

const theme = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blue500,
        primary2Color: blue700,
        primary3Color: blue100,
        accent1Color: orange500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey400,
        disabledColor: fade(darkBlack, 0.3),
    },
}

const muiTheme = getMuiTheme(theme)

export default Object.assign({}, muiTheme, {
    forms: {
        minWidth: 350,
        maxWidth: 750,
    },
    formInput: {
        fontWeight: 100,
    },
})
