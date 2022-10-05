export const compile = (app: any) => {
  app.get("/compile", async (req: any, res: any, next: any) => {
    try {
      res.json([]);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
