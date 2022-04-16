export default {
    getLoading: (state) => state.loading,
    getLoginStatus: (state) => state.isLogin,
    getAuthorizeUser: (state) => state.authorize,
    getListOfUsers: (state) => state.users,
    getPageNumber: (state) => state.pageNumber,
}
