
   export const handleSuccess = async function (tx, message, title, icon, dispatch) {
        await tx;
        handleNotificationSuccess(tx, message, title, icon, dispatch)
    }

   export const handleError = async function (tx, message, title, icon, dispatch) {
        await tx;
        handleNotificationError(tx, message, title, icon, dispatch)
    }

    const handleNotificationSuccess = function (tx, message, title, icon, dispatch) {
        dispatch({
            type:'info',
            message: message,
            title:title,
            position:"topR",
            icon:icon,
        })
    }

    const handleNotificationError = function (tx, message, title, icon, dispatch) {
        dispatch({
            type:'error',
            message: message,
            title:title,
            position:"topR",
            icon:icon,
            iconColor:'red'
        })
    }

