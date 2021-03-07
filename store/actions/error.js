import BASEURL from '../../constants/api'

export const ERROR = 'ERROR';

export const showError = (errorMsg) => {
    return {type:ERROR,errorMsg:errorMsg}
}
