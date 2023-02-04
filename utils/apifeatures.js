class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;        // 50 - 10

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
};


module.exports = ApiFeatures;