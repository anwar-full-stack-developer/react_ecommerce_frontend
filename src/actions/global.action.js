import {
    GLOBAL_CONFIG_REQUEST,
    GLOBAL_CONFIG_SUCCESS,
    GLOBAL_CONFIG_FAIL,
} from "../constants/global-config.constant";
import { globalConfigStorage } from "./../config/config";
import {
    navbar,
    footerBrandNav,
    footerAccountNav,
    footerCompanyNav,
    footerHelpNav,
    footerSocialNav,
    homeBanerLeftNav,
    banners,
} from "./../config/nav.config";

export const loadGobalConfig = () => async (dispatch) => {
    dispatch({
        type: GLOBAL_CONFIG_REQUEST,
        payload: { request: {}, result: {} },
    });
    if (globalConfigStorage === "local") {
        dispatch({
            type: GLOBAL_CONFIG_SUCCESS,
            payload: {
                request: {},
                result: {
                    navbar,
                    footerBrandNav,
                    footerAccountNav,
                    footerCompanyNav,
                    footerHelpNav,
                    footerSocialNav,
                    homeBanerLeftNav,
                    banners,
                },
            },
        });
    }
};
