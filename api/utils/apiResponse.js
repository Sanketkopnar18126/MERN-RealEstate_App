class apiResponse {
   constructor(statuscode, data, mssg = "something went wrong") {
      (this.statuscode = statuscode),
         (this.data = data),
         (this.mssg = mssg),
         (this.sucess = statuscode < 400);
   }
}

export { apiResponse };
