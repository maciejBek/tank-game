import { defaultParams } from './params'

export const welcomePage = {
    position: 'absolute',
    height: 100 + 'vh',
    width: 100 + 'vw',
    backgroundColor: defaultParams.fieldColor,

}
export const welcomePageImg = {
    display: 'block',
    margin: 0 + ' auto',
    marginTop: 8 + '%',
    width: 60 + '%',
}

export const GameOverImg = {
    display: 'block',
    margin: 0 + ' auto',
    marginTop: 8 + '%',
    width: 60 + '%',
}

export const panelStyle = {
    textAlign: 'center',
   // fontSize: '30px',
    backgroundColor: defaultParams.fieldColor,
    paddingTop: '40px',
    paddingBottom: '30px',
    marginTop: '60px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const messageStyle = {
    textAlign: 'center',
    fontSize: '35px',
    color: 'white',
    display: 'block',
    margin: 0 + ' auto',
    marginTop: 5 + '%',

}

//gameOn, leftPanel, rightPanel, 

export const gameOn = {
    // width: defaultParams.fieldWidth + 'px',
    // height: defaultParams.fieldHeight + 'px',
    height: 100 + 'vh',
    width: 100 + 'vw',
    backgroundColor: 'grey',
    cursor: 'crosshair',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 1,
}
export const multiGameOn = {
    // width: defaultParams.fieldWidth + 'px',
    // height: defaultParams.fieldHeight + 'px',
    height: 100 + 'vh',
    width: 100 + 'vw',
    backgroundColor: 'grey',
    cursor: 'crosshair',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 1,
}

export const leftPanel = {
    width: 8 + 'vw',
    backgroundColor: 'grey',
    position: 'relative',
}

export const gameField = {
    width: 75 + 'vw',
    top: 5 + 'vh',
    height: 90 + 'vh',
    backgroundColor: defaultParams.fieldColor,
    cursor: 'crosshair',
    position: 'relative',
}


export const rightPanel = {
    position: 'relative',
    width: 17 + 'vw',
    right: 0,
    backgroundColor: 'grey',
}

export const rowItems = {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
}

export const nextLevel = {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: 100 + 'vh',
    width: 100 + 'vw',
    top: 0,
    left: 0,
    padding: '30px 0'
}

export const makeTargetStyle = ({ xpos, ypos, fired }) => {
    return {
        width: defaultParams.targetWidth,
        height: defaultParams.targetHeight,
        backgroundColor: fired ? defaultParams.targetColor2 : defaultParams.targetColor1,
        boxShadow: fired ? defaultParams.targetShadow2 : defaultParams.targetShadow1,
        borderRadius: defaultParams.targetBorderRadius1,
        position: 'absolute',
        top: ypos,
        left: xpos,
    }
}

export const inputData = {
    textAlign: 'center'
}