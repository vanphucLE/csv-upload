export default (fun) =>
  (...args) =>
    fun(...args).catch(args[2]);
