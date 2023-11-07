const deleteAuthToken = () => {
    document.cookie = 'XSRF-TOKEN=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export default deleteAuthToken;
