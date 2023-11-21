import AppDataSource from "./connection";

const InicializationDatabase = AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });

export default InicializationDatabase;