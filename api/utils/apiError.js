class apiError extends Error {
   constructor(
      statuscode,
      mssg = "something went wrong",
      errors = [],
      stack = ""
   ) {
      super(mssg);
      this.statuscode = statuscode;
      (this.data = null),
         (this.mssg = mssg),
         (this.success = false),
         (this.errors = errors);

      if (stack) {
         this.stack = stack;
      } else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
}
