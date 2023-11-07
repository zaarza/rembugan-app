import tUserType from '@/src/types/tUserType';

type tGetUserDataResponse = {
    data: {
        status: number;
        data: tUserType;
        message: string;
    };
};

export default tGetUserDataResponse;
